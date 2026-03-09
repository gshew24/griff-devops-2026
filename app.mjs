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
const COLLECTION = 'foods';

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
    res.send(html);
  } catch (err) {
    res.status(500).send('Error loading page');
  }
});

// API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'FitTrack',
    author: 'Griffin Shewbart',
    timestamp: new Date().toISOString(),
    endpoints: [
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
    stack: 'Node.js, Express.js, MongoDB, Bootstrap, jQuery, Render, GCP',
    semester: 'Spring 2026',
  });
});

// CREATE
app.post('/api/foods', async (req, res) => {
  try {
    const {
      foodName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      date,
    } = req.body || {};

    if (!foodName || !mealType || calories === undefined || protein === undefined || carbs === undefined || fat === undefined || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const record = {
      foodName: String(foodName).trim(),
      mealType: String(mealType).trim(),
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      date: String(date).trim(),
      timestamp: new Date(),
    };

    const result = await db.collection(COLLECTION).insertOne(record);
    return res.status(201).json({
      message: 'Food entry created!',
      id: result.insertedId,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ
app.get('/api/foods', async (req, res) => {
  try {
    const records = await db
      .collection(COLLECTION)
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return res.status(200).json(records);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      foodName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      date,
    } = req.body || {};

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid record id' });
    }

    if (!foodName || !mealType || calories === undefined || protein === undefined || carbs === undefined || fat === undefined || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          foodName: String(foodName).trim(),
          mealType: String(mealType).trim(),
          calories: Number(calories),
          protein: Number(protein),
          carbs: Number(carbs),
          fat: Number(fat),
          date: String(date).trim(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    return res.status(200).json({ message: 'Food entry updated!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid record id' });
    }

    const result = await db.collection(COLLECTION).deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    return res.status(200).json({ message: 'Food entry deleted!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('FitTrack server is running on http://localhost:3000');
});