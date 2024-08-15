const express = require("express");
const router = express.Router();
const smoothiesController = require("../controllers/smoothies");
const { requireAuth, isManager } = require("../middleware/authMiddleware");

// GET  - Get all smoothies  and query for ingredients / name

router.get("/smoothies", requireAuth, smoothiesController.getSmoothies);

module.exports = router;
