const { Store } = require("../models/store");
const { Product } = require("../models/product");
const { ProductToOrder } = require("../models/productToOrder");
const { TruckOrder } = require("../models/truckOrder");
const { UserModel } = require("../models/user");

// Function to pre-populate the truck order with products that need to be ordered
/**
 * Pre-populates a truck order with products that need to be ordered.
 *
 * @param {Array} products - An array of product objects. Each product object should have the properties:
 *                           - name: {string} The name of the product.
 *                           - _id: {string} The unique identifier of the product.
 *                           - neededWeekly: {number} The number of units needed weekly.
 *                           - inStock: {number} The number of units currently in stock.
 * @param {Object} truckOrder - The truck order object to be populated. It should have a property:
 *                              - purchaseOrder: {Array} An array to store the IDs of the products to be ordered.
 * @returns {Promise<Array>} - A promise that resolves to an array of populated product objects.
 * @throws {Error} - Throws an error if there is an issue saving the product to order.
 */
const prePopulateOrder = async (products, truckOrder) => {
  try {
    let populatedProducts = [];
    for (const product of products) {
      const neededCount = product.neededWeekly - product.inStock;

      if (neededCount > 0) {
        const productToOrder = new ProductToOrder({
          name: product.name,
          product: product._id,
          count: Math.ceil(neededCount),
        });
        await productToOrder.save();
        truckOrder.purchaseOrder.push(productToOrder._id);
        populatedProducts.push(productToOrder);
      }
    }
    console.log("All documents saved");
    return populatedProducts;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Controller function to create a truck order
exports.createTruckOrder = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const userId = req.user._id;

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    const productsFromInventory = await Product.find({ store: storeId });

    const truckOrder = new TruckOrder({
      date: Date.now(),
      user: userId,
      purchaseOrder: [],
    });

    const populatedOrder = await prePopulateOrder(
      productsFromInventory,
      truckOrder
    );

    await truckOrder.save();

    const user = await UserModel.findById(userId);
    user.truckOrders.push(truckOrder);
    await user.save();

    res.send({ truckOrder: truckOrder, message: "Order created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
//controller function to add a productToOrder to a truch order
exports.addProductToOrder = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const truckOrderId = req.params.truckOrderId;
    let alert;

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    const truckOrder = await TruckOrder.findById(truckOrderId);

    if (!truckOrder) {
      return res.status(404).send({ message: "Truck order not found" });
    }

    const product = new ProductToOrder({
      name: req.body.name,
      count: req.body.count,
      product: req.body.product,
    });

    await product.save();
    truckOrder.purchaseOrder.unshift(product._id);
    await truckOrder.save();
    res.status(201).send({
      message: "product added to truck order",
      productToOrder: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//controller fucktion to get all truck orders that a user has
exports.getTruckOrdersByUser = async (req, res, next) => {
  try {
    const query = { user: req.params.userId };
    const { pageNumber } = req.query;

    // Default values for pagination
    const truckOrdersPerPage = 10;
    const page = parseInt(pageNumber, 10) || 1;
    const skip = (page - 1) * truckOrdersPerPage;

    const truckOrders = await TruckOrder.find(query)
      .populate({
        path: "purchaseOrder",
        populate: {
          path: "product",
          model: "product", // Ensure this matches the model name for your products
        },
      })
      .populate("user")
      .sort({ date: -1 })
      .skip(skip)
      .limit(truckOrdersPerPage);

    const count = await TruckOrder.countDocuments(query);

    if (!truckOrders) {
      res.status(404).send({ message: "No truck orders found" });
      res.end();
    }

    res.status(200).send({ truckOrders, count: count, page: page });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// controller to get a truck order by it's id

exports.getSingleTruckOrder = async (req, res, next) => {
  try {
    const truckOrderId = req.params.truckOrderId;

    const truckOrder = await TruckOrder.findById(truckOrderId).populate({
      path: "purchaseOrder",
      populate: {
        path: "product",
        model: "product", // Ensure this matches the model name for your products
      },
    });

    if (!truckOrder) {
      res.status(404).send({ message: "No truck order with that Id found." });
    }
    // Sort the purchaseOrder array based on product.category
    // MongoDb does not support nested sorting

    truckOrder.purchaseOrder.sort((a, b) => {
      if (a.product?.category < b.product?.category) return -1;
      if (a.product?.category > b.product?.category) return 1;
      return 0;
    });

    res.status(200).send(truckOrder);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//controller to update a truck order by its id
exports.updateTruckOrder = async (req, res, next) => {
  try {
    const truckOrderId = req.params.truckOrderId;

    const truckOrder = await TruckOrder.findByIdAndUpdate(
      truckOrderId,
      {
        $set: { date: req.body.date },
      },
      { new: true }
    );
    res.status(200).send(truckOrder);

    if (!truckOrder) {
      res.status(404).send({ message: "No truck order with that Id found." });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//controller to update a product to order by its id
exports.updateProductToOrder = async (req, res, next) => {
  try {
    const productToOrderId = req.params.productId;
    const { count } = req.body;
    const productToOrder = await ProductToOrder.findByIdAndUpdate(
      productToOrderId,
      { count },
      { new: true }
    );

    res.status(200).send(productToOrder);

    if (!productToOrder) {
      res.status(404).send({ message: "No product with that id found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//controller to delete a productToOrder by it's Id

exports.deleteProductToorder = async (req, res, next) => {
  try {
    const productToOrderId = req.params.productId;

    const productToOrder = await ProductToOrder.findByIdAndDelete(
      productToOrderId
    );
    if (!productToOrder) {
      res.status(404).send({ message: "No product with that Id found" });
    }

    // Update TruckOrder documents to remove the reference
    await TruckOrder.updateMany(
      { purchaseOrder: productToOrderId },
      { $pull: { purchaseOrder: productToOrderId } }
    );

    return res.status(200).send({
      message: "product has been deleted from order and reference removed",
      productToOrderId: productToOrderId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//controller to delete a truckOrder by its id
exports.deleteTruckOrder = async (req, res, next) => {
  try {
    const truckOrderId = req.params.truckOrderId;

    const truckOrder = await TruckOrder.findByIdAndDelete(truckOrderId);

    if (!truckOrder) {
      return res
        .status(404)
        .send({ message: "No truck order with that Id found" });
    }
    return res.status(200).send("Truck Order has been deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
