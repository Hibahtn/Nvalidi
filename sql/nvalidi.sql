CREATE DATABASE IF NOT EXISTS nvalidi;
USE nvalidi;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    mot_de_passe VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    matiere VARCHAR(100),
    question TEXT,
    reponse TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    niveau VARCHAR(5) NOT NULL,
    field_id VARCHAR(50) NOT NULL,
    valeur FLOAT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_note (user_id, niveau, field_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    task_text TEXT NOT NULL,
    priority ENUM('basse', 'moyenne', 'haute') DEFAULT 'moyenne',
    is_completed TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS moyennes_calculees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    niveau VARCHAR(5) NOT NULL,
    moyenne FLOAT NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE flashcards ADD COLUMN is_learned TINYINT(1) DEFAULT 0;
ALTER TABLE todos 
ADD COLUMN status ENUM('a_faire', 'en_cours', 'termine') DEFAULT 'a_faire';