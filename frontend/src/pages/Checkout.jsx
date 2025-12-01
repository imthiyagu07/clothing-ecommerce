import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import api from '../services/api';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      setError('Please fill in all shipping address fields');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Prepare order items
      const orderItems = cart.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image,
      }));

      // Create order
      const response = await api.post('/orders', {
        items: orderItems,
        totalPrice: getCartTotal(),
        shippingAddress,
      });

      // Clear cart
      clearCart();

      // Navigate to order success page
      navigate(`/order/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <h2>Your cart is empty</h2>
        <p>Please add items to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>

      <div style={styles.checkoutContainer}>
        <div style={styles.formSection}>
          <h2>Shipping Information</h2>
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Address *</label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                style={styles.input}
                placeholder="Street address"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>City *</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                style={styles.input}
                placeholder="City"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Postal Code *</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                style={styles.input}
                placeholder="Postal code"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Country *</label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div style={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div style={styles.items}>
            {cart.map((item) => (
              <div key={`${item.product._id}-${item.size}`} style={styles.item}>
                <img src={item.product.image} alt={item.product.name} style={styles.itemImage} />
                <div style={styles.itemDetails}>
                  <p style={styles.itemName}>{item.product.name}</p>
                  <p style={styles.itemInfo}>Size: {item.size} | Qty: {item.quantity}</p>
                  <p style={styles.itemPrice}>₹{item.product.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summaryDivider}></div>
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div style={styles.summaryDivider}></div>
          <div style={styles.summaryTotal}>
            <span>Total:</span>
            <span>₹{getCartTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  checkoutContainer: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
  },
  formSection: {
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  form: {
    marginTop: '1rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  error: {
    padding: '0.75rem',
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  orderSummary: {
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    height: 'fit-content',
    position: 'sticky',
    top: '2rem',
  },
  items: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  item: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  },
  itemImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: '500',
    marginBottom: '0.25rem',
  },
  itemInfo: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.25rem',
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  summaryDivider: {
    borderTop: '1px solid #ddd',
    margin: '1rem 0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
};

export default Checkout;