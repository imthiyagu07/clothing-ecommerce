import Product from '../models/Product.model.js';

// Get all products with search, filter, and pagination GET /api/products
export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      size,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
      featured
    } = req.query;

    // Build query object
    let query = {};

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by size
    if (size) {
      query.sizes = size;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Calculate pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);

    // Get products with pagination
    const products = await Product.find(query)
      .limit(limitNum)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.status(200).json({
      products,
      page: pageNum,
      pages: Math.ceil(totalProducts / limitNum),
      total: totalProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by ID GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product (Admin only) POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, sizes, stock, featured } = req.body;

    // Validation
    if (!name || !description || !price || !image || !category || !sizes) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      sizes,
      stock: stock || 0,
      featured: featured || false
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product (Admin only) PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.image = req.body.image || product.image;
      product.category = req.body.category || product.category;
      product.sizes = req.body.sizes || product.sizes;
      product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
      product.featured = req.body.featured !== undefined ? req.body.featured : product.featured;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product (Admin only) DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};