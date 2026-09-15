using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CitronShop.Application.Services;

public class ReviewService(IShopDbContext db) : IReviewService
{
    public async Task<ProductReviewsSummary> GetForProductAsync(Guid productId)
    {
        var reviews = await db.Reviews
            .Where(r => r.ProductId == productId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

        return BuildSummary(reviews);
    }

    public async Task<ProductReviewsSummary> AddAsync(Guid productId, string userId, string userName, CreateReviewRequest request)
    {
        if (request.Rating is < 1 or > 5)
            throw new InvalidOperationException("Оценка должна быть от 1 до 5");

        var existing = await db.Reviews.FirstOrDefaultAsync(r => r.ProductId == productId && r.UserId == userId);
        if (existing is not null)
        {
            existing.Rating = request.Rating;
            existing.Comment = request.Comment;
            existing.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            db.Reviews.Add(new Review
            {
                ProductId = productId,
                UserId = userId,
                UserName = userName,
                Rating = request.Rating,
                Comment = request.Comment
            });
        }

        await db.SaveChangesAsync();
        return await GetForProductAsync(productId);
    }

    private static ProductReviewsSummary BuildSummary(List<Review> reviews)
    {
        var dtos = reviews.Select(r => new ReviewDto(r.Id, r.UserName, r.Rating, r.Comment, r.CreatedAt)).ToList();
        var average = reviews.Count > 0 ? Math.Round(reviews.Average(r => r.Rating), 1) : 0;
        return new ProductReviewsSummary(dtos, average, reviews.Count);
    }
}