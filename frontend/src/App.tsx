import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { ProfilePage } from './pages/ProfilePage';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { logout } from './store/slices/authSlice';

function App() {
  const { user } = useAppSelector((s) => s.auth);
  const cartCount = useAppSelector((s) =>
    s.cart.lines.reduce((sum: number, l) => sum + l.quantity, 0)
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <nav style={{ display: 'flex', gap: 16, padding: 16, alignItems: 'center' }}>
        <Link to="/">Главная</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/cart">Корзина ({cartCount})</Link>

        {user ? (
          <>
            <Link to="/profile">Привет, {user.fullName}</Link>
            <button onClick={() => dispatch(logout())}>Выйти</button>
          </>
        ) : (
          <Link to="/login">Вход</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;