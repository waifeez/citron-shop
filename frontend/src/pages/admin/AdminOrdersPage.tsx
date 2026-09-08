import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Chip, CircularProgress, Badge } from '@mui/material';
import { ordersApi } from '../../api/ordersApi';
import { createOrdersConnection } from '../../api/signalr';
import type { Order } from '../../types';

const statusColors: Record<string, 'default' | 'warning' | 'success' | 'info' | 'error'> = {
  Pending: 'warning',
  Paid: 'success',
  Processing: 'info',
  Shipped: 'info',
  Delivered: 'success',
  Cancelled: 'error'
};

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    ordersApi.all(1, 50).then((result) => {
      setOrders(result.items);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const connection = createOrdersConnection();

    connection.on('NewOrder', (order: Order) => {
      setOrders((prev) => [order, ...prev]);
      setNewOrderIds((prev) => new Set(prev).add(order.id));
    });

    connection.start().catch((err) => console.error('Ошибка подключения SignalR:', err));

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Заказы
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№ заказа</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Клиент</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} sx={newOrderIds.has(order.id) ? { bgcolor: 'rgba(245, 216, 0, 0.15)' } : undefined}>
                <TableCell>
                  {newOrderIds.has(order.id) && (
                    <Badge color="secondary" variant="dot" sx={{ mr: 1 }} />
                  )}
                  {order.orderNumber}
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString('ru-RU')}</TableCell>
                <TableCell>{order.shippingFullName}</TableCell>
                <TableCell>{order.totalAmount} MDL</TableCell>
                <TableCell>
                  <Chip label={order.status} size="small" color={statusColors[order.status] ?? 'default'} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}