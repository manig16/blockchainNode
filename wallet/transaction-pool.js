/*
  This class is responsible for collecting transactions from multiple users.
*/

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  AddOrUpdateTransaction(transaction) {
    let transId = this.transactions.find((t) => t.id === transaction.id);

    if (transId) {
      this.transactions[this.transactions.indexOf(transId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  existingTransaction(address) {
    return this.transactions.find((t) => t.input.address === address);
  }
}

module.exports = TransactionPool;
