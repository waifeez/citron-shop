using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using CitronShop.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CitronShop.Infrastructure.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<ApplicationUser>(options), IShopDbContext
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<WishlistItem> WishlistItems => Set<WishlistItem>();
    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Product>(e =>
        {
            e.HasIndex(p => p.Slug).IsUnique();
            e.Property(p => p.Price).HasColumnType("decimal(18,2)");
            e.Property(p => p.DiscountPrice).HasColumnType("decimal(18,2)");
            e.HasOne(p => p.Category).WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId).OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<Category>(e =>
        {
            e.HasIndex(c => c.Slug).IsUnique();
        });

        builder.Entity<CartItem>(e =>
        {
            e.HasIndex(c => new { c.UserId, c.ProductId }).IsUnique();
        });

        builder.Entity<Order>(e =>
        {
            e.Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
            e.HasIndex(o => o.OrderNumber).IsUnique();
        });

        builder.Entity<OrderItem>(e =>
        {
            e.Property(i => i.UnitPriceSnapshot).HasColumnType("decimal(18,2)");
            e.HasOne(i => i.Order).WithMany(o => o.Items).HasForeignKey(i => i.OrderId);
            e.HasOne(i => i.Product).WithMany().HasForeignKey(i => i.ProductId).OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<WishlistItem>(e =>
        {
            e.HasIndex(w => new { w.UserId, w.ProductId }).IsUnique();
        });

        builder.Entity<Review>(e =>
        {
            e.HasIndex(r => new { r.UserId, r.ProductId }).IsUnique();
            e.HasOne(r => r.Product).WithMany().HasForeignKey(r => r.ProductId).OnDelete(DeleteBehavior.Cascade);
        });
    }
}