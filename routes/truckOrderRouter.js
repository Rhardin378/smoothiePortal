const express = require("express");
const router = express.Router();
const truckOrderController = require("../controllers/truckOrder");
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

// POST /truckOrders - Create a truck order
router.post(
  "/stores/:storeId/truckOrders",
  // requireAuth,
  truckOrderController.createTruckOrder
);

// POST /truckOrders/:truckOrderId/productsToOrder - Create a productToOrder and add to a truck order (if you want to add a new item not in inventory)
router.post(
  "/stores/:storeId/truckOrders/:truckOrderId/productsToOrder",
  truckOrderController.addProductToOrder
);

// GET /truckOrders - Get all truck orders
//query by date
router.get(
  "/users/:userId/truckOrders",
  truckOrderController.getTruckOrdersByUser
);

// GET /truckOrders/:truckOrderId - Get a single truck order

// PUT /truckOrders/:truckOrderId - Update a truck order (name )

// PUT /truckOrders/:truckOrderId/productsToOrder/:productToOrderId - Update a productToOrder in a truck order

// DELETE /truckOrders/:truckOrderId/productsToOrder/:productToOrderId - Delete a productToOrder from a truck order

// DELETE /truckOrders/:truckOrderId - Delete a truck order

module.exports = router;
