import { useEffect, useState } from 'react';
import { Box, Typography, Rating, TextField, Button, Divider, Alert, Stack } from '@mui/material';
import { reviewsApi, type ProductReviewsSummary } from '../api/reviewsApi';
import { useAppSelector } from '../store/hooks';

export function ProductReviews({ productId }: { productId: string }) {
  const { user } = useAppSelector((s) => s.auth);
  const [summary, setSummary] = useState<ProductReviewsSummary | null>(null);
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    reviewsApi.get(productId).then(setSummary);
  }, [productId]);

  const handleSubmit = async () => {
    if (!rating) {
      setError('Поставь оценку');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const updated = await reviewsApi.add(productId, rating, comment);
      setSummary(updated);
      setComment('');
    } catch {
      setError('Не удалось отправить отзыв');
    } finally {
      setSubmitting(false);
    }
  };

  if (!summary) return null;

  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 4 }} />

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Отзывы</Typography>
        {summary.totalCount > 0 && (
          <>
            <Rating value={summary.averageRating} precision={0.1} readOnly size="small" />
            <Typography color="text.secondary" sx={{ fontSize: 14 }}>
              {summary.averageRating} ({summary.totalCount})
            </Typography>
          </>
        )}
      </Stack>

      {user ? (
        <Box sx={{ mb: 4, p: 2.5, bgcolor: 'rgba(30,122,76,0.05)', borderRadius: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Rating value={rating} onChange={(_, v) => setRating(v)} sx={{ mb: 1.5 }} />
          <TextField
            placeholder="Поделись впечатлением о товаре (необязательно)"
            multiline
            rows={2}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 1.5, bgcolor: '#fff' }}
          />
          <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Отправляем...' : 'Оставить отзыв'}
          </Button>
        </Box>
      ) : (
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Войди в аккаунт, чтобы оставить отзыв
        </Typography>
      )}

      {summary.reviews.length === 0 ? (
        <Typography color="text.secondary">Пока нет отзывов — будь первым!</Typography>
      ) : (
        summary.reviews.map((review) => (
          <Box key={review.id} sx={{ mb: 2.5 }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontWeight: 600 }}>{review.userName}</Typography>
              <Rating value={review.rating} readOnly size="small" />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {new Date(review.createdAt).toLocaleDateString('ru-RU')}
            </Typography>
            {review.comment && <Typography variant="body2">{review.comment}</Typography>}
          </Box>
        ))
      )}
    </Box>
  );
}