import Food from '../models/Food.js';

export async function getFoods(req, res) {
  try {
    const records = await Food.find({}).sort({ createdAt: -1 });
    return res.status(200).json(records);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function createFood(req, res) {
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

    const newFood = new Food({
      foodName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      date,
    });

    await newFood.save();

    return res.status(201).json({
      message: 'Food entry created!',
      id: newFood._id,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function updateFood(req, res) {
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

    const updated = await Food.findByIdAndUpdate(
      id,
      {
        foodName,
        mealType,
        calories,
        protein,
        carbs,
        fat,
        date,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Record not found' });
    }

    return res.status(200).json({ message: 'Food entry updated!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function deleteFood(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Food.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Record not found' });
    }

    return res.status(200).json({ message: 'Food entry deleted!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}