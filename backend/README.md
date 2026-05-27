# JD Co Backend API

Express.js backend for the admin dashboard with MongoDB integration.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory (already created) and add your MongoDB URI:

```
MONGODB_URI=mongodb+srv://Kingsdb:kingsdb123@cluster0.v6jzh5d.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
PORT=3000
NODE_ENV=development
ADMIN_EMAIL=admin@jdco.com
ADMIN_PASSWORD=admin123
```

### 3. Start Development Server

```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication
- **POST** `/api/admin/login` - Admin login

### Admin Management (Protected Routes)
- **GET** `/api/admin` - Get all admins
- **POST** `/api/admin` - Create new admin
- **PUT** `/api/admin/:id` - Update admin
- **DELETE** `/api/admin/:id` - Delete admin

### Product Management
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create product (Protected)
- **PUT** `/api/products/:id` - Update product (Protected)
- **DELETE** `/api/products/:id` - Delete product (Protected)

### Health Check
- **GET** `/api/health` - Check if server is running

## Authentication

Include JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Models

### Admin
- email (unique, required)
- password (hashed, required)
- firstName (required)
- lastName (required)
- role (admin/superadmin)
- isActive (default: true)
- timestamps

### Product
- name (required)
- description (required)
- price (required)
- category (required)
- image
- stock (default: 0)
- isActive (default: true)
- timestamps

## Build & Production

```bash
npm run build
npm start
```

This will compile TypeScript and run the production server.
