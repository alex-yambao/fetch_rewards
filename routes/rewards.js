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
    if (points < 0 || !payer) {
      res.status(400).send({
        error: "BadRequestError",
        name: "Invalid Fields",
        message:
          "Points value cannot be negative and a Payer name must be present.",
      });
      return;
    }
    const transaction = await addTransaction(payer, points);
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
        error: "BadRequestError",
        name: "Invalid Field",
        message: "Invalid field found in request body",
      });
      return;
    }
    const transaction = await spendPoints(points);
    if (transaction.incomplete === true) {
      res.status(400).send({
        error: "BadRequestError",
        name: "Insufficient Points",
        message: `You do not have enough points for this transaction. You requested to spend ${points}, but your balance was ${transaction.balance}.`,
      });
      return;
    }
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
