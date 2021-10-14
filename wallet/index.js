const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const { INITIAL_BALANCE } = require('../config');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet - 
      publicKey: ${this.publicKey.toString()}
      balance  : ${this.balance}`;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recipient, amount, blockchain, transactionPool) {
    this.balance = this.calculateBalance(blockchain);

    if (amount > this.balance) {
      console.log(`amount: ${amount} exceeds current balance: ${this.balance}`);
      return;
    }

    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.AddOrUpdateTransaction(transaction);
    }
    return transaction;
  }

  calculateBalance(blockchain) {
    let balance = this.balance;
    let transactions = [];

    // get all transactions in the blockchain
    blockchain.chain.forEach((block) =>
      block.data.forEach((tx) => {
        transactions.push(tx);
      })
    );

    // get all transactions for this wallet
    const walletInputTxs = transactions.filter(
      (tx) => tx.input.address === this.publicKey
    );

    let startTime = 0;
    // get the recent transaction for the wallet
    if (walletInputTxs.length > 0) {
      const recentInputTx = walletInputTxs.reduce((prev, current) => {
        prev.input.timestamp > current.input.timestamp ? prev : current;
      });
      balance = recentInputTx.outputs.find(
        (output) => output.address === this.publicKey
      ).amount;
      startTime = recentInputTx.input.timestamp;
    }

    // get the balance after the recent transactions
    transactions.forEach((tx) => {
      if (tx.input.timestamp > startTime) {
        tx.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance += output.amount;
          }
        });
      }
    });
    return balance;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }
}

module.exports = Wallet;
