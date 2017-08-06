CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL (50, 2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Roomda vacuum cleaner", "Home and Kitchen", 199.99, 175),
("Babble: Scrabble for Babies", "Toys and Games", 19.99, 7),
("Brancake Mix", "Food", 7.99, 11),
("Ten Thousand Things I Hate About You", "Movies", 10.99, 2),
("Nespresso Profeta", "Home and Kitchen", 78.99, 44),
("White T-shirt", "Clothing", 9.99, 100),
("Earbuds", "Electronics", 5.99, 80),
("Checkers", "Toys and Games", 8.50, 800),
("Romeo and Juliet", "Movies", 9.25, 17),
("Gold Egg", "Novelties", 250.00, 1);

SELECT * FROM bamazon.products;
