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
