// Store routes
const express = require("express");
const storeRouter = require("../routes/storeRouter");
const userRouter = require("../routes/userRouter");
const truckOrderRouter = require("../routes/truckOrderRouter");
const smoothiesRouter = require("../routes/smoothiesRouter");

module.exports = function (app) {
  app.use("/api/", storeRouter),
    app.use("/api/", userRouter),
    app.use("/api/", truckOrderRouter);
  app.use("/api/", smoothiesRouter);
};
