using CitronShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CitronShop.Application.Interfaces;

public interface IShopDbContext
{
    DbSet<Product> Products { get; }
    DbSet<Category> Categories { get; }
    DbSet<CartItem> CartItems { get; }
    DbSet<Order> Orders { get; }
    DbSet<OrderItem> OrderItems { get; }

    Task<int> SaveChangesAsync(CancellationToken ct = default);
}