# 👨‍🍳 ChefBook - Culinary Hub & Booking System

ChefBook is a modern, comprehensive web-based platform designed to connect food enthusiasts with professional chefs. The platform caters to users looking for authentic, master-crafted recipes and those wanting to hire private chefs for events, parties, and customized culinary experiences.

## ✨ Features

- **Discover Master Recipes:** Browse an extensive catalog of detailed recipes crafted by verified professional chefs. Filter recipes by cuisine type, difficulty, preparation time, and spice level.
- **Hire Private Chefs:** View profiles of top-tier private chefs, complete with reviews, ratings, and specialties (e.g., North Indian, South Indian, Chinese, etc.).
- **Flexible Pricing Plans:** Chefs provide varied service plans (Basic, Premium, Luxury) catering to different event sizes, durations, and culinary complexities.
- **Booking Management:** Integrated booking dashboard that allows users to hire chefs, select specific pricing plans, and track their booking states (Pending, Confirmed, Completed, Cancelled).
- **Secure Architecture:** Authentication and secure data isolation handled powerfully using Supabase Row Level Security (RLS). 

## 🛠️ Technologies Used

### Frontend Interface
- **React.js & TypeScript:** Static typing guarantees and robust interface structures.
- **Vite:** High-performance, next-generation build tool.
- **Tailwind CSS:** Highly customizable, utility-first CSS framework establishing the aesthetic UI.
- **Lucide Icons:** Clean and flexible vector icons.

### Backend & Database
- **Supabase (PostgreSQL):** Open-source backend-as-a-service providing a real-time Postgres database. Enforces strict schema constraints, references, and relationships across entities.

## 🚀 Getting Started

Follow these steps to set up ChefBook locally on your machine.

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun package manager
- A Supabase account

### 2. Clone and Install Dependencies

```bash
# Install dependencies
npm install 
# or if using bun
bun install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
The relational database relies on five primary tables: `users`, `chefs`, `pricing_plans`, `recipes`, and `bookings`. 

Run the provided `supabase_schema.sql` inside your **Supabase SQL Editor** to automatically structure the database, enforce Row-Level Security, and populate the tables with initialized seed data.

### 5. Running Locally

```bash
npm run dev
```

The application will spin up at `http://localhost:8080/`.

## 📂 Project Structure

```text
├── public/                 # Static assets and images
├── src/                    
│   ├── components/         # Reusable UI components (Navbar, Badges, Buttons)
│   ├── pages/              # Standard frontend pages (Home, Recipes, Pricing)
│   ├── lib/                # Config logic (supabase.ts integration)
│   ├── App.tsx             # Root React Router mapping
│   └── index.css           # Global Tailwind entries
├── supabase_schema.sql     # Complete PostgreSQL structure & seed queries
└── tailwind.config.ts      # UI styling configuration
```

## 📜 License
This project was developed as a mini-project for the Database Management Systems (CS2102-1) curriculum at NMAM Institute of Technology. All rights reserved.
