const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./user");

const TruckOrderSchema = new Schema({
  date: Date,
  user: { type: UserSchema.UserSchema },
  purchaseOrder: [],
});

const TruckOrder = mongoose.model("TruckOrder", truckOrderSchema);

module.exports = { TruckOrder, TruckOrderSchema };

// truck order:{
//   id: "3429fa",
//   date: Date,
//   user: obj.id

//   // by doing neededWeekly - inStock = count (ordering will save the truckOrder
//   //and update the inventory
//    purchase_order: [{product, count: 3}, {product, count:4}]
//    }
