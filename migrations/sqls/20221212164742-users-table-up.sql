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