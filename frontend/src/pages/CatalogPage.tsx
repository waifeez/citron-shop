import { useMemo, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  type SelectChangeEvent
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { ProductCard } from '../components/ProductCard';
import { PageHeader } from '../components/PageHeader';
import { useAppSelector } from '../store/hooks';

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'newest';

export function CatalogPage() {
  const allProducts = useAppSelector((s) => s.products.items.filter((p) => p.isActive));
  const categories = useAppSelector((s) => s.categories.items);

  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filtered = useMemo(() => {
    let result = allProducts;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (categoryId !== 'all') result = result.filter((p) => p.categoryId === categoryId);
    if (minPrice) result = result.filter((p) => p.effectivePrice >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.effectivePrice <= Number(maxPrice));

    if (sortBy === 'price_asc') result = [...result].sort((a, b) => a.effectivePrice - b.effectivePrice);
    else if (sortBy === 'price_desc') result = [...result].sort((a, b) => b.effectivePrice - a.effectivePrice);
    else if (sortBy === 'newest') result = [...result].slice().reverse();

    return result;
  }, [allProducts, search, categoryId, minPrice, maxPrice, sortBy]);

  return (
    <Box>
      <PageHeader title="Каталог товаров" subtitle="Подарки, игрушки и аксессуары на любой случай" />

      <Container sx={{ py: 4 }}>
   <Box
  sx={{
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2.5,
    mb: 5,
    mt: { xs: 4, md: 2 },
    p: 3,
    pt: 4,
    bgcolor: '#FFFDF2',
    border: '2px solid rgba(245,216,0,0.6)',
    borderRadius: 3,
    boxShadow: '0 10px 30px rgba(30,122,76,0.08)'
  }}
>
  <Box
    sx={{
      position: 'absolute',
      top: -18,
      left: 24,
      bgcolor: 'secondary.main',
      color: 'primary.dark',
      px: 2,
      py: 0.7,
      borderRadius: 999,
      display: 'flex',
      alignItems: 'center',
      gap: 0.7,
      fontSize: 12,
      fontWeight: 700,
      boxShadow: '0 4px 10px rgba(245,216,0,0.4)'
    }}
  >
    <TuneIcon sx={{ fontSize: 15 }} />
    ФИЛЬТРЫ
  </Box>
          <Box sx={{ minWidth: 220 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main', letterSpacing: '0.04em', mb: 0.5 }}>
              ПОИСК
            </Typography>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Название товара..."
              size="small"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />
          </Box>

          <Box sx={{ minWidth: 180 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main', letterSpacing: '0.04em', mb: 0.5 }}>
              КАТЕГОРИЯ
            </Typography>
            <FormControl size="small" fullWidth sx={{ bgcolor: '#fff', borderRadius: 1 }}>
              <Select value={categoryId} onChange={(e: SelectChangeEvent) => setCategoryId(e.target.value)}>
                <MenuItem value="all">Все категории</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main', letterSpacing: '0.04em', mb: 0.5 }}>
              ЦЕНА, MDL
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder="От"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                size="small"
                sx={{ width: 90, bgcolor: '#fff', borderRadius: 1 }}
              />
              <TextField
                placeholder="До"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                size="small"
                sx={{ width: 90, bgcolor: '#fff', borderRadius: 1 }}
              />
            </Box>
          </Box>

          <Box sx={{ minWidth: 180 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main', letterSpacing: '0.04em', mb: 0.5 }}>
              СОРТИРОВКА
            </Typography>
            <FormControl size="small" fullWidth sx={{ bgcolor: '#fff', borderRadius: 1 }}>
              <Select value={sortBy} onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as SortOption)}>
                <MenuItem value="default">По умолчанию</MenuItem>
                <MenuItem value="price_asc">Сначала дешёвые</MenuItem>
                <MenuItem value="price_desc">Сначала дорогие</MenuItem>
                <MenuItem value="newest">Сначала новые</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
    </Box>
  );
}