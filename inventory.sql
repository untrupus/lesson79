CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;
CREATE TABLE IF NOT EXISTS categories (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    description TEXT (2000) 
);
CREATE TABLE IF NOT EXISTS places (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    description TEXT (2000) 
);
CREATE TABLE IF NOT EXISTS item (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    description TEXT (2000),
	image VARCHAR (30),
    category_id INT NOT NULL,
    CONSTRAINT FK_category
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE RESTRICT        
    ON UPDATE CASCADE,
    place_id INT NOT NULL,
    CONSTRAINT FK_place
    FOREIGN KEY (place_id)
    REFERENCES places(id)
    ON DELETE RESTRICT        
    ON UPDATE CASCADE
);