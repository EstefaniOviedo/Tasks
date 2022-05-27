CREATE DATABASE tasksdb

CREATE table task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255), 
    description VARCHAR(255),
    active int
);