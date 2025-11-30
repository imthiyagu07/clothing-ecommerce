import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <Link to={`/product/${product._id}`} style={styles.link}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.content}>
          <h3 style={styles.name}>{product.name}</h3>
          <p style={styles.description}>{product.description.substring(0, 60)}...</p>
          <div style={styles.footer}>
            <span style={styles.price}>₹{product.price}</span>
            <span style={styles.category}>{product.category}</span>
          </div>
          {product.stock === 0 && <span style={styles.outOfStock}>Out of Stock</span>}
        </div>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  content: {
    padding: '1rem',
  },
  name: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.75rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  category: {
    fontSize: '0.85rem',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
  outOfStock: {
    display: 'block',
    marginTop: '0.5rem',
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
};

export default ProductCard;