const express = require("express");
const router = express.Router();
const Authentication = require("../controllers/authentication");
const { requireAuth, requireSignin } = require("../middleware/authMiddleware");

// POST - route to sign in user
router.post("/auth/signin", requireSignin, Authentication.signin);
//POST - route to sign up a new user
router.post("/auth/signup", Authentication.signup);
//GET - route to get the signed in user's info
router.get("/auth/current_user", requireAuth, Authentication.currentUser);

module.exports = router;
