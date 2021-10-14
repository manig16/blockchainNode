const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.createBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      console.log('incorrect genesis block is found.');
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        console.log('incorrect non-genesis block is found');
        return false;
      }
    }
    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log(
        `Received chain with length ${newChain.length}. Not longer than the current chain. `
      );
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('The received chain is not valid.');
      return;
    }
    console.log('replacing Blockchain with the received chain');
    this.chain = newChain;
  }
}

module.exports = Blockchain;
