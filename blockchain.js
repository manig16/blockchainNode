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

  // chain integrity validation
  isValidChain(chain) {
    if (JSON.stringify(chain[0]) != JSON.stringify(Block.genesis)) {
      console.log('incorrect genesis block is found.');
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (block.lastHash != lastBlock.hash) {
        console.log('broken chain is found.');
        return false;
      }

      if (Block.getBlockHash(block) != block.hash) {
        console.log('hash mismatch is found.');
        return false;
      }
    }
    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log(
        `invalid new chain length ${newChain.length} is recieved. actual chain length ${this.chain.length}`
      );
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('invalid chain');
      return;
    }
    console.log('replacing Blockchain with a new chain');
    this.chain = newChain;
  }
}

module.exports = Blockchain;
