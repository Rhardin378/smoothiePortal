require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 9000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
