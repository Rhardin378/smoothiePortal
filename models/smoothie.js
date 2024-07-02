const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const smoothieSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  ingredients: [],
});
const Smoothie = mongoose.model("smoothie", smoothieSchema);

module.exports = Smoothie;
