namespace CitronShop.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; }

    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();

    public decimal EffectivePrice => DiscountPrice.HasValue && DiscountPrice < Price ? DiscountPrice.Value : Price;
}

public class ProductImage : BaseEntity
{
    public string Url { get; set; } = string.Empty;
    public int SortOrder { get; set; }

    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
}