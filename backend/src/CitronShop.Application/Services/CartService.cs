using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CitronShop.Application.Services;

public class CartService(IShopDbContext db) : ICartService
{
    public async Task<CartDto> GetCartAsync(string userId)
    {
        var items = await db.CartItems.Include(c => c.Product).ThenInclude(p => p.Images)
            .Where(c => c.UserId == userId)
            .ToListAsync();
        return new CartDto(items.Select(ToDto).ToList());
    }

    public async Task<CartDto> AddItemAsync(string userId, AddToCartRequest request)
    {
        var product = await db.Products.FirstOrDefaultAsync(p => p.Id == request.ProductId && p.IsActive)
            ?? throw new InvalidOperationException("Товар не найден");

        var existing = await db.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == request.ProductId);

        if (existing is not null)
            existing.Quantity = Math.Min(existing.Quantity + request.Quantity, product.StockQuantity);
        else
            db.CartItems.Add(new CartItem { UserId = userId, ProductId = request.ProductId, Quantity = Math.Min(request.Quantity, product.StockQuantity) });

        await db.SaveChangesAsync();
        return await GetCartAsync(userId);
    }

    public async Task<CartDto> UpdateItemAsync(string userId, Guid productId, UpdateCartItemRequest request)
    {
        var item = await db.CartItems.Include(c => c.Product).FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

        if (item is not null)
        {
            if (request.Quantity <= 0)
                db.CartItems.Remove(item);
            else
                item.Quantity = Math.Min(request.Quantity, item.Product.StockQuantity);

            await db.SaveChangesAsync();
        }

        return await GetCartAsync(userId);
    }

    public async Task<CartDto> RemoveItemAsync(string userId, Guid productId)
    {
        var item = await db.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);
        if (item is not null)
        {
            db.CartItems.Remove(item);
            await db.SaveChangesAsync();
        }
        return await GetCartAsync(userId);
    }

    private static CartItemDto ToDto(CartItem c) => new(
        c.Id, c.ProductId, c.Product.Name,
        c.Product.Images.OrderBy(i => i.SortOrder).Select(i => i.Url).FirstOrDefault(),
        c.Product.EffectivePrice, c.Quantity, c.Product.StockQuantity
    );
}