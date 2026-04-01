import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

const COLLECTION = 'foods';

export async function getFoods(req, res) {
  try {
    const db = getDB();

    const records = await db
      .collection(COLLECTION)
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return res.status(200).json(records);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function createFood(req, res) {
  try {
    const db = getDB();

    const {
      foodName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      date,
    } = req.body || {};

    if (
      !foodName ||
      !mealType ||
      calories === undefined ||
      protein === undefined ||
      carbs === undefined ||
      fat === undefined ||
      !date
    ) {
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
}

export async function updateFood(req, res) {
  try {
    const db = getDB();
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

    if (
      !foodName ||
      !mealType ||
      calories === undefined ||
      protein === undefined ||
      carbs === undefined ||
      fat === undefined ||
      !date
    ) {
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
}

export async function deleteFood(req, res) {
  try {
    const db = getDB();
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
}