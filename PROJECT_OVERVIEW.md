# BANcat Project Overview

## 🌟 Executive Summary

**BANcat** is a comprehensive digital platform designed for the **Bangladesh Cancer Aid Trust**. It connects cancer patients with donors, manages aid programs, and shares success stories to raise awareness. The platform consists of three main components: a robust **Frontend** public website, a powerful **Admin Panel** for management, and a secure **Laravel API** backend.

---

## 🏗️ System Architecture

The project follows a modern, decoupled **Headless Architecture**:

| Component | Tech Stack | Port | Description |
|-----------|------------|------|-------------|
| **Backend API** | Laravel 10 (PHP 8.1+) | `:8000` | RESTful API, Database Logic, Auth, Email Services |
| **Frontend** | React 18 + Vite + TS | `:5173` | Public-facing website for donors and patients |
| **Admin Panel** | React 18 + Vite + TS | `:5174` | Secure dashboard for staff to manage content & data |

---

## 🛠️ Technology Stack

### Backend (Laravel)

- **Framework**: Laravel 10
- **Database**: SQLite (Dev) / MySQL (Prod ready)
- **Authentication**: Laravel Sanctum (Token-based)
- **Key Packages**:
  - `guzzlehttp/guzzle`: HTTP client
  - `predis/predis`: Redis client for caching/queues

### Frontend & Admin (React)

- **Build Tool**: Vite (Lightning fast dev server)
- **Language**: TypeScript (Type safety)
- **UI Framework**: Material UI (MUI) v5
- **State Management**: React Query (Server state), Context API (Global UI state)
- **Internationalization**: `react-i18next` (English & Bangla support)
- **Styling**: Emotion & Custom MUI Theme (Pink/Teal branding)
- **Forms**: React Hook Form + Yup Validation

---

## 🚀 Key Features

### 1. Donation System (Core)

- **Multiple Flows**: General donation, specific patient support, campaign backing.
- **Payment Mockup**: Integrated simulation for Bkash/Card payments (extensible to real gateways).
- **Transparency**: Real-time tracking of funds raised per patient and campaign.
- **Donation Drawer**: Seamless sidebar experience for quick giving.

### 2. Patient Management

- **Profiles**: Detailed patient stories, medical needs, and funding goals.
- **Search & Filter**: Find patients by cancer type, district, or helping status.
- **Progress Tracking**: Visual progress bars showing funded % vs. target.

### 3. Application Modules

- **Campaigns**: Seasonal or thematic fundraising drives.
- **Programs**: Ongoing assistance initiatives (e.g., Medicine supply, Transportation).
- **Stories**: Survivor and caregiver stories to inspire hope.
- **Volunteers**: Recruitment and management system.
- **Team**: Staff and board member showcasing.

### 4. Admin Dashboard

- **CRUD Operations**: Full management of Patients, Campaigns, Stories, etc.
- **Donation Records**: View and track all incoming donations.
- **Secure Access**: Role-based access control (currently Super Admin).

---

## 📂 Project Structure

```
bancat/
├── backend/            # Laravel API Application
│   ├── app/            # Models, Controllers, Services
│   ├── database/       # Migrations, Seeders, SQLite DB
│   └── routes/         # API Route definitions
│
├── frontend/           # Public Website (React)
│   ├── src/components  # Reusable UI Components
│   ├── src/pages       # Route Pages (Home, Patients, Donate)
│   └── src/services    # API clients (axios)
│
└── admin/              # Management Dashboard (React)
    ├── src/pages/admin # Admin-specific CRUD pages
    └── src/services    # Admin API clients
```

---

## 📈 Status

- **Development**: Active
- **Testing**: Automated tests set up (Vitest for frontend, PHPUnit for backend)
- **Localization**: Bilingual support implemented (EN/BN)
- **Deployment**: Ready for containerization (Docker setup available)

This platform is feature-rich, designed for scalability, and focused on user experience to maximize aid flow to cancer patients in Bangladesh.
