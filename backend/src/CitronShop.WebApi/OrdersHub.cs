using Microsoft.AspNetCore.SignalR;

namespace CitronShop.WebApi.Hubs;

/// <summary>
/// "Труба" для живой связи с браузерами администраторов. Сама по себе она
/// не содержит методов — используется только для рассылки событий через
/// IHubContext (см. OrdersController), клиенты только подписываются на сообщения.
/// </summary>
public class OrdersHub : Hub
{
}