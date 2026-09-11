using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


public class OrderCleanupService(IShopDbContext db, ILogger<OrderCleanupService> logger)
{
    private const int TimeoutMinutes = 20;

    public async Task CancelExpiredOrdersAsync()
    {
        var cutoff = DateTime.UtcNow.AddMinutes(-TimeoutMinutes);

        var expiredOrders = await db.Orders
            .Include(o => o.Items)
            .Where(o => o.Status == OrderStatus.Pending && o.CreatedAt < cutoff)
            .ToListAsync();

        if (expiredOrders.Count == 0) return;

        foreach (var order in expiredOrders)
        {
            order.Status = OrderStatus.Cancelled;
            order.UpdatedAt = DateTime.UtcNow;

            foreach (var item in order.Items)
            {
                var product = await db.Products.FindAsync(item.ProductId);
                if (product is not null)
                    product.StockQuantity += item.Quantity;
            }
        }

        await db.SaveChangesAsync();
        logger.LogInformation("Hangfire: автоматически отменено {Count} неоплаченных заказов", expiredOrders.Count);
    }
}