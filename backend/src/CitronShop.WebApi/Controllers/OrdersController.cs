using CitronShop.Application.DTOs;
using CitronShop.Application.Interfaces;
using CitronShop.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CitronShop.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController(IOrderService orderService) : ControllerBase
{
    private string UserId => User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
    ?? User.FindFirst("sub")!.Value;

    [HttpPost("checkout")]
    public async Task<ActionResult<OrderDto>> Checkout(CreateOrderRequest request)
    {
        try
        {
            return Ok(await orderService.CreateOrderFromCartAsync(UserId, request));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("mine")]
    public async Task<ActionResult<List<OrderDto>>> GetMyOrders() => Ok(await orderService.GetUserOrdersAsync(UserId));

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<PagedResult<OrderDto>>> GetAll(int page = 1, int pageSize = 20, OrderStatus? status = null)
        => Ok(await orderService.GetAllOrdersAsync(page, pageSize, status));

    [HttpPut("{id:guid}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<OrderDto>> UpdateStatus(Guid id, UpdateOrderStatusRequest request)
    {
        var order = await orderService.UpdateStatusAsync(id, request.Status);
        return order is null ? NotFound() : Ok(order);
    }
}