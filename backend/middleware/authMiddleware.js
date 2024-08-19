const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
// Store routes

const isManager = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole === "Manager") {
    next();
  } else {
    res.status(403).send({ message: "Access Denied" });
  }
};

const requireSignin = passport.authenticate("local", { session: false });

module.exports = { requireAuth, isManager, requireSignin };
