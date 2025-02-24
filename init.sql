CREATE TABLE appeals (
    id VARCHAR(80) PRIMARY KEY,
    theme VARCHAR(80),
    payload TEXT,
    status VARCHAR(80),
    other TEXT,
    date TIMESTAMP default now()::timestamp(0)
);