require("dotenv").config();
const express = require("express");
const router = require("./routes/router");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("./services/passport");

app.use(cors());
const PORT = process.env.PORT || 9000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
router(app);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🚀 DB Connected!");
    app.listen(PORT, () => {
      console.log("😎 Server listening on:", PORT);
    });
  })
  .catch((err) => {
    console.log(`❌ DB Connection Error: ${err.message}`);
  });
