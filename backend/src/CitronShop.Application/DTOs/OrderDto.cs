using CitronShop.Domain.Entities;

namespace CitronShop.Application.DTOs;

public record OrderItemDto(
    Guid ProductId,
    string ProductName,
    decimal UnitPrice,
    int Quantity,
    decimal LineTotal
);

public record OrderDto(
    Guid Id,
    string OrderNumber,
    DateTime CreatedAt,
    decimal TotalAmount,
    OrderStatus Status,
    string ShippingFullName,
    string ShippingPhone,
    string ShippingAddress,
    string ShippingCity,
    List<OrderItemDto> Items
);

public record CreateOrderRequest(
    string ShippingFullName,
    string ShippingPhone,
    string ShippingAddress,
    string ShippingCity,
    string CardNumber,
    string CardExpiry,
    string CardCvc
);

public record UpdateOrderStatusRequest(OrderStatus Status);