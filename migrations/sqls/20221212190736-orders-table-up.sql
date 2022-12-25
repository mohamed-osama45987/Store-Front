CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'active',
    user_id integer REFERENCES users(id)
);

INSERT INTO
    orders(user_id)
VALUES
    (1);