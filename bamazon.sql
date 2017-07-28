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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roomda vacuum cleaner", "Home and Kitchen", 199.99, 175);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Babble: Scrabble for Babies", "Toys and Games", 19.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Brancake Mix", "Food", 7.99, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Ten Thousand Things I Hate About You", "Movies", 10.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Nespresso Profeta", "Home and Kitchen", 78.99, 44);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("White T-shirt", "Clothing", 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Earbuds", "Electronics", 5.99, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Checkers", "Toys and Games", 8.50, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Romeo and Juliet", "Movies", 9.25, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Gold Egg", "Novelties", 25000, 1);
