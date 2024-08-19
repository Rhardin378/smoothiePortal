const Smoothie = require("../models/smoothie");

exports.getSmoothies = async (req, res, next) => {
  try {
    const { name, ingredient } = req.query;

    const query = {};
    if (name) {
      const nameQuery = { $regex: new RegExp(name, "i") };
      query.name = nameQuery;
    }

    if (ingredient) {
      const ingredientQuery = { $regex: new RegExp(ingredient, "i") };
      query.ingredients = { $elemMatch: ingredientQuery };
    }
    const smoothies = await Smoothie.find(query);
    if (!smoothies || smoothies.length === 0) {
      return res.status(404).send({ message: "No Smoothies found" });
    }
    res.status(200).send(smoothies);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};
