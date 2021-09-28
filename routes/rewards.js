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
      res.status(400).send({
        error: "BadRequest",
        name: "Negative Points",
        message: "Points value cannot be negative",
      });
      return;
    }
    const transaction = await addTransaction(payer, points);
    if (!transaction) {
      res.status(400).send({
        error: "BadRequest",
        name: "Insufficient Points",
        message: "You do not have enough points to complete this transaction. ",
      });
      return;
    }
    res.status(201).send(transaction);
  } catch (error) {
    next(error);
  }
});

rewardsRouter.patch("/spend", async (req, res, next) => {
  try {
    const { points } = req.body;
    if (!points || Object.keys(req.body).length > 1) {
      res.status(400).send({
        error: "BadRequest",
        name: "Invalid Field",
        message: "Invalid field found in request body",
      });
      return;
    }
    const transaction = await spendPoints(points);
    res.status(201).send(transaction);
  } catch (error) {
    next(error);
  }
});

rewardsRouter.get("/balance", async (req, res, next) => {
  try {
    const balances = await getBalances();
    res.status(201).send(balances);
  } catch (error) {
    next(error);
  }
});

module.exports = rewardsRouter;
