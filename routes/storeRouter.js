const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store");

// Store routes

// const Authentication = require('./controllers/authentication');
// const WatchList = require('./controllers/watchList');
// const passport = require('passport');

// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireSignin = passport.authenticate('local', { session: false });

// POST /stores - Create a store
router.post("/stores", storeController.createStore);

// POST /stores/:storeId/products - Create a product and add to a store's inventory
// GET /stores - Get all stores (for populating a dropdown on the frontend)
// GET /stores/:storeId/inventory - Get a store's inventory
// PUT /stores/:storeId/inventory/:productId - Update a product in a store's inventory
// DELETE /stores/:storeId/inventory/:productId - Remove a product from a store's inventory

module.exports = router;
