// user: {
//   name: "Ryan",
//   email: "rhardin378@gmail.com"
//   password: 6302,
//   role: "Manager",
//   store: objectId,
//   truckOrders:[]
//   }
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const { storeSchema } = require("./store");
const TruckOrderSchema = require("./truckOrder");
// const Movie = require("../models/movie");

// Define our model
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  hash: String,
  salt: String,
  // everything in the watchlist is expected to folow the movieSchema
  role: String,
  store: { type: storeSchema, required: true },
  truckOrders: [{ type: TruckOrderSchema.TruckOrderSchema }],
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.hash === hash;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel, UserSchema: UserSchema };
