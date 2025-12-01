# Clothing E-Commerce Application

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce web application for a fictional clothing brand. Features include user authentication, product browsing with advanced filtering, shopping cart management, order processing, and email notifications.

## 🌐 Live Demo

- **Frontend**: [https://clothing-ecommerce-mu-one.vercel.app/](https://clothing-ecommerce-mu-one.vercel.app/)
- **Backend API**: [https://clothing-ecommerce-rldl.onrender.com/api](https://clothing-ecommerce-rldl.onrender.com/api)

> **Note**: The backend is hosted on Render's free tier and may take 30-60 seconds to wake up on the first request after inactivity.

## 🚀 Features

### User Features
- **User Authentication**: Register, login, and logout with JWT authentication
- **Product Browsing**: View all products with advanced filtering
  - Search by name/description
  - Filter by category (Men, Women, Kids, Unisex)
  - Filter by size (XS, S, M, L, XL, XXL)
  - Filter by price range
  - Pagination support
- **Product Details**: View detailed product information with size selection
- **Shopping Cart**: 
  - Add/update/remove items
  - Guest cart support (localStorage)
  - Cart sync on login
- **Checkout**: Place orders with shipping address
- **Order Management**: View order history and order details
- **Email Notifications**: Order confirmation emails

### Admin Features (Backend)
- View all orders
- Update order status
- Manage products (CRUD operations)

## 🛠️ Tech Stack

### Backend
- **Node.js** (v18+)
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Cloudinary** - Image hosting (configured)

### Frontend
- **React.js** (with Vite)
- **React Router v6** - Routing
- **Zustand** - State management
- **Axios** - HTTP client

## 📁 Project Structure

```
clothing-ecommerce/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   └── order.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Product.model.js
│   │   ├── Cart.model.js
│   │   └── Order.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── product.route.js
│   │   ├── cart.route.js
│   │   └── order.route.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── sendEmail.js
│   ├── seedProducts.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── OrderSuccess.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   ├── cartStore.js
│   │   │   └── productStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/imthiyagu07/clothing-ecommerce.git
cd clothing-ecommerce
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Email Configuration (Mailtrap for testing)
EMAIL_USER=your_mailtrap_username
EMAIL_PASS=your_mailtrap_password

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Seed Database
```bash
npm run seed
```

#### Start Backend Server
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Environment Variables
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start Frontend Server
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📧 Email Configuration

### Option 1: Mailtrap (Recommended for Testing)
1. Sign up at [Mailtrap.io](https://mailtrap.io)
2. Get your SMTP credentials from the inbox
3. Update `.env` with Mailtrap credentials

### Option 2: Gmail
1. Enable 2-Step Verification in your Google Account
2. Generate an App Password at [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Update `backend/utils/sendEmail.js`:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```
4. Update `.env` with your Gmail and App Password

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart/add` - Add item to cart (Protected)
- `PUT /api/cart/update` - Update cart item (Protected)
- `DELETE /api/cart/remove` - Remove from cart (Protected)
- `DELETE /api/cart/clear` - Clear cart (Protected)
- `POST /api/cart/sync` - Sync guest cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders/admin/all` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

## 🧪 Testing

### Test User Credentials
After seeding, you can create a new user or use the registration page.

### Admin Access
To test admin features, manually update a user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🌟 Key Features Implementation

### Guest Cart Support
- Cart items stored in localStorage for guest users
- Automatic cart sync when user logs in
- Seamless transition from guest to authenticated user

### Advanced Product Filtering
- Search by product name and description
- Multiple filter combinations
- Real-time filter updates
- Pagination for large product lists

### Order Management
- Complete order flow from cart to confirmation
- Email notifications on order placement
- Order history with detailed views
- Stock management (automatic reduction on order)

### Security
- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Protected routes on both frontend and backend
- CORS configuration for development

## 📝 Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed database with sample products
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🚀 Deployment

This application is deployed and live at:
- **Frontend (Vercel)**: [https://clothing-ecommerce-mu-one.vercel.app/](https://clothing-ecommerce-mu-one.vercel.app/)
- **Backend (Render)**: [https://clothing-ecommerce-rldl.onrender.com/api](https://clothing-ecommerce-rldl.onrender.com/api)

### Deployment Stack
- **Frontend**: Vercel (Free Tier)
- **Backend**: Render (Free Tier)
- **Database**: MongoDB Atlas (Free Tier - M0)
- **Email**: Mailtrap (Free Tier)

### Notes
- Backend may take 30-60 seconds to wake up on first request (Render free tier limitation)
- Automatic deployments enabled from GitHub `main` branch
- HTTPS enabled by default on both platforms

## 🔐 Environment Variables Reference

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | Yes |
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT | Yes |
| NODE_ENV | Environment (development/production) | Yes |
| EMAIL_USER | Email service username | Yes |
| EMAIL_PASS | Email service password | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Optional |
| CLOUDINARY_API_KEY | Cloudinary API key | Optional |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Optional |

### Frontend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| VITE_API_URL | Backend API URL | Yes |

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check network access settings in MongoDB Atlas
- Verify IP whitelist in MongoDB Atlas

### Email Not Sending
- Verify email credentials in `.env`
- Check Mailtrap inbox or Gmail app password
- Review console logs for detailed error messages

### CORS Errors
- Ensure frontend URL is added to CORS configuration in `server.js`
- Check that both servers are running on correct ports

## 📄 License

This project is created for educational purposes as part of the Pasovit Backend Developer Assignment.

## 👨‍💻 Author

**Your Name**
- GitHub: [@imthiyagu07](https://github.com/imthiyagu07)

## 🙏 Acknowledgments

- Product images from Unsplash
- Assignment by Pasovit
- Built with MERN Stack
