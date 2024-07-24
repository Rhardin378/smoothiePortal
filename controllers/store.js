const Store = require("../models/store");
const Product = require("../models/product");

//still need route to get all products from inventory and map into productsToOrder documents

exports.createStore = async (req, res, next) => {
  try {
    const { storeNumber, address, truckOrderDay, inventory } = req.body;
    const store = new Store.Store({
      storeNumber,
      address,
      truckOrderDay,
      inventory,
    });

    await store.save();
    res.send(store);
    console.log(store);
  } catch (err) {
    console.error(err);
  }
};

exports.getAllStores = async (req, res, next) => {
  try {
    const stores = await Store.Store.find();
    res.status(200).send(stores);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.addProductToInventory = async (req, res, next) => {
  const storeId = req.params.storeId;
  try {
    const store = await Store.Store.findById(storeId);

    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    const { name, category, neededWeekly, inStock, units } = req.body;
    {
      const product = new Product.Product({
        name,
        category,
        neededWeekly,
        inStock,
        units,
        lastUpdated: new Date(),
        store,
      });
      await product.save();

      store.inventory.push(product);

      await store.save();
      res.status(201).send(product);
    }
    console.log(store);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getInventory = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const store = await Store.Store.findById(storeId);

    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    res.status(200).send({ inventory: store.inventory });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    console.log("put request");
    const storeId = req.params.storeId;
    const productId = req.params.productId;
    const updatedData = req.body;
    console.log(`storeId: ${storeId}, productId: ${productId}`);
    console.log("updatedData:", updatedData);
    const store = await Store.Store.findById(storeId);

    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    let product = await store.inventory.id(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    Object.assign(product, updatedData);

    product.lastUpdated = new Date();

    await store.save();

    res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  // find store

  try {
    const storeId = req.params.storeId;
    const productId = req.params.productId;

    const store = await Store.Store.findById(storeId);

    //remove from array and delete

    if (store) {
      store.inventory = store.inventory.filter(
        (product) => product._id.toString() !== productId
      );
    } else {
      res.status(404).json({ message: "Store not found" });
    }
    await Product.Product.deleteOne({ _id: productId });
    await store.save();

    res.status(200).json({ message: "Product deleted sucessfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }

  // find product within the invenotry
};
