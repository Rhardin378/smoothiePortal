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
    throw err;
  }
};

// Controller function to create a truck order
exports.createTruckOrder = async (req, res, next) => {
  const storeId = req.params.storeId;
  const userId = req.user._id;
  try {
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

    res.send({ message: "Order created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
//controller function to add a productToOrder to a truch order
exports.addProductToOrder = async (req, res, next) => {
  const storeId = req.params.storeId;
  const truckOrderId = req.params.truckOrderId;
  let alert;

  try {
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

exports.getTruckOrdersByUser = async (req, res, next) => {
  let date;
  try {
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
    const truck_orders = await TruckOrder.find(query).populate({
      path: "purchaseOrder",
      populate: {
        path: "product",
        model: "product",
      },
    });

    if (!truck_orders) {
      res.status(404).send({ message: "No truck orders found" });
      res.end();
    }

    res.status(200).send(truck_orders);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getSingleTruckOrder = async (req, res, next) => {
  const truckOrderId = req.params.truckOrderId;
  try {
    const truckOrder = await TruckOrder.findById(truckOrderId);

    if (!truckOrder) {
      res.status(404).send({ message: "No truck order with that Id found." });
    }

    res.status(200).send(truckOrder);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateTruckOrder = async (req, res, next) => {
  const truckOrderId = req.params.truckOrderId;
  try {
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

exports.updateProductToOrder = async (req, res, next) => {
  const productToOrderId = req.params.productId;
  try {
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
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteProductToorder = async (req, res, next) => {
  const productToOrderId = req.params.productId;
  try {
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
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteTruckOrder = async (req, res, next) => {
  const truckOrderId = req.params.truckOrderId;

  try {
    const truckOrder = await TruckOrder.findByIdAndDelete(truckOrderId);

    if (!truckOrder) {
      return res
        .status(404)
        .send({ message: "No truck order with that Id found" });
    }
    return res.status(200).send("Truck Order has been deleted");
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
