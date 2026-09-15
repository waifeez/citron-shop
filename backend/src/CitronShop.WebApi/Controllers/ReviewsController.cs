using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CitronShop.WebApi.Controllers;

[ApiController]
[Route("api/products/{productId:guid}/reviews")]
public class ReviewsController(IReviewService reviewService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ProductReviewsSummary>> Get(Guid productId)
        => Ok(await reviewService.GetForProductAsync(productId));

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ProductReviewsSummary>> Add(Guid productId, CreateReviewRequest request)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("sub")!.Value;
        var userName = User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email)?.Value ?? "Покупатель";

        try
        {
            return Ok(await reviewService.AddAsync(productId, userId, userName, request));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}