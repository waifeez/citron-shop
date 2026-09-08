import * as signalR from '@microsoft/signalr';

export function createOrdersConnection() {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl('/hubs/orders')
    .withAutomaticReconnect()
    .build();

  return connection;
}