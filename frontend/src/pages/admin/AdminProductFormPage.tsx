import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  type SelectChangeEvent
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createProduct, updateProduct } from '../../store/slices/productsSlice';

export function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const existing = useAppSelector((s) => s.products.items.find((p) => p.id === id));
  const categories = useAppSelector((s) => s.categories.items);

  const [name, setName] = useState(existing?.name ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [price, setPrice] = useState(existing?.price?.toString() ?? '');
  const [discountPrice, setDiscountPrice] = useState(existing?.discountPrice?.toString() ?? '');
  const [stockQuantity, setStockQuantity] = useState(existing?.stockQuantity?.toString() ?? '');
  const [isFeatured, setIsFeatured] = useState(existing?.isFeatured ?? false);
  const [categoryId, setCategoryId] = useState(existing?.categoryId ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      setError('Выбери категорию');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      name,
      description,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      stockQuantity: Number(stockQuantity),
      isFeatured,
      categoryId,
      imageUrls: []
    };

    try {
      if (existing) {
        await dispatch(updateProduct({ id: existing.id, payload: { ...payload, isActive: true } })).unwrap();
      } else {
        await dispatch(createProduct(payload)).unwrap();
      }
      navigate('/admin/products');
    } catch {
      setError('Не удалось сохранить товар');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {existing ? 'Редактировать товар' : 'Новый товар'}
      </Typography>

      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

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

        <FormControl fullWidth required>
          <InputLabel>Категория</InputLabel>
          <Select
            value={categoryId}
            label="Категория"
            onChange={(e: SelectChangeEvent) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Цена (MDL)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required fullWidth />
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

        <Button type="submit" variant="contained" size="large" disabled={saving}>
          {saving ? 'Сохраняем...' : existing ? 'Сохранить' : 'Добавить товар'}
        </Button>
      </Box>
    </Container>
  );
}