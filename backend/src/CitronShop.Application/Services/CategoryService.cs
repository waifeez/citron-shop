using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CitronShop.Application.Services;

public class CategoryService(IShopDbContext db) : ICategoryService
{
    public async Task<List<CategoryDto>> GetAllAsync()
    {
        var categories = await db.Categories.Include(c => c.Products).ToListAsync();
        return categories.Select(ToDto).ToList();
    }

    public async Task<CategoryDto> CreateAsync(CreateCategoryRequest request)
    {
        var category = new Category
        {
            Name = request.Name,
            Slug = request.Name.Trim().ToLowerInvariant().Replace(" ", "-"),
            Description = request.Description,
            ImageUrl = request.ImageUrl
        };
        db.Categories.Add(category);
        await db.SaveChangesAsync();
        return ToDto(category);
    }

    public async Task<CategoryDto?> UpdateAsync(Guid id, UpdateCategoryRequest request)
    {
        var category = await db.Categories.FindAsync(id);
        if (category is null) return null;

        category.Name = request.Name;
        category.Slug = request.Name.Trim().ToLowerInvariant().Replace(" ", "-");
        category.Description = request.Description;
        category.ImageUrl = request.ImageUrl;
        category.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return ToDto(category);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var category = await db.Categories.Include(c => c.Products).FirstOrDefaultAsync(c => c.Id == id);
        if (category is null) return false;
        if (category.Products.Any(p => p.IsActive)) return false; // нельзя удалить, если есть активные товары

        db.Categories.Remove(category);
        await db.SaveChangesAsync();
        return true;
    }

    private static CategoryDto ToDto(Category c) => new(
        c.Id, c.Name, c.Slug, c.Description, c.ImageUrl, c.Products.Count(p => p.IsActive)
    );
}