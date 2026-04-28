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
| Authentication System | Implemented JWT-based authentication | [Issue #4](https://github.com/gshew24/griff-devops-2026/issues/4) | Users must log in to access protected routes and data |
| Database Upgrade | MongoDB Atlas cloud database | [Issue #9](https://github.com/gshew24/griff-devops-2026/issues/9) | Stores user accounts and food entries persistently |
| UI/UX Overhaul | Styled UI using Bootstrap and custom CSS | [Issue #6](https://github.com/gshew24/griff-devops-2026/issues/6) | Created a clean and modern interface for usability |
| Search Functionality | Added client-side search/filtering | [Issue #5](https://github.com/gshew24/griff-devops-2026/issues/5) | Allows users to quickly filter food entries |
| Debug Case Study | Fixed MongoDB connection + VM permission errors | [Issue #8](https://github.com/gshew24/griff-devops-2026/issues/8) | Resolved connection string errors, index conflicts, and EACCES permission issues |
| System / Infrastructure | Deployed on GCP VM with NGINX + PM2 | [Deployment Guide](https://github.com/gshew24/griff-devops-2026#-deployment-guide) | Handles production hosting and reverse proxy |
| Monitoring / Logging | Used PM2 and server logs | [PM2 Logs Demo](https://github.com/gshew24/griff-devops-2026) | Ensures app stays running and can be debugged |
| Automation (CI/CD) | Manual GitHub deployment workflow | [Repository Commits](https://github.com/gshew24/griff-devops-2026/commits/main) | Code is pushed and pulled to VM consistently |
| Deployment Guide | Documented deployment steps | [README Deployment Section](https://github.com/gshew24/griff-devops-2026#-deployment-guide) | Steps include SSH, npm install, PM2, and NGINX config |
| API / Backend | RESTful Express API | [Routes Folder](https://github.com/gshew24/griff-devops-2026/tree/main/routes) | Handles CRUD operations for food entries |

---

## 🚀 Sprint 99

Future improvements, additional features, and known bugs for FitTrack.

### 🔧 Planned Features
- [Add advanced filtering for food entries](https://github.com/gshew24/griff-devops-2026/issues/10)
- [Add charts for macro tracking](https://github.com/gshew24/griff-devops-2026/issues/11)

### 🎨 Improvements
- [Enhance UI for mobile responsiveness](https://github.com/gshew24/griff-devops-2026/issues/12)

### 🐞 Known Bugs
- [Fix login persistence issue](https://github.com/gshew24/griff-devops-2026/issues/13)

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