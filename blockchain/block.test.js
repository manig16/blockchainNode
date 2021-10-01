const Block = require('./Block');

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
});
