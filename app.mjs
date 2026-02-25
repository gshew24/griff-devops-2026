import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public'), { index: false }));
app.use(express.json());

const serverVar = 'server variable example';

// Mongo setup
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI is missing. Check your .env file.');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
const DB_NAME = 'cis486';
const COLLECTION = 'attendance';

async function connectToMongo() {
  await client.connect();
  await client.db('admin').command({ ping: 1 });
  db = client.db(DB_NAME);
  console.log('Connected to MongoDB');
}

await connectToMongo();

// Pages
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'attend.html'));
});

app.get('/inject', async (req, res) => {
  try {
    const html = await readFile(join(__dirname, 'public', 'index.html'), 'utf8');
    res.send(html.replace('{{serverVar}}', serverVar));
  } catch (err) {
    res.status(500).send('Error loading page');
  }
});

// API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api/class',
      'GET /api/attendance',
      'POST /api/attendance',
      'PUT /api/attendance/:id',
      'DELETE /api/attendance/:id',
    ],
  });
});

app.get('/api/class', (req, res) => {
  res.json({
    courseNumber: 'CIS 486',
    courseName: 'Projects in IS',
    nickname: 'Full Stack DevOps',
    semester: 'Spring 2026',
    calendar: 'Class calendar coming soon!',
  });
});

// CREATE
app.post('/api/attendance', async (req, res) => {
  try {
    const { studentName, date, keyword } = req.body || {};
    if (!studentName || !date || !keyword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const record = {
      studentName,
      date,
      keyword,
      timestamp: new Date(),
    };

    const result = await db.collection(COLLECTION).insertOne(record);
    return res.json({ message: 'Attendance recorded!', id: result.insertedId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ
app.get('/api/attendance', async (req, res) => {
  try {
    const records = await db
      .collection(COLLECTION)
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return res.json(records);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, date, keyword } = req.body || {};
    if (!studentName || !date || !keyword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          studentName,
          date,
          keyword,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    return res.json({ message: 'Attendance updated!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.collection(COLLECTION).deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    return res.json({ message: 'Attendance deleted!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});