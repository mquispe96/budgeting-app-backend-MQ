import express from 'express';
import cors from 'cors';
import transactionsController from './Controllers/transactions.controller.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to the Transactions API!')); 
app.use('/transactions', transactionsController);
app.use('*', (req, res) => res.status(404).json({error: 'Not Found'}));

export default app;
