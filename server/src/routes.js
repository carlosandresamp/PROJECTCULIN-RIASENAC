const express = require('express');
const router = express.Router();
const Recipe = require('./model/recipe');
const uploadImage = require('../middlewares/uploadImage');

router.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.post('/recipes', uploadImage.single('image'), async (req, res) => {
  const { name, description, ingredients, instructions } = req.body;
  const image = req.file.path;

  const newRecipe = new Recipe({
    name,
    description,
    ingredients,
    instructions,
    image
  });

  await newRecipe.save();
  res.status(201).json(newRecipe);
});

router.get('/recipes/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

router.put('/recipes/:id', uploadImage.single('image'), async (req, res) => {
  const { name, description, ingredients, instructions } = req.body;
  const image = req.file.path;

  const updatedRecipe = {
    name,
    description,
    ingredients,
    instructions,
    image
  };

  await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe);
  res.json({ message: 'Recipe updated successfully' });
});

router.delete('/recipes/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recipe deleted successfully' });
});

module.exports = router;