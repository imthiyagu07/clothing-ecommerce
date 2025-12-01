import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading order details...</div>;
  }

  if (!order) {
    return <div style={styles.container}>Order not found</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.successCard}>
        <div style={styles.successIcon}>✓</div>
        <h1 style={styles.successTitle}>Order Placed Successfully!</h1>
        <p style={styles.successMessage}>
          Thank you for your order. A confirmation email has been sent to your email address.
        </p>

        <div style={styles.orderInfo}>
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
          <p><strong>Status:</strong> <span style={styles.status}>{order.status}</span></p>
        </div>

        <div style={styles.items}>
          <h3>Order Items</h3>
          {order.items.map((item, index) => (
            <div key={index} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <p style={styles.itemName}>{item.name}</p>
                <p style={styles.itemInfo}>Size: {item.size} | Quantity: {item.quantity}</p>
                <p style={styles.itemPrice}>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {order.shippingAddress && (
          <div style={styles.shipping}>
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        )}

        <div style={styles.total}>
          <h2>Total Amount: ₹{order.totalPrice}</h2>
        </div>

        <div style={styles.actions}>
          <Link to="/orders" style={styles.ordersButton}>
            View All Orders
          </Link>
          <Link to="/products" style={styles.shopButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  successCard: {
    padding: '3rem 2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
  },
  successTitle: {
    color: '#4CAF50',
    marginBottom: '1rem',
  },
  successMessage: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  orderInfo: {
    textAlign: 'left',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  status: {
    textTransform: 'capitalize',
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  items: {
    textAlign: 'left',
    marginBottom: '2rem',
  },
  item: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    border: '1px solid #eee',
    borderRadius: '4px',
    marginTop: '1rem',
  },
  itemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  itemInfo: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  shipping: {
    textAlign: 'left',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  total: {
    padding: '1.5rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  ordersButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2196F3',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  shopButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default OrderSuccess;