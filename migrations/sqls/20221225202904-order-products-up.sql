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