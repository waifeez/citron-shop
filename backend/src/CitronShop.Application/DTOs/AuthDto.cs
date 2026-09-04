namespace CitronShop.Application.DTOs;

public record RegisterRequest(string FullName, string Email, string Password);
public record LoginRequest(string Email, string Password);

public record UserDto(string Id, string FullName, string Email, IList<string> Roles);
public record AuthResponse(string Token, DateTime ExpiresAt, UserDto User);