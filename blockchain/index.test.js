const Blockchain = require('./index');
const Block = require('./block');

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
    const data = 'foo';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    bc2.addBlock('foo');
    console.log(`block length is ${bc2.chain.length}`);
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a chain with corrupted genesis block', () => {
    bc2.chain[0].data = 'Bad data';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'Not foo'; // or any other element
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('replaces the blockchain with a valid chain', () => {
    bc2.addBlock('goo');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).toEqual(bc2.chain);
  });

  it('fewer blocks in the new chain - does not replace the chain', () => {
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain);
  });
});

describe('Add blocks', () => {
  it('adds 3 blocks', () => {
    const bc = new Blockchain();
    for (let i = 0; i < 2; i++) {
      console.log(bc.addBlock(`foo ${i}`).toString());
    }
  });
});
