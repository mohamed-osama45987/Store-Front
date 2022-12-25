CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(4, 2)
);

INSERT INTO
    products(product_name, price)
VALUES
    ('testproduct', 99.99);

