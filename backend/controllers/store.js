const { Store } = require("../models/store");
const { Product } = require("../models/product");

exports.createStore = async (req, res, next) => {
  try {
    const { storeNumber, address, truckOrderDay, inventory } = req.body;
    const store = new Store({
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
    const stores = await Store.find();
    res.status(200).send(stores);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.addProductToInventory = async (req, res, next) => {
  const storeId = req.params.storeId;
  try {
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    const { name, category, neededWeekly, inStock, units } = req.body;
    {
      const product = new Product({
        name,
        category,
        neededWeekly,
        inStock,
        units,
        lastUpdated: new Date(),
        store: store._id,
      });
      await product.save();

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
    const { category, productName, pageNumber } = req.query;
    const store = await Store.findById(storeId);

    const query = { store: storeId };

    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    if (category) {
      query.category = category;
    }
    if (productName) {
      query.name = { $regex: new RegExp(productName, "i") };
    }

    // Default values for pagination
    const productsPerPage = 10;
    const page = parseInt(pageNumber, 10) || 1;
    const skip = (page - 1) * productsPerPage;

    const inventory = await Product.find(query)
      .sort({ category: 1 }) // Sort by category name in alphabetical order
      .sort({ name: 1 }) // Sort by  name in alphabetical order

      .skip(skip)
      .limit(productsPerPage);
    const totalCount = await Product.countDocuments(query);
    console.log(category);
    console.log(productName);
    console.log(totalCount);
    res
      .status(200)
      .send({ inventory: inventory, count: totalCount, page: page });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const productId = req.params.productId;

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }

    const product = await Product.findById(productId);

    if (!productId || !product) {
      return res.status(404).send({ message: "product not found" });
    }

    res.status(200).send({
      inventory: product,
    });
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
    updatedData.lastUpdated = new Date();

    console.log(`storeId: ${storeId}, productId: ${productId}`);
    console.log("updatedData:", updatedData);

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }
    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedData },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    await store.save();

    res.status(200).send({ message: "Product updated successfully", product });
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

    const store = await Store.findById(storeId);

    //remove from array and delete

    if (store) {
      await Product.deleteOne({ _id: productId });
    } else {
      res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Product deleted sucessfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
