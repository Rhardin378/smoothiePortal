const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Store = require("./store");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  neededWeekly: { type: Number, required: true },
  inStock: { type: Number, required: true },
  units: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema: productSchema };

// product: {
//   id: "3429fa",
//   name: "mango",
//   category: "frozen",
//   neededWeekly: 7,
//   inStock: 3,
//   units: cases
//   lastUpdated: "Date"
//   store: obj.id
//   }
