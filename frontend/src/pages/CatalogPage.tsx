import { useMemo, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  type SelectChangeEvent
} from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { useAppSelector } from '../store/hooks';

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'newest';

export function CatalogPage() {
  const allProducts = useAppSelector((s) => s.products.items.filter((p) => p.isActive));

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const categories = useMemo(() => {
    const names = new Set(allProducts.map((p) => p.categoryName));
    return Array.from(names);
  }, [allProducts]);

  const filtered = useMemo(() => {
    let result = allProducts;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (category !== 'all') {
      result = result.filter((p) => p.categoryName === category);
    }

    if (minPrice) {
      result = result.filter((p) => p.effectivePrice >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((p) => p.effectivePrice <= Number(maxPrice));
    }

    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.effectivePrice - b.effectivePrice);
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.effectivePrice - a.effectivePrice);
    } else if (sortBy === 'newest') {
      result = [...result].slice().reverse();
    }

    return result;
  }, [allProducts, search, category, minPrice, maxPrice, sortBy]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Каталог товаров
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 2
        }}
      >
        <TextField
          label="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 220 }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={category}
            label="Категория"
            onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
          >
            <MenuItem value="all">Все категории</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Цена от"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          size="small"
          sx={{ width: 120 }}
        />
        <TextField
          label="Цена до"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          size="small"
          sx={{ width: 120 }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Сортировка</InputLabel>
          <Select
            value={sortBy}
            label="Сортировка"
            onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as SortOption)}
          >
            <MenuItem value="default">По умолчанию</MenuItem>
            <MenuItem value="price_asc">Сначала дешёвые</MenuItem>
            <MenuItem value="price_desc">Сначала дорогие</MenuItem>
            <MenuItem value="newest">Сначала новые</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filtered.length === 0 ? (
        <Typography color="text.secondary">По этим фильтрам ничего не найдено</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}