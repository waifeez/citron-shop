namespace CitronShop.Domain.Entities;

public class WishlistItem : BaseEntity
{
    public string UserId { get; set; } = string.Empty;

    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
}