import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';

// Get user's cart GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(200).json({ items: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart POST /api/cart/add
export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    // Validation
    if (!productId || !size || !quantity) {
      return res.status(400).json({ message: 'Please provide product, size, and quantity' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if size is available
    if (!product.sizes.includes(size)) {
      return res.status(400).json({ message: 'Size not available for this product' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, size, quantity }]
      });
    } else {
      // Check if item already exists in cart
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId && item.size === size
      );

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ product: productId, size, quantity });
      }

      await cart.save();
    }

    // Populate and return cart
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity PUT /api/cart/update
export const updateCartItem = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    // Validation
    if (!productId || !size || quantity === undefined) {
      return res.status(400).json({ message: 'Please provide product, size, and quantity' });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Check stock
    const product = await Product.findById(productId);
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart DELETE /api/cart/remove
export const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;

    // Validation
    if (!productId || !size) {
      return res.status(400).json({ message: 'Please provide product and size' });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item
    cart.items = cart.items.filter(
      item => !(item.product.toString() === productId && item.size === size)
    );

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart DELETE /api/cart/clear
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully', items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sync guest cart with user cart on login POST /api/cart/sync
export const syncCart = async (req, res) => {
  try {
    const { guestCart } = req.body;

    if (!guestCart || !Array.isArray(guestCart)) {
      return res.status(400).json({ message: 'Invalid cart data' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart with guest items
      cart = await Cart.create({
        user: req.user._id,
        items: guestCart
      });
    } else {
      // Merge guest cart with existing cart
      for (const guestItem of guestCart) {
        const itemIndex = cart.items.findIndex(
          item => item.product.toString() === guestItem.product && item.size === guestItem.size
        );

        if (itemIndex > -1) {
          // Update quantity (add guest quantity to existing)
          cart.items[itemIndex].quantity += guestItem.quantity;
        } else {
          // Add new item
          cart.items.push(guestItem);
        }
      }

      await cart.save();
    }

    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};