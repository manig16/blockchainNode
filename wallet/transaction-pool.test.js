const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction Pool', () => {
  let tp, wallet, transaction;
  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, 'foo1-4ddr355', 30);
    tp.AddOrUpdateTransaction(transaction);
  });

  it('adds a transaction to the pool', () => {
    expect(tp.transactions.find((t) => t.id === transaction.id)).toEqual(
      transaction
    );
  });

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo2-4ddr355', 40);
    tp.AddOrUpdateTransaction(newTransaction);

    expect(
      JSON.stringify(tp.transactions.find((t) => t.id === newTransaction.id))
    ).not.toEqual(oldTransaction);
  });
});
