const Store = require("../models/store");

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
