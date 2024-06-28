import { nanoid } from 'nanoid';

export default [
  {
    id: nanoid(6),
    name: "Salary",
    amount: 1000,
    date: "2021-01-01",
    from: "Employer",
    category: "Income",
    type: "Deposit"
  },
  {
    id: nanoid(6),
    name: "Rent",
    amount: 500,
    date: "2021-01-02",
    from: "Landlord",
    category: "Housing",
    type: "Withdrawal"
  },
  {
    id: nanoid(6),
    name: "Groceries",
    amount: 120,
    date: "2021-01-03",
    from: "Grocery Store",
    category: "Food",
    type: "Withdrawal"
  },
  {
    id: nanoid(6),
    name: "Salary",
    amount: 1000,
    date: "2021-02-01",
    from: "Employer",
    category: "Income",
    type: "Deposit"
  },
  {
    id: nanoid(6),
    name: "Rent",
    amount: 500,
    date: "2021-02-02",
    from: "Landlord",
    category: "Housing",
    type: "Withdrawal"
  },
  {
    id: nanoid(6),
    name: "Groceries",
    amount: 100,
    date: "2021-02-03",
    from: "Grocery Store",
    category: "Food",
    type: "Withdrawal"
  }
]
