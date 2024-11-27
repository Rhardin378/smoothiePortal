// Store routes
const express = require("express");
const storeRouter = require("./storeRouter");
const userRouter = require("./userRouter");
const truckOrderRouter = require("./truckOrderRouter");

module.exports = function (app) {
  app.use("/api/", storeRouter),
    app.use("/api/", userRouter),
    app.use("/api/", truckOrderRouter);
};
