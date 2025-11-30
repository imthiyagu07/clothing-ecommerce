import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';

const Cart = () => {
  const { cart, loading, fetchCart, updateCartItem, removeFromCart, getCartTotal, getCartCount } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const handleUpdateQuantity = async (productId, size, quantity) => {
    if (quantity < 1) return;
    await updateCartItem(productId, size, quantity, isAuthenticated);
  };

  const handleRemove = async (productId, size) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      await removeFromCart(productId, size, isAuthenticated);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please login to proceed to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return <div style={styles.container}>Loading cart...</div>;
  }

  if (!cart || cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" style={styles.shopButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Shopping Cart</h1>
      <p style={styles.itemCount}>You have {getCartCount()} item(s) in your cart</p>

      <div style={styles.cartContainer}>
        <div style={styles.itemsContainer}>
          {cart.map((item) => (
            <div key={`${item.product._id}-${item.size}`} style={styles.cartItem}>
              <img src={item.product.image} alt={item.product.name} style={styles.image} />
              
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.product.name}</h3>
                <p style={styles.itemCategory}>{item.product.category}</p>
                <p style={styles.itemSize}>Size: {item.size}</p>
                <p style={styles.itemPrice}>₹{item.product.price}</p>
              </div>

              <div style={styles.itemActions}>
                <div style={styles.quantityControl}>
                  <button
                    onClick={() => handleUpdateQuantity(item.product._id, item.size, item.quantity - 1)}
                    style={styles.quantityButton}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.product._id, item.size, item.quantity + 1)}
                    style={styles.quantityButton}
                    disabled={item.quantity >= item.product.stock}
                  >
                    +
                  </button>
                </div>

                <p style={styles.itemTotal}>
                  Subtotal: ₹{item.product.price * item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.product._id, item.size)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h2>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Items ({getCartCount()}):</span>
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

          <button onClick={handleCheckout} style={styles.checkoutButton}>
            Proceed to Checkout
          </button>

          <Link to="/products" style={styles.continueButton}>
            Continue Shopping
          </Link>
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
  itemCount: {
    color: '#666',
    marginBottom: '2rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  shopButton: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  cartContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'flex',
    gap: '1.5rem',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  itemCategory: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.25rem',
  },
  itemSize: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  itemPrice: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.75rem',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '0.25rem',
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: 'none',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1.2rem',
  },
  quantity: {
    padding: '0 1rem',
    fontSize: '1rem',
  },
  itemTotal: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  removeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  summary: {
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    height: 'fit-content',
    position: 'sticky',
    top: '2rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  summaryDivider: {
    borderTop: '1px solid #ddd',
    margin: '1rem 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  checkoutButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  continueButton: {
    display: 'block',
    textAlign: 'center',
    padding: '0.75rem',
    color: '#4CAF50',
    textDecoration: 'none',
    border: '1px solid #4CAF50',
    borderRadius: '4px',
  },
};

export default Cart;