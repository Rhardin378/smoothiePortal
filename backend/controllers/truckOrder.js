const { Store } = require("../models/store");
const { Product } = require("../models/product");
const { ProductToOrder } = require("../models/productToOrder");
const { TruckOrder } = require("../models/truckOrder");
const { UserModel } = require("../models/user");

// Function to pre-populate the truck order with products that need to be ordered
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

    if (!req.body.product) {
      alert = "Product being added to order may not currently be in inventory";
    }

    const product = new ProductToOrder({
      name: req.body.name,
      count: req.body.count,
    });

    await product.save();
    truckOrder.purchaseOrder.push(product._id);
    await truckOrder.save();
    res
      .status(201)
      .send({ message: "product added to truck order", alert: alert });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//controller fucktion to get all truck orders that a user has
exports.getTruckOrdersByUser = async (req, res, next) => {
  try {
    let date;

    if (req.query.date) {
      date = new Date(req.query.date);
    }
    const query = { user: req.params.userId };

    if (date !== undefined) {
      query.date = {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000), // Adds one day to the date) },
      };
    }
    const truckOrders = await TruckOrder.find(query)
      .populate({
        path: "purchaseOrder",
        populate: {
          path: "product",
          model: "product", // Ensure this matches the model name for your products
        },
      })
      .populate("user"); // Assuming user is a direct reference in TruckOrder
    // Assuming user is a direct reference in TruckOrder

    // FIX THIS POPULATE

    const count = await TruckOrder.countDocuments(query);

    if (!truckOrders) {
      res.status(404).send({ message: "No truck orders found" });
      res.end();
    }

    res.status(200).send({ truckOrders, count: count });
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

    const productToOrder = await ProductToOrder.findByIdAndUpdate(
      productToOrderId,
      req.body,
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
