import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStore';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, fetchProduct } = useProductStore();
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleAddToCart = async () => {
    setError('');
    setSuccess('');

    if (!selectedSize) {
      setError('Please select a size');
      return;
    }

    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    if (product.stock < quantity) {
      setError(`Only ${product.stock} items available in stock`);
      return;
    }

    try {
      await addToCart(product._id, selectedSize, quantity, isAuthenticated);
      setSuccess('Product added to cart!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading product...</div>;
  }

  if (!product) {
    return <div style={styles.container}>Product not found</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/products')} style={styles.backButton}>
        ← Back to Products
      </button>

      <div style={styles.productContainer}>
        <div style={styles.imageContainer}>
          <img src={product.image} alt={product.name} style={styles.image} />
        </div>

        <div style={styles.details}>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.category}>Category: {product.category}</p>
          <p style={styles.price}>₹{product.price}</p>
          <p style={styles.description}>{product.description}</p>

          <div style={styles.stock}>
            {product.stock > 0 ? (
              <span style={styles.inStock}>In Stock ({product.stock} available)</span>
            ) : (
              <span style={styles.outOfStock}>Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Size:</label>
                <div style={styles.sizeContainer}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        ...styles.sizeButton,
                        ...(selectedSize === size ? styles.sizeButtonActive : {}),
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={styles.quantityInput}
                />
              </div>

              {error && <div style={styles.error}>{error}</div>}
              {success && <div style={styles.success}>{success}</div>}

              <button onClick={handleAddToCart} style={styles.addButton}>
                Add to Cart
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  setTimeout(() => navigate('/cart'), 1000);
                }}
                style={styles.buyButton}
              >
                Buy Now
              </button>
            </>
          )}
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
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#666',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '2rem',
  },
  productContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  category: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '1.5rem',
  },
  stock: {
    marginBottom: '1.5rem',
  },
  inStock: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  outOfStock: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  sizeContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  sizeButton: {
    padding: '0.5rem 1rem',
    border: '2px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  sizeButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  quantityInput: {
    width: '100px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  addButton: {
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
  buyButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#FF9800',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
  error: {
    padding: '0.75rem',
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  success: {
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
};

export default ProductDetail;