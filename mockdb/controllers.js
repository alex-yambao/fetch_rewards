const Transaction = require("./models");
const { dateTimeSort, totalPoints, transactPoints } = require("./utils");

let mockDB = [
  { payer: "DANNON", points: 1000, timestamp: "2020-11-02T14:00:00Z" },
  { payer: "UNILEVER", points: 200, timestamp: "2020-10-31T11:00:00Z" },
  { payer: "MILLER COORS", points: 10000, timestamp: "2020-11-01T14:00:00Z" },
  { payer: "DANNON", points: 300, timestamp: "2020-10-31T10:00:00Z" },
];

async function addTransaction(payer, points) {
  const transaction = new Transaction(payer, points); //<-- constructs payer transaction
  mockDB.push(transaction.getTransaction());
  return transaction;
}

async function spendPoints(spendBalance) {
  const totals = totalPoints(mockDB); //<--- totalPoints located in utils.js
  const sortedArr = dateTimeSort(mockDB); //<---dateTimeSort located in utils.js
  if (totals < spendBalance) {
    return null;
  }
  const transactionList = transactPoints(sortedArr, spendBalance); //<--- transactPoints located in utils.js
  return transactionList;
}

async function getBalances() {
  return mockDB;
}

module.exports = { addTransaction, spendPoints, getBalances };
