namespace CitronShop.Application.DTOs;

public record CartItemDto(
    Guid Id,
    Guid ProductId,
    string ProductName,
    string? ImageUrl,
    decimal UnitPrice,
    int Quantity,
    int AvailableStock
)
{
    public decimal LineTotal => UnitPrice * Quantity;
}

public record CartDto(List<CartItemDto> Items)
{
    public decimal Total => Items.Sum(i => i.LineTotal);
    public int ItemCount => Items.Sum(i => i.Quantity);
}

public record AddToCartRequest(Guid ProductId, int Quantity);
public record UpdateCartItemRequest(int Quantity);