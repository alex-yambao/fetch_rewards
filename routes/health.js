const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/", async (req, res, next) => {
  try {
    res.send({
      Name: "Health Status",
      message: "Server is up and receiving requests",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = healthRouter;
