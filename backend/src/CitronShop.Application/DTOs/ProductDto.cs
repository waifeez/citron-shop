namespace CitronShop.Application.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    string Slug,
    string? Description,
    decimal Price,
    decimal? DiscountPrice,
    decimal EffectivePrice,
    int StockQuantity,
    bool IsActive,
    bool IsFeatured,
    Guid CategoryId,
    string CategoryName,
    List<string> ImageUrls
);

public record CreateProductRequest(
    string Name,
    string? Description,
    decimal Price,
    decimal? DiscountPrice,
    int StockQuantity,
    bool IsFeatured,
    Guid CategoryId,
    List<string> ImageUrls
);

public record UpdateProductRequest(
    string Name,
    string? Description,
    decimal Price,
    decimal? DiscountPrice,
    int StockQuantity,
    bool IsActive,
    bool IsFeatured,
    Guid CategoryId,
    List<string> ImageUrls
);