# 🌐 BANcat Remote Sharing - Quick Reference

## 🎯 Current Public Service

**Admin Panel is PUBLIC:**
```
✨ https://b8471bf64bf7.ngrok-free.app
```

**Login credentials:**
- Email: `superadmin@bancat.org`
- Password: `password`

> [!NOTE]
> First-time visitors will see ngrok warning - click "Visit Site"

---

## 🔄 Switch Between Services

Ngrok free allows 1 tunnel at a time. In the ngrok terminal:

### Show Frontend (Public Website)
```powershell
# Press Ctrl+C, then:
ngrok http 5173
```

### Show Admin Panel  
```powershell
# Press Ctrl+C, then:
ngrok http 5174
```

### Show Backend API
```powershell
# Press Ctrl+C, then:
ngrok http 8000
```

---

## 📊 Service Status

| Service | Port | Currently Public? |
|---------|------|-------------------|
| Backend API | 8000 | ⚠️ No |
| Frontend Website | 5173 | ⚠️ No |
| **Admin Panel** | 5174 | ✅ **Yes** |

---

## 📝 What to Share

Depending on what your friend needs to see:

**For viewing the website:**
- Switch to port 5173
- Share the new ngrok URL

**For backend API testing:**
- Switch to port 8000  
- Share: `https://YOUR-URL.ngrok-free.app/api/v1`

**For admin access (current):**
- Share: `https://b8471bf64bf7.ngrok-free.app`
- Share login: `superadmin@bancat.org` / `password`

---

*Quick reference for remote collaboration*
