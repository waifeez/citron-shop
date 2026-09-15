using CitronShop.Application.DTOs;
using CitronShop.Domain.Entities;

namespace CitronShop.Application.Interfaces;

public interface IProductService
{
    Task<PagedResult<ProductDto>> GetProductsAsync(ProductListQuery query);
    Task<ProductDto?> GetByIdAsync(Guid id);
    Task<ProductDto?> GetBySlugAsync(string slug);
    Task<ProductDto> CreateAsync(CreateProductRequest request);
    Task<ProductDto?> UpdateAsync(Guid id, UpdateProductRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public interface ICategoryService
{
    Task<List<CategoryDto>> GetAllAsync();
    Task<CategoryDto> CreateAsync(CreateCategoryRequest request);
    Task<CategoryDto?> UpdateAsync(Guid id, UpdateCategoryRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public interface ICartService
{
    Task<CartDto> GetCartAsync(string userId);
    Task<CartDto> AddItemAsync(string userId, AddToCartRequest request);
    Task<CartDto> UpdateItemAsync(string userId, Guid productId, UpdateCartItemRequest request);
    Task<CartDto> RemoveItemAsync(string userId, Guid productId);
}

public interface IOrderService
{
    Task<OrderDto> CreateOrderFromCartAsync(string userId, CreateOrderRequest request);
    Task<List<OrderDto>> GetUserOrdersAsync(string userId);
    Task<PagedResult<OrderDto>> GetAllOrdersAsync(int page, int pageSize, OrderStatus? status);
    Task<OrderDto?> UpdateStatusAsync(Guid id, OrderStatus status);
}

public interface ITokenService
{
    (string Token, DateTime ExpiresAt) CreateToken(string userId, string email, IList<string> roles);
}
public interface IWishlistService
{
    Task<List<WishlistItemDto>> GetAsync(string userId);
    Task<List<WishlistItemDto>> AddAsync(string userId, Guid productId);
    Task<List<WishlistItemDto>> RemoveAsync(string userId, Guid productId);
}

public interface IReviewService
{
    Task<ProductReviewsSummary> GetForProductAsync(Guid productId);
    Task<ProductReviewsSummary> AddAsync(Guid productId, string userId, string userName, CreateReviewRequest request);
}