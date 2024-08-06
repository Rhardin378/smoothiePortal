const { Store } = require("../models/store");
const { Product } = require("../models/product");
const { ProductToOrder } = require("../models/productToOrder");

const prePopulateOrder = async (products) => {
  try {
    for (const product of products) {
      const neededCount = product.neededWeekly - product.inStock;
      if (neededCount > 0) {
        const productToOrder = new ProductToOrder({
          name: product.name,
          product: product._id,
          count: product.neededWeekly - product.inStock,
        });
        await productToOrder.save();
      }
    }
    console.log("All documents saved");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.createTruckOrder = async (req, res, next) => {
  const storeId = req.params.storeId;
  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    const productsFromInventory = await Product.find({ store: storeId });

    const populatedOrder = await prePopulateOrder(productsFromInventory);

    res.send({ message: "Order created successfully" });

    // get all products from a store's inventory
    // map over to make the productToOrder
    // using a forEach make a productTo Order and save it
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
