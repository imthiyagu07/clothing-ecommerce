import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getCartCount } = useCartStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo} onClick={closeMobileMenu}>
          ClothingStore
        </Link>

        {/* Hamburger Menu Button */}
        <button
          style={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
        </button>

        {/* Navigation Links */}
        <div style={{
          ...styles.links,
          ...(mobileMenuOpen ? styles.linksMobileOpen : styles.linksMobileClosed)
        }}>
          <Link to="/" style={styles.link} onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/products" style={styles.link} onClick={closeMobileMenu}>
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/orders" style={styles.link} onClick={closeMobileMenu}>
                Orders
              </Link>
              <Link to="/cart" style={styles.link} onClick={closeMobileMenu}>
                Cart ({getCartCount()})
              </Link>
              <span style={styles.user}>Hi, {user?.name}</span>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/cart" style={styles.link} onClick={closeMobileMenu}>
                Cart ({getCartCount()})
              </Link>
              <Link to="/login" style={styles.link} onClick={closeMobileMenu}>
                Login
              </Link>
              <Link to="/register" style={styles.link} onClick={closeMobileMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '1rem 0',
    marginBottom: '2rem',
    position: 'relative',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    zIndex: 1001,
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    zIndex: 1001,
  },
  hamburgerLine: {
    width: '25px',
    height: '3px',
    backgroundColor: '#fff',
    borderRadius: '2px',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  linksMobileClosed: {},
  linksMobileOpen: {},
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 0',
  },
  user: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

// Add responsive styles via CSS-in-JS media query alternative
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(max-width: 768px)');

  if (mediaQuery.matches) {
    styles.hamburger.display = 'flex';
    styles.links.position = 'fixed';
    styles.links.top = '0';
    styles.links.right = '0';
    styles.links.height = '100vh';
    styles.links.width = '250px';
    styles.links.backgroundColor = '#333';
    styles.links.flexDirection = 'column';
    styles.links.padding = '5rem 2rem 2rem';
    styles.links.gap = '1rem';
    styles.links.alignItems = 'flex-start';
    styles.links.boxShadow = '-2px 0 10px rgba(0,0,0,0.3)';
    styles.links.zIndex = '1000';

    styles.linksMobileClosed.transform = 'translateX(100%)';
    styles.linksMobileClosed.transition = 'transform 0.3s ease-in-out';

    styles.linksMobileOpen.transform = 'translateX(0)';
    styles.linksMobileOpen.transition = 'transform 0.3s ease-in-out';
  }
}

export default Navbar;