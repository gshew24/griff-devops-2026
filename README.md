# FitTrack

FitTrack is a simple nutrition and macro tracking web application inspired by MyFitnessPal. Users can log meals, track calories/macros, and manage entries through a clean UI.

---

## 🚀 Live App (GCP)
http://localhost:3000

---

## 📦 Repository
https://github.com/gshew24/griff-devops-2026

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bootstrap
- jQuery
- Google Cloud Platform (VM)
- NGINX Reverse Proxy

---

## ✅ Capabilities

- [x] MongoDB Integration (Atlas)
- [x] Mongoose Schema + Models
- [x] RESTful API (CRUD)
- [x] Authentication (Register/Login)
- [x] Protected Routes (JWT Middleware)
- [x] UI Integration with API
- [x] Deployment to GCP VM
- [ ] Search / Filter (Planned Enhancement)

---

## 📌 Issues (Development Work)

- Mongoose Integration  
  https://github.com/gshew24/griff-devops-2026/issues/9

- Authentication System  
  https://github.com/gshew24/griff-devops-2026/issues/4

- Search Feature 
  https://github.com/gshew24/griff-devops-2026/issues/5

---

## 🗺 Milestones

- Core Backend Complete  
- Authentication Complete  
- UI + Integration Complete  
- Deployment Complete  

---

## 🔐 Authentication

Users can:
- Register an account
- Login to receive a JWT token
- Access protected endpoints

Protected endpoints:
- `/api/foods`

---

## 📡 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Food
- GET `/api/foods`
- POST `/api/foods`
- PUT `/api/foods/:id`
- DELETE `/api/foods/:id`

---

### Install dependencies
bash
npm install

---

## 🌐 Deployment Notes

- Hosted on Google Cloud VM
- Uses PM2 for process management
- NGINX configured as reverse proxy
- GitHub Actions used for deployment

---

## 🧠 Reflection

- Backend API design
- Database integration
- Authentication and security
- Frontend UI interaction
- Cloud deployment

---


## 🔮 Future Improvements

- Macro charts / analytics
- User-specific data isolation
- Improved UI/UX

---

## 👤 Author

- Griffin Shewbart 
- CIS 486