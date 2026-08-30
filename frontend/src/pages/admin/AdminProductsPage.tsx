import { Container, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteProduct } from '../../store/slices/productsSlice';

export function AdminProductsPage() {
  const products = useAppSelector((s) => s.products.items);
  const dispatch = useAppDispatch();

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Товары
        </Typography>
        <Button component={RouterLink} to="/admin/products/new" variant="contained">
          + Добавить товар
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Категория</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Склад</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell>{product.effectivePrice} MDL</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
              <TableCell align="right">
                <IconButton component={RouterLink} to={`/admin/products/${product.id}`} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => dispatch(deleteProduct(product.id))}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}