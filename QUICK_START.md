# BANcat Quick Start Guide

## 🚀 Starting the Application

Run these commands in **3 separate terminals**:

### 1. Backend API (Laravel)
```bash
cd backend
php artisan serve
```
**Runs on:** http://127.0.0.1:8000

### 2. Frontend Website (React)
```bash
cd frontend
npm run dev
```
**Runs on:** http://localhost:5173

### 3. Admin Panel (React)
```bash
cd admin
npm run dev
```
**Runs on:** http://localhost:5174

---

## 🔑 Admin Credentials

- **Email:** `superadmin@bancat.org`
- **Password:** `password`

---

## ✅ Current Status

### Completed Features:
- ✅ Patient Management (CRUD)
- ✅ Campaign Management
- ✅ Program Management
- ✅ Success Stories
- ✅ **Donation System (NEW!)**
  - Donation sidebar drawer on frontend
  - Patient selection with search
  - Campaign selection
  - General donations
  - Auto-update raised amounts
  - Success page after payment
  - Admin donation list

### Recent Updates:
- **Donation Flow**: Users can donate via sidebar drawer -> Mock payment -> Success page
- **Admin Panel**: View all donations at `/donations`
- **Raised Amounts**: Automatically updated when donations complete

---

## 📍 Important URLs

### Frontend (Public Website)
- Home: http://localhost:5173
- Patients: http://localhost:5173/patients
- Campaigns: http://localhost:5173/campaigns
- Donate: Click any "Donate" button

### Admin Panel
- Login: http://localhost:5174/login
- Dashboard: http://localhost:5174
- Patients: http://localhost:5174/patients
- Donations: http://localhost:5174/donations
- Campaigns: http://localhost:5174/campaigns

### API
- Base URL: http://127.0.0.1:8000/api/v1
- Donations: http://127.0.0.1:8000/api/v1/admin/donations

---

## 🗄️ Database

**Type:** SQLite  
**Location:** `backend/database/database.sqlite`

### Quick Commands:
```bash
# View all donations
cd backend
php artisan tinker --execute="echo App\Models\Donation::count();"

# Clear cache if needed
php artisan cache:clear
php artisan route:clear
```

---

## 🐛 Troubleshooting

### Frontend won't load?
```bash
cd frontend
npm install
npm run dev
```

### Backend errors?
```bash
cd backend
composer install
php artisan migrate --seed
```

### Admin panel not showing donations?
- Make sure you're logged in as superadmin
- Check that backend is running on port 8000
- Donations endpoint is at `/admin/donations`

---

## 📝 Notes

- **Database**: All data is in SQLite (no MySQL needed)
- **Mock Payment**: Donations auto-complete (no real payment gateway)
- **Raised Amounts**: Update automatically when payment completes
- **Transaction IDs**: Format `TRX-XXXXXXXXXX`

---

**Last Updated:** December 6, 2025  
**Working Session End:** All 3 servers running, donation system functional
