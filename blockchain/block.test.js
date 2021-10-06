const Block = require('./Block');
const { DIFFICULTY } = require('../config');

describe('Block', () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = {
      sender: 'John Doe',
      recepient: 'Jill Doe',
      quantity: 6,
    };

    lastBlock = Block.genesis();
    block = Block.createBlock(lastBlock, data);
  });

  it('sets the `data` to match the input', () => {
    expect(block.data).toStrictEqual(data);
  });

  it('sets the `lasthash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it('generates a hash that matches the difficulty', () => {
    expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
    console.log(block.toString());
  });
});
