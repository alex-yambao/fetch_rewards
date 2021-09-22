const express = require("express");
const rewardsRouter = express.Router();
const {
  addTransaction,
  spendPoints,
  getBalances,
} = require("../mockdb/controllers");

rewardsRouter.post("/add", async (req, res, next) => {
  try {
    const { payer, points } = req.body;
    if (points < 0) {
      throw {
        error: "BadRequest",
        name: "Negative Points",
        message: "Points value cannot be negative",
      };
    }
    const transaction = await addTransaction(payer, points);
    res.status(200).send(transaction);
  } catch (error) {
    next(error);
  }
});

rewardsRouter.patch("/spend", async (req, res, next) => {
  try {
    const { points } = req.body;
    if (!points || Object.keys(req.body).length > 1) {
      throw {
        error: "BadRequest",
        name: "Invalid Field",
        message: "Invalid field found in request body",
      };
    }
    const transaction = await spendPoints(points);
    res.status(200).send(transaction);
  } catch (error) {
    next(error);
  }
});

rewardsRouter.get("/balance", async (req, res, next) => {
  try {
    const balances = await getBalances();
    res.status(200).send(balances);
  } catch (error) {
    next(error);
  }
});

module.exports = rewardsRouter;
