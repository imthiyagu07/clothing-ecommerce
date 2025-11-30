import { useEffect, useState } from 'react';
import useProductStore from '../store/productStore';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products, loading, pagination, fetchProducts } = useProductStore();
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    size: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(filters);
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      size: '',
      minPrice: '',
      maxPrice: '',
      page: 1,
      limit: 12,
    });
  };

  return (
    <div style={styles.container}>
      <h1>All Products</h1>

      {/* Filters Section */}
      <div style={styles.filtersContainer}>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search products..."
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>

        <div style={styles.filters}>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>

          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All Sizes</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
            style={styles.priceInput}
          />

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
            style={styles.priceInput}
          />

          <button onClick={clearFilters} style={styles.clearButton}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div style={styles.resultsInfo}>
        <p>Showing {products.length} of {pagination.total} products</p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div style={styles.loading}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={styles.noProducts}>No products found</div>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            style={styles.pageButton}
          >
            Previous
          </button>
          
          <span style={styles.pageInfo}>
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            style={styles.pageButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  filtersContainer: {
    marginTop: '1.5rem',
    marginBottom: '2rem',
  },
  searchForm: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  searchButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  filters: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  select: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
  priceInput: {
    width: '120px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.95rem',
  },
  clearButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  resultsInfo: {
    marginBottom: '1rem',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#666',
  },
  noProducts: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#666',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  pageButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  pageInfo: {
    fontSize: '1rem',
    color: '#333',
  },
};

export default Products;