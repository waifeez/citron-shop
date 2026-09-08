using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CitronShop.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CartController(ICartService cartService) : ControllerBase
{
    private string UserId => User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
    ?? User.FindFirst("sub")!.Value;

    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart() => Ok(await cartService.GetCartAsync(UserId));

    [HttpPost("items")]
    public async Task<ActionResult<CartDto>> AddItem(AddToCartRequest request)
        => Ok(await cartService.AddItemAsync(UserId, request));

    [HttpPut("items/{productId:guid}")]
    public async Task<ActionResult<CartDto>> UpdateItem(Guid productId, UpdateCartItemRequest request)
        => Ok(await cartService.UpdateItemAsync(UserId, productId, request));

    [HttpDelete("items/{productId:guid}")]
    public async Task<ActionResult<CartDto>> RemoveItem(Guid productId)
        => Ok(await cartService.RemoveItemAsync(UserId, productId));
}