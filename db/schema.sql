CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
    id INT (20) AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR (200),
    devoured BOOLEAN default false, 
    burger_date TIMESTAMP,
    primary key (id)
)