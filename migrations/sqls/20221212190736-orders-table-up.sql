CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    quantity integer,
    status VARCHAR(50) DEFAULT 'active',
    product_id integer REFERENCES products(id),
    user_id integer REFERENCES users(id)
);

INSERT INTO
    orders(quantity, product_id, user_id)
VALUES
    (2, 1, 1);