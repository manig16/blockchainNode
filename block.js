const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block -
    timestamp: ${this.timestamp}
    lastHash: ${this.lastHash}
    hash: ${this.hash}
    data: ${this.data}`;
  }

  static genesis() {
    const dt = new Date('01/01/2021 01:00:00.000');
    return new this(dt.getTime(), '-----', 'f1r57-h45h', []);
  }

  static createBlock(lastBlock, data) {
    const timestamp = new Date().getTime();
    const lastHash = lastBlock.hash;
    const hash = Block.getHash(timestamp, lastHash, data);
    return new Block(timestamp, lastHash, hash, data);
  }

  static getHash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`);
  }

  static getBlockHash(block) {
    const { timestamp, lastHash, data } = block;
    return Block.getHash(timestamp, lastHash, data);
  }
}

module.exports = Block;
