// POST /users/:userId/truckOrders - Add a truck order to a user
// GET /users/:userId - Get a user's info
const express = require("express");
const router = express.Router();
const Authentication = require("../controllers/authentication");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

router.post("/auth/signin", requireSignin, Authentication.signin);
router.post("/auth/signup", Authentication.signup);
router.get("/auth/current_user", requireAuth, Authentication.currentUser);

module.exports = router;
