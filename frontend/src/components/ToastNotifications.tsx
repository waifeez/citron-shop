import { Snackbar, Alert, Slide, type SlideProps } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearToast } from '../store/slices/uiSlice';

function SlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export function ToastNotifications() {
  const toast = useAppSelector((s) => s.ui.toast);
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      key={toast?.key}
      open={!!toast}
      autoHideDuration={2800}
      onClose={() => dispatch(clearToast())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      slots={{ transition: SlideUp }}
      slotProps={{ transition: { timeout: { enter: 400, exit: 250 } } }}
      sx={{ bottom: { xs: 16, sm: 24 } }}
    >
      <Alert
        onClose={() => dispatch(clearToast())}
        severity="success"
        variant="filled"
        sx={{
          bgcolor: 'primary.main',
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(21,55,38,0.25)'
        }}
      >
        {toast?.message}
      </Alert>
    </Snackbar>
  );
}