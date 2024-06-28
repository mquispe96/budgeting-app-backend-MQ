import {nanoid} from 'nanoid';

export default [
  {
    id: nanoid(6),
    name: 'Salary',
    amount: 1000,
    created: '2021-01-01',
    updated: '2021-01-01',
    from: 'Employer',
    category: 'Income',
    type: 'Deposit',
  },
  {
    id: nanoid(6),
    name: 'Rent',
    amount: 500,
    created: '2021-01-01',
    updated: '2021-01-01',
    from: 'Tenant',
    category: 'Housing',
    type: 'Withdrawal',
  },
  {
    id: nanoid(6),
    name: 'Groceries',
    amount: 50,
    created: '2021-01-01',
    updated: '2021-01-01',
    from: 'Self',
    category: 'Food',
    type: 'Withdrawal',
  },
  {
    id: nanoid(6),
    name: 'Electricity',
    amount: 100,
    created: '2021-01-01',
    updated: '2021-01-01',
    from: 'Utility Company',
    category: 'Utilities',
    type: 'Withdrawal',
  },
];
