CREATE DATABASE kyckstart;

CREATE TABLE businesses(
    business_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    type VARCHAR(150),
    phone VARCHAR(20),
    address VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    rating VARCHAR(10),
    basic_plan VARCHAR(1000),
    advanced_plan VARCHAR(1000),
    supreme_plan VARCHAR(1000)
);