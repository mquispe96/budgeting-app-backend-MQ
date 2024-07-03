import express from 'express';
import {nanoid} from 'nanoid';
import transactionsArr from '../Models/transactions.model.js';
import {dateCreated, formatBody} from '../Formatting/formatting.js';
import {
  hasAllRequiredFields,
  validateDataTypes,
} from '../Validation/validation.js';
const transactions = express.Router();

let transactionsDB = [...transactionsArr];

transactions.get('/', (req, res) => res.json(transactionsDB));
transactions.get('/:id', (req, res) => {
  const {id} = req.params;
  const transaction = transactionsDB.find(transaction => transaction.id === id);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({error: 'Transaction not found'});
  }
});
transactions.post('/', hasAllRequiredFields, validateDataTypes, (req, res) => {
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
transactions.put(
  '/:id',
  hasAllRequiredFields,
  validateDataTypes,
  (req, res) => {
    const {id} = req.params;
    const transactionIndex = transactionsDB.findIndex(
      transaction => transaction.id === id,
    );
    if (transactionIndex > -1) {
      const formattedBody = formatBody(req.body);
      const updatedTransaction = {
        ...transactionsDB[transactionIndex],
        ...formattedBody,
        updated: dateCreated(),
      };
      const newTransactionsDB = [
        ...transactionsDB.slice(0, transactionIndex),
        updatedTransaction,
        ...transactionsDB.slice(transactionIndex + 1),
      ];
      transactionsDB = newTransactionsDB;
      res.json({success: 'Transaction updated'});
    } else {
      res.status(404).json({error: 'Transaction not found'});
    }
  },
);
transactions.delete('/:id', (req, res) => {
  const {id} = req.params;
  const transactionIndex = transactionsDB.findIndex(
    transaction => transaction.id === id,
  );
  if (transactionIndex > -1) {
    transactionsDB.splice(transactionIndex, 1);
    res.json({success: 'Transaction deleted'});
  } else {
    res.status(404).json({error: 'Transaction not found'});
  }
});

export default transactions;
