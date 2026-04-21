import dotenv from 'dotenv';
dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

import { connectDB } from './config/db.js';
import foodsRoutes from './routes/foodsRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public'), { index: false }));
app.use(express.json());

await connectDB();

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'attend.html'));
});

app.get('/inject', async (req, res) => {
  try {
    const html = await readFile(join(__dirname, 'public', 'index.html'), 'utf8');
    res.send(html);
  } catch (err) {
    res.status(500).send('Error loading page');
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'FitTrack',
    author: 'Griffin Shewbart',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/class',
      'GET /api/foods',
      'POST /api/foods',
      'PUT /api/foods/:id',
      'DELETE /api/foods/:id',
    ],
  });
});

app.get('/api/class', (req, res) => {
  res.json({
    appName: 'FitTrack',
    purpose: 'A simple nutrition and macro tracking app inspired by MyFitnessPal',
    author: 'Griffin Shewbart',
    stack: 'Node.js, Express.js, MongoDB Atlas, Mongoose, Bootstrap, jQuery, JWT, GCP',
    semester: 'Spring 2026',
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/foods', foodsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`FitTrack server is running on http://localhost:${PORT}`);
});