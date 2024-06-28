# Budgeting App - Backend

#### Back-end feature requirements

1. Server incorporates a single resource with the following fields:
   - `transaction_id` - A unique number for each item
   - `transaction_name`- string - the name of the transaction (ie: income, savings, cat food, etc.)
   - `transaction_amount` -number - the amount of the transaction
   - `transaction_date`- string - the date should be a simple string.
   - `transaction_from` - string - who this transaction was with (ie. employer, bank, pet store, grocery store, etc)
   - `transaction_category` - string - what category does this fall into (income, savings, pets, food, etc)
2. A route exists to create new resources.
3. A route exists to read all resources.
4. A route exists to read a single resource.
5. A route exists to update a single resource.
6. A route exists to delete a single resource.
7. An appropriate "Not Found" response is given when a route is requested that does not match the created routes.

##### Back-end Example

|  #  | Action  |        URL        | HTTP Verb |    CRUD    |                  Description                   |
| :-: | :-----: | :---------------: | :-------: | :--------: | :--------------------------------------------: |
|  1  |  Index  |   /transactions   |    GET    |  **R**ead  |   Get a list (or index) of all transactions    |
|  2  |  Show   | /transactions/:id |    GET    |  **R**ead  | Get an individual view (show one transactions) |
|  3  | Create  |   /transactions   |   POST    | **C**reate |           Create a new transactions            |
|  4  | Destroy | /transactions/:id |  DELETE   | **D**elete |             Delete a transactions              |
|  5  | Update  | /transactions/:id |    PUT    | **U**pdate |             Update a transactions              |

> **Note:** All of the above routes should work both with an application like Postman and a front-end framework like React
