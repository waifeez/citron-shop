namespace CitronShop.Domain.Entities;

public class Review : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;

    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public int Rating { get; set; }
    public string? Comment { get; set; }
}