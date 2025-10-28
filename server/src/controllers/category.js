import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort("name");
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json(category);
};
