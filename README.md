# 🛍️ E-Commerce Demo Project

This is a demo **e-commerce web application** built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**. The project supports both **admin** and **user** roles with functionality for browsing products, managing cart, and placing orders.

## 🚀 Features

- 🔐 Authentication with Supabase
- 🛒 Shopping Cart and Checkout
- 📦 Product Listing and Filtering
- 🎛️ Admin Dashboard for Product Management
- 💳 Stripe Payment Integration
- 🖼️ Optimized Image Handling (Next.js Image)
- 🌐 Deployed on Vercel


🌐 Live Demo
You can view the deployed project at:
👉 https://project-demo-lac-six.vercel.app


## 🧑‍💻 Technologies Used

- Next.js (App Router)
- TypeScript
- Supabase (Auth & Database)
- Stripe (Payment Gateway)
- Tailwind CSS
- Vercel (Deployment)

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/project-demo.git
   cd project-demo
npm install
Create a .env.local file in the root and add:

env
Copy code
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
Run the development server

bash
Copy code
npm run dev

📁 Folder Structure
php
Copy code
project-demo/
├── app/                   # App Router pages
├── components/            # Reusable UI and logic components
├── lib/                   # Supabase client setup
├── services/              # Auth & Payment services
├── styles/                # Tailwind and global styles
├── public/                # Static files and images
└── .env.local             # Environment variables
