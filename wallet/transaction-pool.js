/*
  This class is responsible for collecting transactions from multiple users.
*/

const Transaction = require('./transaction');
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

  validTransactions() {
    return this.transactions.filter((tx) => {
      const outputTotal = tx.outputs.reduce((total, output) => {
        return total + output.amount;
      }, 0);

      if (tx.input.amount !== outputTotal) {
        console.log(`Invalid transaction from ${tx.input.address}.`);
        return;
      }

      if (!Transaction.verifyTransaction(tx)) {
        console.log(`Invalid signature from ${tx.input.address}.`);
        return;
      }
      return tx;
    });
  }

  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;
