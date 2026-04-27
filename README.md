# FitTrack for CIS 486 Projects in Information Systems Spring 2026

## Contributors
Griffin Shewbart

---

## 🏋️ FitTrack Nutrition Tracker (Proposal)

### Link to App
https://fitness.barrycumbie.com

---

## 💡 App Idea
This project is a full-stack web application that allows users to track their daily nutrition by logging meals and monitoring macronutrients.

Users can:

- Register and log in securely
- Add food entries with calories and macros
- View all entries in a clean interface
- Edit and delete entries
- Search and filter through their data

The goal is to provide a simple and efficient alternative to complex nutrition apps like MyFitnessPal.

---

## 🎯 Target Users

- Individuals tracking calories/macros
- Beginner users who want a simple tracker
- Students looking for a lightweight nutrition tool
- Anyone who wants a clean and fast food logging experience

---

## ⚙️ Features

### Core Features (MVP)

- User authentication (register/login)
- Add food entries (calories, protein, carbs, fat)
- View food entries
- Edit food entries
- Delete food entries
- Search/filter food entries

---

## 📦 Selected Capability Boxes

| Component | Capability | Link | Explanation |
|----------|----------|------|-------------|
| Authentication System | Implemented JWT-based authentication | Issue #2 | Users must log in to access protected routes and data |
| Database Upgrade | MongoDB Atlas cloud database | Issue #1 | Stores user accounts and food entries persistently |
| UI/UX Overhaul | Styled UI using Bootstrap and custom CSS | Code (attend.html) | Created a clean and modern interface for usability |
| Search Functionality | Added client-side search/filtering | Issue #2 | Allows users to quickly filter food entries |
| Debug Case Study | Fixed MongoDB connection + VM permission errors | Issue #1 | Resolved connection string errors and EACCES permission issues |
| System / Infrastructure | Deployed on GCP VM with NGINX + PM2 | README / Demo | Handles production hosting and reverse proxy |
| Monitoring / Logging | Used PM2 and server logs | Demo | Ensures app stays running and can be debugged |
| Automation (CI/CD) | Manual GitHub deployment workflow | GitHub commits | Code is pushed and pulled to VM consistently |
| Deployment Guide | Documented deployment steps | README | Steps include SSH, npm install, PM2, and NGINX config |
| API / Backend | RESTful Express API | Code (routes/controllers) | Handles CRUD operations for food entries |

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- Bootstrap
- JavaScript (Vanilla + jQuery)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT (JSON Web Tokens)

### DevOps / Deployment
- Google Cloud Platform (VM)
- NGINX (reverse proxy)
- PM2 (process manager)

### Collaboration & Workflow
- GitHub Issues (task tracking)
- GitHub Milestones
- GitHub commits

---

## 🔧 Debug Example

During development, a major issue occurred with MongoDB connection failures.

- Problem: Incorrect MongoDB URI and DNS resolution errors
- Cause: Improper connection string and environment configuration
- Fix: Updated to correct MongoDB Atlas connection string and verified credentials

Additionally, VM permission errors (EACCES) were resolved by correcting file ownership using `chown`.

---

## 🏗️ System / Infrastructure

- App deployed on Google Cloud VM
- NGINX used as a reverse proxy to route traffic
- PM2 keeps the Node app running persistently
- MongoDB Atlas used as a cloud-hosted database

---

## 💻 Code Example

Example: Authentication Middleware

```javascript
export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // verifies JWT token
  next();
}