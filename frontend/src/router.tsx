import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

const HomeRedirectElement = () => {
  const { user } = useAuth();
  return <Navigate to={user ? '/products' : '/login'} replace />;
};

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeRedirectElement />} />
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
