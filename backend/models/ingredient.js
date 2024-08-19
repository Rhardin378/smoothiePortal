const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
});

const Ingredient = mongoose.model("ingredient", ingredientSchema);

module.exports = Ingredient;
