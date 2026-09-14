using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CitronShop.Application.Services;

public class WishlistService(IShopDbContext db) : IWishlistService
{
    public async Task<List<WishlistItemDto>> GetAsync(string userId)
    {
        var items = await db.WishlistItems.Include(w => w.Product).ThenInclude(p => p.Images)
            .Where(w => w.UserId == userId)
            .ToListAsync();
        return items.Select(ToDto).ToList();
    }

    public async Task<List<WishlistItemDto>> AddAsync(string userId, Guid productId)
    {
        var exists = await db.WishlistItems.AnyAsync(w => w.UserId == userId && w.ProductId == productId);
        if (!exists)
        {
            db.WishlistItems.Add(new WishlistItem { UserId = userId, ProductId = productId });
            await db.SaveChangesAsync();
        }
        return await GetAsync(userId);
    }

    public async Task<List<WishlistItemDto>> RemoveAsync(string userId, Guid productId)
    {
        var item = await db.WishlistItems.FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);
        if (item is not null)
        {
            db.WishlistItems.Remove(item);
            await db.SaveChangesAsync();
        }
        return await GetAsync(userId);
    }

    private static WishlistItemDto ToDto(WishlistItem w) => new(
        w.ProductId,
        w.Product.Name,
        w.Product.EffectivePrice,
        w.Product.Images.OrderBy(i => i.SortOrder).Select(i => i.Url).FirstOrDefault(),
        w.Product.StockQuantity > 0
    );
}