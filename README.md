# 🍽️ Restaurant Ordering Portal

A modern, full-featured restaurant ordering system built with Next.js 16, TypeScript, and Tailwind CSS. Features a clean, professional design inspired by industry leaders like DoorDash and Uber Eats.

This comprehensive web application provides an end-to-end solution for restaurant ordering, featuring 91 dishes across 6 international cuisines, advanced filtering and search capabilities, multiple payment options, and a powerful admin dashboard for real-time order management. Built with performance and user experience in mind, it combines the latest web technologies with a minimal, intuitive interface that makes ordering food effortless for customers and managing orders simple for restaurant staff.

Perfect for restaurants looking to establish or upgrade their online presence with a professional, scalable ordering platform that can be customized and deployed quickly.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 Clean, Modern UI
- **Minimal Design**: Professional, real-world inspired interface with clean white cards and subtle borders
- **Responsive Layout**: Fully responsive design that works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant transitions and hover effects throughout the application
- **Dark Mode Ready**: Clean slate color scheme optimized for modern interfaces

### 🍕 Menu System (91 Dishes)
- **6 International Cuisines**:
  - 🇮🇳 Indian (13 dishes)
  - 🇨🇳 Chinese (14 dishes)
  - 🍛 South Indian (9 dishes)
  - 🇮🇹 Italian (10 dishes)
  - 🇲🇽 Mexican (9 dishes)
  - 🇺🇸 American (14 dishes)

- **Advanced Filtering**:
  - Filter by cuisine type
  - Filter by food category (Appetizers, Main Courses, Desserts, Beverages)
  - Diet preferences (All, Vegetarian, Non-Vegetarian)
  - Spicy dishes toggle
  - Real-time search functionality

- **Multiple View Modes**:
  - 4-column grid view
  - 3-column grid view
  - List view

- **Smart Sorting**:
  - Most Popular
  - Top Rated
  - Price: Low to High
  - Price: High to Low

### 🛒 Shopping Cart
- Add/remove items with quantity controls
- Real-time cart total calculation
- Persistent cart using localStorage
- Clean cart summary with item details
- Quick cart access from navigation

### 📦 Checkout System
- **Simplified Form**: Name and phone only (address removed for streamlined experience)
- **Multiple Payment Options**:
  - 💳 Credit/Debit Card (with card details form)
  - 📱 UPI (with UPI ID input)
  - 💰 Digital Wallets (Paytm, PhonePe, Amazon Pay, Google Pay)
  - 💵 Cash on Delivery
- **Success Animation**: Animated success modal on order placement
- Automatic redirect to orders page after successful order

### 📋 Order Management
- **Customer Orders Page**:
  - Clean, minimal design with white cards
  - Inline status badges
  - Order history with date/time
  - Expandable order details showing all items
  - Order summary with subtotal, tax (8%), and total
  - Estimated delivery time display
  - Real-time status updates

- **Order Status Tracking**:
  - 🕐 Pending
  - 👨‍🍳 Preparing
  - ✅ Ready
  - 🚚 Delivered
  - ❌ Cancelled

### 👨‍💼 Admin Dashboard
- **Real-time Order Reception**: 5-second polling for new orders
- **Clean Statistics Cards**:
  - Total Orders
  - Pending Orders
  - Today's Orders
  - Total Revenue
  
- **Order Management**:
  - Grid and List view toggle
  - Advanced search by Order ID, Customer Name, or Phone
  - Filter by status (All, Pending, Preparing, Ready, Delivered)
  - Order details with customer info
  - Quick action buttons for status updates
  
- **Status Management**:
  - Update order status with one click
  - Cancel orders
  - Mark as preparing/ready/delivered
  - Visual status indicators

### 🎯 Additional Features
- **LocalStorage Integration**: Persistent cart and order data
- **Responsive Navigation**: Clean header with cart indicator
- **Image Optimization**: Next.js Image component for optimal loading
- **Type Safety**: Full TypeScript implementation
- **Component Architecture**: Modular, reusable components
- **Clean Code**: Well-organized file structure

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aryankumarsingh99/restaurant-ordering-portal.git
cd restaurant-ordering-portal
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
restaurant-ordering-portal/
├── app/
│   ├── admin/
│   │   └── page.tsx           # Admin dashboard
│   ├── cart/
│   │   └── page.tsx           # Shopping cart
│   ├── checkout/
│   │   └── page.tsx           # Checkout with payment options
│   ├── menu/
│   │   └── page.tsx           # Menu browsing page
│   ├── orders/
│   │   └── page.tsx           # Customer order history
│   ├── layout.tsx             # Root layout with navigation
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx             # Footer component
│   └── MenuCard.tsx           # Menu item card
├── contexts/
│   └── CartContext.tsx        # Cart state management
├── lib/
│   └── menuData.ts            # Menu items data (91 dishes)
├── types/
│   └── index.ts               # TypeScript type definitions
└── public/
    └── images/                # Static images
```

## 🛠️ Technologies Used

- **Framework**: [Next.js 16.0.1](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **State Management**: React Context API for cart management
- **Data Persistence**: LocalStorage for cart and orders
- **Image Optimization**: Next.js Image component with Unsplash images

## 📊 Menu Statistics

- **Total Dishes**: 91
- **Cuisines**: 6 international cuisines
- **Categories**: 4 (Appetizers, Main Courses, Desserts, Beverages)
- **Vegetarian Options**: 35+ dishes
- **Spicy Options**: 30+ dishes
- **Price Range**: $3.99 - $32.99

## 🎨 Design Philosophy

The application follows a clean, minimal design approach inspired by modern food delivery platforms:

- **White Backgrounds**: Clean, professional appearance
- **Subtle Borders**: Slate-200 borders for card separation
- **Minimal Gradients**: No excessive color gradients
- **Consistent Typography**: Clear hierarchy with proper font weights
- **Slate Color Scheme**: Professional slate-900 for primary actions
- **Inline Elements**: Compact, scannable layouts
- **Hover States**: Subtle hover effects for better UX

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS 4.0 with a custom configuration. Modify `tailwind.config.ts` for customization.

### Menu Data
Edit `lib/menuData.ts` to add, remove, or modify menu items. Each item includes:
- Name, description, price
- Category and cuisine type
- Vegetarian and spicy indicators
- Popularity and rating
- High-quality images from Unsplash

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with restaurant image
- Featured menu items
- Call-to-action buttons

### Menu Page (`/menu`)
- Browse all 91 dishes
- Advanced filtering and search
- Multiple view modes
- Sidebar with filters
- Add to cart functionality

### Cart Page (`/cart`)
- Review selected items
- Adjust quantities
- See total price
- Proceed to checkout

### Checkout Page (`/checkout`)
- Enter customer details (name, phone)
- Select payment method
- Place order with success animation
- Automatic redirect to orders

### Orders Page (`/orders`)
- View all past orders
- Track order status
- Expandable order details
- Clean, minimal design

### Admin Dashboard (`/admin`)
- Real-time order management
- Statistics overview
- Search and filter orders
- Update order status
- Grid/List view toggle

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com/new)
3. Deploy with one click

### Other Deployment Options
- **Netlify**: Compatible with Next.js
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment
- **Self-hosted**: Node.js server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Aryan Kumar Singh**
- GitHub: [@aryankumarsingh99](https://github.com/aryankumarsingh99)

## 🙏 Acknowledgments

- Design inspiration from DoorDash, Uber Eats, and modern food delivery platforms
- Images provided by [Unsplash](https://unsplash.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**⭐ If you like this project, please give it a star on GitHub! ⭐**
