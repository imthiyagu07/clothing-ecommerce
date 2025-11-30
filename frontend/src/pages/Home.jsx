import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../store/productStore';

const Home = () => {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts({ featured: 'true', limit: 8 });
  }, []);

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Welcome to ClothingStore</h1>
      <p>Discover our latest collection</p>

      <h2 style={styles.heading}>Featured Products</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <Link to={`/product/${product._id}`} style={styles.button}>
              View Details
            </Link>
          </div>
        ))}
      </div>

      <Link to="/products" style={styles.viewAll}>
        View All Products →
      </Link>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  heading: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    borderRadius: '4px',
    marginTop: '0.5rem',
  },
  viewAll: {
    display: 'block',
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#4CAF50',
    textDecoration: 'none',
    marginTop: '2rem',
  },
};

export default Home;