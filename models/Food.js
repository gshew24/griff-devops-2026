import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
      trim: true,
    },
    mealType: {
      type: String,
      required: true,
      trim: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    protein: {
      type: Number,
      required: true,
      min: 0,
    },
    carbs: {
      type: Number,
      required: true,
      min: 0,
    },
    fat: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model('Food', foodSchema);

export default Food;