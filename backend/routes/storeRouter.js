const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store");
const { requireAuth, isManager } = require("../middleware/authMiddleware");

// POST  - Create a store
router.post("/stores", requireAuth, storeController.createStore);

// POST  - Create a product and add to a store's inventory
router.post(
  "/stores/:storeId/products",
  requireAuth,
  isManager,
  storeController.addProductToInventory
);
// GET  - Get all stores (for populating a dropdown on the frontend)

router.get("/stores", requireAuth, storeController.getAllStores);
// GET  - Get a store's inventory
router.get(
  "/stores/:storeId/inventory",
  requireAuth,
  isManager,
  storeController.getInventory
);
// PUT  - Update a product in a store's inventory

router.put(
  "/stores/:storeId/inventory/:productId",
  requireAuth,
  isManager,
  storeController.editProduct
);

// DELETE  - Remove a product from a store's inventory

router.delete(
  "/stores/:storeId/inventory/:productId",
  requireAuth,
  isManager,
  storeController.deleteProduct
);

module.exports = router;
