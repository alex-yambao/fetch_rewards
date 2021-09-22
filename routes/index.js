const express = require("express");
const apiRouter = express.Router();

const healthRouter = require("./health");
const rewardsRouter = require("./rewards");

apiRouter.use("/health", healthRouter);
apiRouter.use("/rewards", rewardsRouter);

module.exports = apiRouter;