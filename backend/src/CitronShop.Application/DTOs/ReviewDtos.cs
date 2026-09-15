namespace CitronShop.Application.DTOs;

public record ReviewDto(
    Guid Id,
    string UserName,
    int Rating,
    string? Comment,
    DateTime CreatedAt
);

public record ProductReviewsSummary(
    List<ReviewDto> Reviews,
    double AverageRating,
    int TotalCount
);

public record CreateReviewRequest(int Rating, string? Comment);