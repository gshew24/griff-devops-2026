# FitTrack Developer Notebook

## Project
FitTrack is a full-stack nutrition tracking app for CIS 486. The app allows users to register, log in, and manage food entries with calories and macros.

---

## Work Log

### April 2, 2026 — Proposal and Planning
- Created the initial FitTrack project proposal.
- Defined the app idea, target users, core features, tech stack, and selected capability boxes.
- Set up GitHub Issues and Milestones to track project work.

Evidence:
- README proposal
- GitHub Issues
- Milestones 2 and 3

Decision:
I chose a nutrition tracker because it is simple enough to complete for the class but still allows full-stack features like CRUD, authentication, database storage, and deployment.

---

### April 16, 2026 — Backend Refactor
- Refactored the backend into a more organized Node.js structure.
- Added folders for routes, controllers, models, middleware, and config.
- Moved food route logic into a controller.

Evidence:
- Issue #3: Refactor backend into controllers and routes
- `routes/foodsRoutes.js`
- `controllers/foodsController.js`

Decision:
I moved logic out of `app.mjs` because a cleaner structure makes the app easier to maintain and explain.

---

### April 21, 2026 — Database and Mongoose Upgrade
- Added Mongoose to the project.
- Created a `Food` model with a schema.
- Updated the database connection to use `mongoose.connect()`.
- Updated food controller methods to use Mongoose methods.

Evidence:
- Issue #9: Upgrade database layer to Mongoose
- `models/Food.js`
- `config/db.js`
- `controllers/foodsController.js`

Decision:
I chose Mongoose because it provides schemas and better structure for MongoDB data.

---

### April 21, 2026 — Authentication
- Added register and login functionality.
- Created a `User` model.
- Added JWT token generation.
- Added authentication middleware.
- Protected the food routes so users must be logged in.

Evidence:
- Issue #4: Implement user authentication
- `models/User.js`
- `controllers/authController.js`
- `routes/authRoutes.js`
- `middleware/authMiddleware.js`

Decision:
I chose JWT authentication because it is common in full-stack apps and works well with API-based routes.

---

### April 22, 2026 — UI/UX Improvements
- Improved the frontend layout using Bootstrap and custom CSS.
- Added cards, better spacing, summary boxes, and a cleaner visual design.
- Improved form layout and user feedback messages.

Evidence:
- Issue #6: Improve UI with Bootstrap and validation
- `public/attend.html`

Decision:
I wanted the app to look more like a real product instead of a basic class assignment page.

---

### April 22, 2026 — Search Feature
- Added client-side search/filtering for food entries.
- Search can filter by food name, meal type, or date.
- This helps users find entries faster as the list grows.

Evidence:
- Issue #5: Add search functionality for food entries
- `public/attend.html`

Decision:
I chose client-side search because it was simple, fast, and worked well for the current size of the app.

---

### April 27, 2026 — Deployment
- Pulled latest code onto the GCP VM.
- Installed dependencies.
- Used PM2 to run the app persistently.
- Confirmed the app loads at `https://fitness.barrycumbie.com`.

Evidence:
- Issue #7: Write deployment guide and DevOps documentation
- Live app: `https://fitness.barrycumbie.com`
- PM2 logs
- GitHub commits

Decision:
I used PM2 because it keeps the Node app running after the terminal closes and helps with server logs.

---

## Deep Problem-Solving Entry 1: MongoDB Connection Problems

### What broke
The app had trouble connecting to MongoDB. I saw connection errors related to the MongoDB URI, DNS/SRV lookup, and environment variables.

### Why it broke
The connection string was not formatted correctly at first, and the VM/local environment needed the correct `.env` setup.

### How I fixed it
I updated the MongoDB connection string, verified the correct database user and password, and confirmed the app could connect using Mongoose.

Evidence:
- Issue #9
- `config/db.js`
- MongoDB Atlas connection
- PM2 logs showing successful database connection

Takeaway:
Environment variables and connection strings are small details, but if they are wrong, the whole backend can fail.

---

## Deep Problem-Solving Entry 2: MongoDB Duplicate Email Index

### What broke
New user registration failed with a 500 Internal Server Error.

### Why it broke
MongoDB had an old unique index on the `email` field. My app does not use email, so every new user had `email: null`, which caused a duplicate key error.

Error:
`E11000 duplicate key error collection: test.users index: email_1 dup key: { email: null }`

### How I fixed it
I inspected the indexes on the `users` collection, found the old `email_1` index, and removed it. After that, new user registration worked.

Evidence:
- Issue #8
- MongoDB users collection/indexes
- Successful register response:
`{"message":"User registered successfully"}`

Takeaway:
Database structure can affect new code even when the bug is not directly in the JavaScript files.

---

## Deep Problem-Solving Entry 3: VM Permission Error

### What broke
While running `npm install` on the VM, I received an `EACCES` permission error.

### Why it broke
Some project files or folders were owned by the wrong user.

### How I fixed it
I changed ownership of the project folder using:

```bash
sudo chown -R $USER:$USER ~/griff-devops-2026