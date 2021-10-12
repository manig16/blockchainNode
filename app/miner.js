const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');

class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  /*
    This method is responsible for the following:
      get the valid transactions
      include a reward for the miner
      create a block consisting of valid transactions
      synchronize the chains with the p2p server
      clear the transaction pool of the local miner
      broadcast the clear transactions message to all miners
  */
  mine() {
    const validTransactions = this.transactionPool.validTransactions();

    validTransactions.push(
      Transaction.rewardTransaction(this, Wallet.blockchainWallet())
    );

    const block = this.blockchain.addBlock(validTransactions);
    this.p2pServer.syncChains();
    this.transactionPool.clear();
    this.p2pServer.broadcastClearTransactions();
    return block;
  }
}

module.exports = Miner;
