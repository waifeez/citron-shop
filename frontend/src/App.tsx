import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: 16, padding: 16 }}>
        <Link to="/">Главная</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/cart">Корзина</Link>
        <Link to="/login">Вход</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;