# Inventory System

This is an inventory management system built using Node.js, Express, and Sequelize for handling arrivals and orders of products. It calculates the average cost of products and generates sales reports.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
    - [Create Product](#create-product)
    - [Create Arrival](#create-arrival)
    - [Create Order](#create-order)
    - [Get Cost](#get-cost)
    - [Get Report](#get-report)


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/inventory-system.git
    cd inventory-system
    ```

2. Install dependencies:
    ```sh
    npm install
    ```
3. Run database in docker:
    ```shell
    docker compose up
    ```

4. Set up your database and configure the database connection in `config/database.js`.

## Configuration

Update the `config/database.js` file with your database connection details. For example:
```javascript
module.exports = {
    username: 'your_username',
    password: 'your_password',
    database: 'inventory_db',
    host: 'localhost',
    dialect: 'postgres'
};
```

## Running the Application
Run database migrations:

```sh
npx sequelize-cli db:migrate
```
Start the application:

```sh
npm start
```
The application will be running on http://localhost:3000.

## API Endpoints

### Create Product
- URL: /products
- Method: POST
- Body:
```json
{
  "name": "Product Name"
}
```
### Create Arrival
- URL: /arrivals
- Method: POST
- Body:
```json
{
    "date": "YYYY-MM-DD",
    "products": [
        {
            "product_id": 1,
            "price": 100,
            "quantity": 10
        }
    ]
}
```

### Create Order
- URL: /orders
- Method: POST
- Body:
```json
{
    "date": "YYYY-MM-DD",
    "products": [
        {
            "product_id": 1,
            "price": 150,
            "quantity": 5
        }
    ]
}
```

### Get Cost
- URL: /cost/:id
- Method: GET
- Params:
- - id: Product ID
- Query:
- - date (optional): Date in YYYY-MM-DD format 

### Get Report
- URL: /report
- Method: GET
- Query:
- - from: Start date in YYYY-MM-DD format
- - to: End date in YYYY-MM-DD format