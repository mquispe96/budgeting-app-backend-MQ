import express from 'express';
import {nanoid} from 'nanoid';
import transactionsDB from '../Models/transactions.model.js';
import {dateCreated, formatBody} from '../Formatting/formatting.js';
import {hasAllRequiredFields, validateDataTypes} from '../Validation/validation.js';
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
transactions.post('/', hasAllRequiredFields, validateDataTypes,(req, res) => {
  const formattedBody = formatBody(req.body);
  const createdTransaction = {
    id: nanoid(6),
    created: dateCreated(),
    updated: dateCreated(),
    ...formattedBody,
  };
  transactionsDB.push(createdTransaction);
  res.json(transactionsDB[transactionsDB.length - 1].id);
});
transactions.put('/:id', hasAllRequiredFields, validateDataTypes,(req, res) => {
  const {id} = req.params;
  const transactionIndex = transactionsDB.findIndex(
    transaction => transaction.id === id,
  );
  if (transactionIndex > -1) {
    const formattedBody = formatBody(req.body);
    const updatedTransaction = {
      id: transactionsDB[transactionIndex].id,
      created: transactionsDB[transactionIndex].created,
      updated: dateCreated(),
      ...formattedBody,
    };
    transactionsDB[transactionIndex] = updatedTransaction;
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
