// GET /smoothies/ingredients - Get all smoothie ingredients
// GET /smoothies - Get all smoothies with query for ingredients / name
const express = require("express");
const router = express.Router();
const Authentication = require("../controllers/authentication");
const passport = require("passport");
const smoothiesController = require("../controllers/smoothies");

router.get("/smoothies", smoothiesController.getSmoothies);

module.exports = router;
