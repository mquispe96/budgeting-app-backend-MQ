import express from 'express';
import {nanoid} from 'nanoid';
import transactionsDB from '../Models/transactions.model.js';
const transactions = express.Router();

transactions.get('/', (req, res) => res.json(transactionsDB));
transactions.get('/:id', (req, res) => {
  const {id} = req.params;
  const transaction = transactionsDB.find(transaction => transaction.id === id);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).send('Transaction not found');
  }
});
transactions.post('/', (req, res) => {
  const createdTransaction = {id: nanoid(6), ...req.body};
  transactionsDB.push(createdTransaction);
  res.json(transactionsDB[transactionsDB.length - 1].id);
});
transactions.put('/:id', (req, res) => {
  const {id} = req.params;
  const transactionIndex = transactionsDB.findIndex(
    transaction => transaction.id === id,
  );
  if (transactionIndex > -1) {
    const 
    transactionsDB[transactionIndex] = req.body;
    res.json(transactionsDB[transactionIndex]);
  } else {
    res.status(404).send('Transaction not found');
  }
});
transactions.delete('/:id', (req, res) => {
  const {id} = req.params;
  const transactionIndex = transactionsDB.findIndex(
    transaction => transaction.id === id,
  );
  if (transactionIndex) {
    transactionsDB.splice(transactionIndex, 1);
    res.json(transactionsDB);
  } else {
    res.status(404).send('Transaction not found');
  }
});

export default transactions;
