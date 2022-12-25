# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

Token must be passed inside the [ Authorization key ] inside the request header for each request that require token

## API Endpoints

#### Users

- Authenticate

  - HTTP verb `POST`
  - Endpoint:- `/api/users/authenticate`
  - Request Body

    ```json
    {
      "firstname": "testfirstname",
      "lastname": "testlastname",
      "password": "1234"
    }
    ```

  - Response Body -- `User object and jwt token`

    ```json
    {
      "user": {
        "id": 1,
        "firstname": "testfirstname",
        "lastname": "testlastname",
        "password": "$2b$10$7WtkC6aZWOL3KBB3IyV8keWvqTUHNPfQlTuDNB.Hw1g89BFNXKvpC"
      },

      "token": "eyJhbGciOiJIUzI1NiJ9.MQ.mSUkVpRC--4hzILGT4p2vNBsKfScYIMGhLh3cxSJ3to",

      "message": "User Found sucessfully"
    }
    ```

- Index [token required]

  - HTTP verb `GET`
  - Endpoint:- `/api/users/index`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of users objects`

    ```json
      {
        "users": [
            {
              "id": 1,
              "firstname": "testfirstname",
              "lastname": "testlastname",
              "password": "$2b$10$7WtkC6aZWOL3KBB3IyV8keWvqTUHNPfQlTuDNB.Hw1g89BFNXKvpC"
            },
           {
              "id": 2,
              "firstname": "testuser2",
              "lastname": "testuser2",
              "password": "$2b$10$oUJ0AdKjBTvV/GKnAAreQOuOxcrf6wFl0YHal1XSXKoQep2Z8daLy"
            }
          ]

          "message": "Users retrieved successfully"
      }
    ```

- Show [token required]

  - HTTP verb `GET`
  - Endpoint:- `/api/users/show?firstname=testfirstname&lastname=testlastname`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- ` User object`

    ```json
    {
      "user": {
        "id": 1,
        "firstname": "testfirstname",
        "lastname": "testlastname",
        "password": "$2b$10$7WtkC6aZWOL3KBB3IyV8keWvqTUHNPfQlTuDNB.Hw1g89BFNXKvpC"
      },

      "message": "User retrieved successfully "
    }
    ```

- Create 

  - HTTP verb `POST`
  - Endpoint:- `/api/users/createuser`
  - Request Body

    ```json
    {
      "firstname": "testuser2",
      "lastname": "testuser2",
      "password": "1234"
    }
    ```

  - Response Body -- `User object and jwt token`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiJ9.Mg.fjsKYdBwr7jj2ngEU203dODjG-uTBy0Wec4pw1DQOLI",

      "createdUser": {
        "id": 2,
        "firstname": "testuser2",
        "lastname": "testuser2",
        "password": "$2b$10$oUJ0AdKjBTvV/GKnAAreQOuOxcrf6wFl0YHal1XSXKoQep2Z8daLy"
      },

      "message": "User created successfully"
    }
    ```

#### Products

- Index

  - HTTP verb `GET`
  - Endpoint:- `/api/products/index`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of product objects`

    ```json
      {

         "products": [
                {
                    "id": 1,
                    "product_name": "testproduct",
                    "price": "99.99"
                }
            ]
        "message": "All products retrieved successfully"
      }
    ```

- Show

  - HTTP verb `GET`
  - Endpoint:- `/api/products/show?name=testproduct`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Product object`

    ```json
    {
      "product": {
        "id": 1,
        "product_name": "testproduct",
        "price": "99.99"
      },

      "message": "Product shown successfully"
    }
    ```

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/api/products/createproduct`
  - Request Body

    ```json
    {
      "name": "test product 2",
      "price": 99.99
    }
    ```

  - Response Body -- `Product object`

    ```json
    {
      "createdProduct": {
        "id": 2,
        "product_name": "test product 2",
        "price": "99.99"
      },
      "message": "Product created successfully"
    }
    ```

#### Orders

- Current Order by user (args: user id)[token required]

  - HTTP verb `GET`
  - Endpoint:- `/api/orders/index/:userid`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of Order objects`

        ```json
           {
        "userOrders": [
            {
                "id": 2,
                "product_name": "testproduct",
                "order_status": "active",
                "quantity": 2,
                "Item_price": "99.99",
                "Total_order_price": "199.98"
            }

        ],
        "message": "All user orders retrieved successfully"

    }

    ```

    ```

- Create Order (args: user id)[token required]

  - HTTP verb `POST`
  - Endpoint:- `/api/orders/create/:userid`
  - Request Body

    ```json
    {
      "quantity": 5,
      "productId": 1
    }
    ```

  - Response Body -- `Array of Order objects`

    ```json
    {
      "message": "Order created successfully",

      "order": {
        "id": 5,
        "status": "active",
        "user_id": 1
      }
    }
    ```

    - Add Products To Order (args: user id)[token required]

  - HTTP verb `POST`
  - Endpoint:- `/api/orders/add`
  - Request Body

    ```json
    {
      "orderId": 1,
      "quantity": 5,
      "productId": 1
    }
    ```

  - Response Body -- `Array of Order objects`

    ```json
    {
      "message": "Product added successfully",
      "addedProduct": {
        "id": 2,
        "order_id": 1,
        "product_id": 1,
        "quantity": 5
      }
    }
    ```

## Database Schemas

#### Users Schema

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password VARCHAR(500)
);


INSERT INTO
    users(firstName, lastName, password)
VALUES
    (
        'testfirstname',
        'testlastname',
        '$2b$10$7WtkC6aZWOL3KBB3IyV8keWvqTUHNPfQlTuDNB.Hw1g89BFNXKvpC'
    );
```

#### Products Schema

```sql
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(4, 2)
);

INSERT INTO
    products(product_name, price)
VALUES
    ('testproduct', 99.99);

```

#### Orders Schema

```sql

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'active',
    user_id integer REFERENCES users(id)
);

INSERT INTO
    orders(user_id)
VALUES
    (1);

```

#### Order_products Schema

```sql

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id),
    quantity integer
);

INSERT INTO
    order_products(order_id, product_id, quantity)
VALUES
    (1, 1, 2);

```

## Data Shapes

#### Product

```typescript
type product = {
  readonly id: number
  product_name: string
  price: number
}
```

#### User

```typescript
export type user = {
  id: number
  firstname: string
  lastname: string
  password: string
}
```

#### Orders

```typescript
type ordertype = {
  readonly orderId: number
  quantity: number
  status: string
  readonly product_id: number
  readonly user_id: number
}
```
