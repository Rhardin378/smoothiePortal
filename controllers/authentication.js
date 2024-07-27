const jwt = require("jwt-simple");
const { UserModel } = require("../models/user");

const secret = process.env.TOKEN_SECRET;

const tokenForUser = (user) => {
  const timestamp = Math.round(Date.now() / 1000);
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
      exp: timestamp + 8 * 60 * 60,
    },
    secret
  );
};

exports.signin = (req, res) => {
  res.send({ email: req.user.email, token: tokenForUser(req.user) });
};

exports.currentUser = (req, res) => {
  const user = {
    email: req.user.email,
    token: tokenForUser(req.user),
    name: req.user.name,
    role: req.user.role,
    store: req.user.store,
    truckOrders: req.user.truckOrders,
  };
  res.send(user);
};

exports.signup = async (req, res, next) => {
  const { email, password, name, store } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new UserModel();
    user.email = email;
    user.setPassword(password);
    user.name = name;
    user.store = store;
    user.role = "Manager";

    await user.save();

    res.json({ token: tokenForUser(user) });
  } catch (err) {
    next(err);
  }
};
