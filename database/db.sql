CREATE DATABASE IF NOT EXISTS race01;

CREATE TABLE IF NOT EXISTS race01.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL
);

ALTER TABLE
    race01.users
ADD COLUMN
    permission ENUM('user', 'admin') NOT NULL DEFAULT 'user';
    