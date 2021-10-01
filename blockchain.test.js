const Blockchain = require('./blockchain');
const Block = require('./block');

const data = {
  sender: 'John Doe ',
  recepient: 'Jill Doe',
  quantity: 6,
};

describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it('validates a chain', () => {
    bc2.addBlock(data);
    expect(bc.isValidChain(bc2)).toBe(true);
  });

  it('invalidates a chain with corrupted genesis block', () => {
    bc2.chain[0].hash = 'corruptedHash';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidates a corrupt chain', () => {
    bc2.addBlock(data);
    // bc2.chain[1].lastHash = 'corruptedHash';
    bc2.chain[1].data = 'foo';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });
});
