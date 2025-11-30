import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<div style={{ padding: '2rem' }}>Cart Page - Coming Soon</div>} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <div style={{ padding: '2rem' }}>Checkout Page - Coming Soon</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <div style={{ padding: '2rem' }}>Orders Page - Coming Soon</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <div style={{ padding: '2rem' }}>Order Success - Coming Soon</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;