class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    // get the valid transactions
    const validTransactions = this.transactionPool.validTransactions();
    // include a reward for the miner
    // create a block consisting of valid transactions
    // synchronize the chains with the p2p server
    // clear the transaction pool
    // broadcast to every miner to clear their transactions pools
  }
}

module.exports = Miner;
