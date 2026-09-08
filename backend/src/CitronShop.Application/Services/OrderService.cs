using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CitronShop.Application.Services;

public class OrderService(IShopDbContext db) : IOrderService
{
    public async Task<OrderDto> CreateOrderFromCartAsync(string userId, CreateOrderRequest request)
    {
        var cartItems = await db.CartItems.Include(c => c.Product).Where(c => c.UserId == userId).ToListAsync();
        if (cartItems.Count == 0) throw new InvalidOperationException("Корзина пуста");

        foreach (var item in cartItems)
            if (item.Quantity > item.Product.StockQuantity)
                throw new InvalidOperationException($"Недостаточно товара «{item.Product.Name}» на складе");

        var total = cartItems.Sum(c => c.Product.EffectivePrice * c.Quantity);

        var order = new Order
        {
            OrderNumber = $"CIT-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}",
            UserId = userId,
            ShippingFullName = request.ShippingFullName,
            ShippingPhone = request.ShippingPhone,
            ShippingAddress = request.ShippingAddress,
            ShippingCity = request.ShippingCity,
            TotalAmount = total,
            Status = OrderStatus.Pending,
            Items = cartItems.Select(c => new OrderItem
            {
                ProductId = c.ProductId,
                ProductNameSnapshot = c.Product.Name,
                UnitPriceSnapshot = c.Product.EffectivePrice,
                Quantity = c.Quantity
            }).ToList()
        };

        foreach (var item in cartItems)
            item.Product.StockQuantity -= item.Quantity;

        db.Orders.Add(order);
        db.CartItems.RemoveRange(cartItems);
        await db.SaveChangesAsync();

        return ToDto(order);
    }

    public async Task<List<OrderDto>> GetUserOrdersAsync(string userId)
    {
        var orders = await db.Orders.Include(o => o.Items)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
        return orders.Select(ToDto).ToList();
    }

    public async Task<PagedResult<OrderDto>> GetAllOrdersAsync(int page, int pageSize, OrderStatus? status)
    {
        var query = db.Orders.Include(o => o.Items).AsQueryable();
        if (status.HasValue) query = query.Where(o => o.Status == status);
        query = query.OrderByDescending(o => o.CreatedAt);

        var total = await query.CountAsync();
        var p = Math.Max(1, page);
        var ps = Math.Clamp(pageSize, 1, 100);

        var orders = await query.Skip((p - 1) * ps).Take(ps).ToListAsync();
        return new PagedResult<OrderDto>(orders.Select(ToDto).ToList(), total, p, ps);
    }

    public async Task<OrderDto?> UpdateStatusAsync(Guid id, OrderStatus status)
    {
        var order = await db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
        if (order is null) return null;

        order.Status = status;
        order.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return ToDto(order);
    }

    private static OrderDto ToDto(Order o) => new(
        o.Id, o.OrderNumber, o.CreatedAt, o.TotalAmount, o.Status,
        o.ShippingFullName, o.ShippingPhone, o.ShippingAddress, o.ShippingCity,
        o.Items.Select(i => new OrderItemDto(i.ProductId, i.ProductNameSnapshot, i.UnitPriceSnapshot, i.Quantity, i.UnitPriceSnapshot * i.Quantity)).ToList()
    );
}