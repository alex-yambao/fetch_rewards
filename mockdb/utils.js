const _ = require("lodash");

const dateTimeSort = (arr) => {
  const sorted = _.orderBy(arr, ["timestamp"], ["asc"]);
  return sorted;
};

const totalPoints = (db) => {
  return db
    .map((transaction) => {
      return transaction.points;
    })
    .reduce((pointsA, pointsB) => {
      return pointsA + pointsB;
    });
};

const transactPoints = (sortedArr, spendBalance) => {
  let pointsSpent = 0;
  let differential = spendBalance - pointsSpent;
  const transactionList = [];
  while (pointsSpent < spendBalance) {
    for (const entry of sortedArr) {
      differential = spendBalance - pointsSpent;
      if (entry.points <= 0) {
        continue;
      }

      if (entry.points >= differential) {
        const difference = entry.points - differential;
        pointsSpent = pointsSpent + differential;
        entry.points = difference ? difference : 0;
        transactionList.push({
          payer: entry.payer,
          points: Number("-" + differential),
        });
        break;
      }

      if (entry.points < differential) {
        let spent = entry.points;
        pointsSpent = pointsSpent + entry.points;
        entry.points = 0;
        transactionList.push({
          payer: entry.payer,
          points: Number("-" + spent),
        });
      }
    }
    return transactionList;
  }
};

module.exports = {
  dateTimeSort,
  totalPoints,
  transactPoints,
};
