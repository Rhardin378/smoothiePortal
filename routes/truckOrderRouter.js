const express = require("express");
const router = express.Router();
const truckOrderController = require("../controllers/truckOrder");
const { requireAuth, isManager } = require("../middleware/authMiddleware");

// POST  - Create a truck order
router.post(
  "/stores/:storeId/truckOrders",
  requireAuth,
  isManager,
  truckOrderController.createTruckOrder
);

// POST  - Create a productToOrder and add to a truck order (if you want to add a new item not in inventory)
router.post(
  "/stores/:storeId/truckOrders/:truckOrderId/productsToOrder",
  requireAuth,
  isManager,
  truckOrderController.addProductToOrder
);

// GET  - Get all truck orders
//query by date
router.get(
  "/users/:userId/truckOrders",
  requireAuth,
  isManager,
  truckOrderController.getTruckOrdersByUser
);

// GET  - Get a single truck order
router.get(
  "/users/:userId/truckOrders/:truckOrderId",
  requireAuth,
  isManager,
  truckOrderController.getSingleTruckOrder
);

// PUT  - Update a truck order date
router.put(
  "/users/:userId/truckOrders/:truckOrderId",
  requireAuth,
  isManager,
  truckOrderController.updateTruckOrder
);
// PUT - Update a productToOrder in a truck order
router.put(
  "/users/:userId/truckOrders/:truckOrderId/productsToOrder/:productId",
  requireAuth,
  isManager,
  truckOrderController.updateProductToOrder
);

// DELETE - Delete a productToOrder from a truck order

router.delete(
  "/users/:userId/truckOrders/:truckOrderId/productsToOrder/:productId",
  requireAuth,
  isManager,
  truckOrderController.deleteProductToorder
);

// DELETE  - Delete a truck order
router.delete(
  "/users/:userId/truckOrders/:trouckOrderId/",
  requireAuth,
  isManager,
  truckOrderController.deleteTruckOrder
);

module.exports = router;
