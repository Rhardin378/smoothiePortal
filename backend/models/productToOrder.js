const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product = require("./product");

const productToOrderSchema = new Schema({
  name: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "product" },
  count: { type: Number, required: true },
  lastUpdated: Date,
});

const ProductToOrder = mongoose.model("ProductToOrder", productToOrderSchema);
module.exports = { ProductToOrder, productToOrderSchema };
