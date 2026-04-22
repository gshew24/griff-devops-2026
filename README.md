# FitTrack

FitTrack is a simple nutrition and macro tracking web application inspired by MyFitnessPal. Users can log meals, track calories/macros, and manage entries through a clean UI.

---

## 🚀 Live App (GCP)
http://localhost:3000

---

## 📦 Repository
https://github.com/gshew24/griff-devops-2026

---

## 👤 Author
Griffin Shewbart
CIS 486

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
  https://github.com/gshew24/griff-devops-2026/issues/1

- Authentication System  
  https://github.com/gshew24/griff-devops-2026/issues/2

- Search Feature 
  https://github.com/gshew24/griff-devops-2026/issues/3

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

## ⚙️ Setup Instructions

### 1. Install dependencies
```bash
npm install