using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CitronShop.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WishlistController(IWishlistService wishlistService) : ControllerBase
{
    private string UserId => User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
        ?? User.FindFirst("sub")!.Value;

    [HttpGet]
    public async Task<ActionResult<List<WishlistItemDto>>> Get() => Ok(await wishlistService.GetAsync(UserId));

    [HttpPost("{productId:guid}")]
    public async Task<ActionResult<List<WishlistItemDto>>> Add(Guid productId)
        => Ok(await wishlistService.AddAsync(UserId, productId));

    [HttpDelete("{productId:guid}")]
    public async Task<ActionResult<List<WishlistItemDto>>> Remove(Guid productId)
        => Ok(await wishlistService.RemoveAsync(UserId, productId));
}