import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Chip, CircularProgress } from '@mui/material';
import { ordersApi } from '../../api/ordersApi';
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

  useEffect(() => {
    ordersApi.all(1, 50).then((result) => {
      setOrders(result.items);
      setLoading(false);
    });
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
              <TableRow key={order.id}>
                <TableCell>{order.orderNumber}</TableCell>
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