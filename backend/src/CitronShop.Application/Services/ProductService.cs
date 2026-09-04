using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CitronShop.Application.Services;

public class ProductService(IShopDbContext db) : IProductService
{
    public async Task<PagedResult<ProductDto>> GetProductsAsync(ProductListQuery query)
    {
        var items = db.Products.Include(p => p.Category).Include(p => p.Images)
            .Where(p => p.IsActive)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Search))
            items = items.Where(p => p.Name.Contains(query.Search));

        if (query.CategoryId.HasValue)
            items = items.Where(p => p.CategoryId == query.CategoryId);

        if (query.MinPrice.HasValue)
            items = items.Where(p => p.Price >= query.MinPrice);

        if (query.MaxPrice.HasValue)
            items = items.Where(p => p.Price <= query.MaxPrice);

        items = query.SortBy switch
        {
            "price_asc" => items.OrderBy(p => p.Price),
            "price_desc" => items.OrderByDescending(p => p.Price),
            "newest" => items.OrderByDescending(p => p.CreatedAt),
            _ => items.OrderByDescending(p => p.IsFeatured).ThenByDescending(p => p.CreatedAt)
        };

        var total = await items.CountAsync();
        var page = Math.Max(1, query.Page);
        var pageSize = Math.Clamp(query.PageSize, 1, 100);

        var entities = await items.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedResult<ProductDto>(entities.Select(ToDto).ToList(), total, page, pageSize);
    }

    public async Task<ProductDto?> GetByIdAsync(Guid id)
    {
        var p = await db.Products.Include(x => x.Category).Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == id);
        return p is null ? null : ToDto(p);
    }

    public async Task<ProductDto?> GetBySlugAsync(string slug)
    {
        var p = await db.Products.Include(x => x.Category).Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Slug == slug);
        return p is null ? null : ToDto(p);
    }

    public async Task<ProductDto> CreateAsync(CreateProductRequest request)
    {
        var product = new Product
        {
            Name = request.Name,
            Slug = Slugify(request.Name),
            Description = request.Description,
            Price = request.Price,
            DiscountPrice = request.DiscountPrice,
            StockQuantity = request.StockQuantity,
            IsFeatured = request.IsFeatured,
            CategoryId = request.CategoryId,
            Images = request.ImageUrls.Select((url, i) => new ProductImage { Url = url, SortOrder = i }).ToList()
        };

        db.Products.Add(product);
        await db.SaveChangesAsync();
        return (await GetByIdAsync(product.Id))!;
    }

    public async Task<ProductDto?> UpdateAsync(Guid id, UpdateProductRequest request)
    {
        var product = await db.Products.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id);
        if (product is null) return null;

        product.Name = request.Name;
        product.Slug = Slugify(request.Name);
        product.Description = request.Description;
        product.Price = request.Price;
        product.DiscountPrice = request.DiscountPrice;
        product.StockQuantity = request.StockQuantity;
        product.IsActive = request.IsActive;
        product.IsFeatured = request.IsFeatured;
        product.CategoryId = request.CategoryId;
        product.UpdatedAt = DateTime.UtcNow;

        product.Images.Clear();
        foreach (var (url, i) in request.ImageUrls.Select((u, i) => (u, i)))
            product.Images.Add(new ProductImage { Url = url, SortOrder = i, ProductId = product.Id });

        await db.SaveChangesAsync();
        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return false;

        // Мягкое удаление: товар просто скрывается, а не стирается — иначе
        // старые заказы, которые на него ссылаются, потеряли бы данные.
        product.IsActive = false;
        await db.SaveChangesAsync();
        return true;
    }

    private static string Slugify(string name) =>
        name.Trim().ToLowerInvariant().Replace(" ", "-") + "-" + Guid.NewGuid().ToString("N")[..6];

    private static ProductDto ToDto(Product p) => new(
        p.Id, p.Name, p.Slug, p.Description, p.Price, p.DiscountPrice, p.EffectivePrice,
        p.StockQuantity, p.IsActive, p.IsFeatured, p.CategoryId, p.Category?.Name ?? "",
        p.Images.OrderBy(i => i.SortOrder).Select(i => i.Url).ToList()
    );
}