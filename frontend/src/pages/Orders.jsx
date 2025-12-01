import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading orders...</div>;
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
          <Link to="/products" style={styles.shopButton}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>My Orders</h1>
      <p style={styles.subtitle}>You have {orders.length} order(s)</p>

      <div style={styles.ordersContainer}>
        {orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              <div>
                <h3>Order #{order._id.slice(-8)}</h3>
                <p style={styles.orderDate}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div style={styles.statusBadge}>
                {order.status}
              </div>
            </div>

            <div style={styles.orderItems}>
              {order.items.map((item, index) => (
                <div key={index} style={styles.orderItem}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  <div style={styles.itemInfo}>
                    <p style={styles.itemName}>{item.name}</p>
                    <p style={styles.itemDetails}>
                      Size: {item.size} | Qty: {item.quantity} | ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.orderFooter}>
              <div style={styles.totalPrice}>
                Total: ₹{order.totalPrice}
              </div>
              <Link to={`/order/${order._id}`} style={styles.viewButton}>
                View Details
              </Link>
            </div>
          </div>
        ))}
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
  subtitle: {
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
  ordersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  orderCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: '#fff',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  },
  orderDate: {
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '0.25rem',
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.9rem',
    textTransform: 'capitalize',
  },
  orderItems: {
    marginBottom: '1rem',
  },
  orderItem: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '0.75rem',
  },
  itemImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: '500',
    marginBottom: '0.25rem',
  },
  itemDetails: {
    fontSize: '0.9rem',
    color: '#666',
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
  },
  totalPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  viewButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#2196F3',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default Orders;