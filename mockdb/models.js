class Transaction {
  constructor(payer, points) {
    this.payer = payer;
    this.points = points;
    this.timestamp = new Date();
  }

  getTransaction() {
    return {
      payer: this.payer,
      points: this.points,
      timestamp: this.timestamp,
    };
  }
}

module.exports = Transaction;
