// Store routes

// POST /stores - Create a store
// POST /stores/:storeId/products - Create a product and add to a store's inventory
// GET /stores - Get all stores (for populating a dropdown on the frontend)
// GET /stores/:storeId/inventory - Get a store's inventory
// PUT /stores/:storeId/inventory/:productId - Update a product in a store's inventory
// DELETE /stores/:storeId/inventory/:productId - Remove a product from a store's inventory

// Truck order routes

// POST /truckOrders - Create a truck order
// POST /truckOrders/:truckOrderId/productsToOrder - Create a productToOrder and add to a truck order
// GET /truckOrders - Get all truck orders
// GET /truckOrders/:truckOrderId - Get a single truck order
// PUT /truckOrders/:truckOrderId - Update a truck order
// PUT /truckOrders/:truckOrderId/productsToOrder/:productToOrderId - Update a productToOrder in a truck order
// DELETE /truckOrders/:truckOrderId/productsToOrder/:productToOrderId - Delete a productToOrder from a truck order
// DELETE /truckOrders/:truckOrderId - Delete a truck order

// User routes

// POST /users/signup - Sign a user up
// POST /users/signin - Sign a user in
// POST /users/:userId/truckOrders - Add a truck order to a user
// GET /users/:userId - Get a user's info

// Smoothie routes

// GET /smoothies/ingredients - Get all smoothie ingredients
// GET /smoothies - Get all smoothies with query for ingredients / name
