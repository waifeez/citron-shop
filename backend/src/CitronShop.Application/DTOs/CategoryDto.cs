namespace CitronShop.Application.DTOs;

public record CategoryDto(
    Guid Id,
    string Name,
    string Slug,
    string? Description,
    string? ImageUrl,
    int ProductCount
);

public record CreateCategoryRequest(string Name, string? Description, string? ImageUrl);
public record UpdateCategoryRequest(string Name, string? Description, string? ImageUrl);