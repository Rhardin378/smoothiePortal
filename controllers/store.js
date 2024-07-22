const Store = require("../models/store");
const Product = require("../models/product");

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
    res.end();
  } catch (err) {
    console.error(err);
  }
};

exports.getAllStores = async (req, res, next) => {
  try {
    const stores = await Store.Store.find();
    res.send(stores);
  } catch (err) {
    console.error(err);
  }
};

exports.addProductToInventory = async (req, res, next) => {
  const storeId = req.params.storeId;
  try {
    const store = await Store.Store.findById(storeId);
    if (store) {
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

        store.save();
        res.send(product);
      }
    }
    console.log(store);
  } catch (err) {
    console.error(err);
  }
};
