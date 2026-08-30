import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addProduct, updateProduct } from '../../store/slices/productsSlice';

export function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const existing = useAppSelector((s) => s.products.items.find((p) => p.id === id));

  const [name, setName] = useState(existing?.name ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [price, setPrice] = useState(existing?.price?.toString() ?? '');
  const [discountPrice, setDiscountPrice] = useState(existing?.discountPrice?.toString() ?? '');
  const [stockQuantity, setStockQuantity] = useState(existing?.stockQuantity?.toString() ?? '');
  const [isFeatured, setIsFeatured] = useState(existing?.isFeatured ?? false);
  const [categoryName, setCategoryName] = useState(existing?.categoryName ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      stockQuantity: Number(stockQuantity),
      isActive: true,
      isFeatured,
      categoryId: 'general',
      categoryName: categoryName || 'Без категории',
      imageUrls: []
    };

    if (existing) {
      dispatch(updateProduct({ ...existing, ...payload }));
    } else {
      dispatch(addProduct(payload));
    }

    navigate('/admin/products');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        {existing ? 'Редактировать товар' : 'Новый товар'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Название" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
        <TextField label="Категория" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} fullWidth />
        <TextField
          label="Цена (MDL)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Цена со скидкой (необязательно)"
          type="number"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          fullWidth
        />
        <TextField
          label="Количество на складе"
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
          fullWidth
        />
        <FormControlLabel
          control={<Switch checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />}
          label="Хит продаж"
        />

        <Button type="submit" variant="contained" size="large">
          {existing ? 'Сохранить' : 'Добавить товар'}
        </Button>
      </Box>
    </Container>
  );
}