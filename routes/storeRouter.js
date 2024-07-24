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
router.post("/stores/:storeId/products", storeController.addProductToInventory);
// GET /stores - Get all stores (for populating a dropdown on the frontend)

router.get("/stores", storeController.getAllStores);
// GET /stores/:storeId/inventory - Get a store's inventory
router.get("/stores/:storeId/inventory", storeController.getInventory);
// PUT /stores/:storeId/inventory/:productId - Update a product in a store's inventory

router.put(
  "/stores/:storeId/inventory/:productId",
  storeController.editProduct
);

// DELETE /stores/:storeId/inventory/:productId - Remove a product from a store's inventory

router.delete(
  "/stores/:storeId/inventory/:productId",
  storeController.deleteProduct
);

module.exports = router;
