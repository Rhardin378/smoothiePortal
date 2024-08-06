const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store");
const Authentication = require("../controllers/authentication");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
// Store routes

const isManager = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole === "Manager") {
    next();
  } else {
    res.status(403).send({ message: "Access Denied" });
  }
};

// POST /stores - Create a store
router.post("/stores", storeController.createStore, requireAuth);

// POST /stores/:storeId/products - Create a product and add to a store's inventory
router.post(
  "/stores/:storeId/products",
  // requireAuth,
  // isManager,
  storeController.addProductToInventory
);
// GET /stores - Get all stores (for populating a dropdown on the frontend)

router.get("/stores", requireAuth, storeController.getAllStores);
// GET /stores/:storeId/inventory - Get a store's inventory
router.get(
  "/stores/:storeId/inventory",
  requireAuth,
  isManager,
  storeController.getInventory
);
// PUT /stores/:storeId/inventory/:productId - Update a product in a store's inventory

router.put(
  "/stores/:storeId/inventory/:productId",
  requireAuth,
  isManager,
  storeController.editProduct
);

// DELETE /stores/:storeId/inventory/:productId - Remove a product from a store's inventory

router.delete(
  "/stores/:storeId/inventory/:productId",
  requireAuth,
  isManager,
  storeController.deleteProduct
);

module.exports = router;
