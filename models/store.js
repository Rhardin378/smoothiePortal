const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product = require("./product");

const storeSchema = new Schema({
  storeNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  truckOrderDay: { type: String, required: true },
  inventory: [{ type: product.productSchema }],
});
const Store = mongoose.model("store", storeSchema);

module.exports = { Store, storeSchema };

// store: {
//   storeNumber: 1937,
//   address: "213 ex lane",
//   truckOrderDay: "Wednesday"
//   inventory: [product, product]
//   }
