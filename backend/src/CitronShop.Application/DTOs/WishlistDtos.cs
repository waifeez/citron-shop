namespace CitronShop.Application.DTOs;

public record WishlistItemDto(
    Guid ProductId,
    string ProductName,
    decimal EffectivePrice,
    string? ImageUrl,
    bool InStock
);