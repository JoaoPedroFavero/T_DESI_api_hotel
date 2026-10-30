CREATE DATABASE hotel_db;
USE hotel_db;

CREATE TABLE hospedes (
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
	nome VARCHAR(250) NOT NULL,
	cpf VARBINARY(50) NOT NULL,
    cpf_iv BINARY(12) NOT NULL,
    cpf_tag BINARY(16) NOT NULL,
	data_nascimento DATE NOT NULL,
	telefone VARCHAR(20) NOT NULL,
	endereco VARCHAR(45) NOT NULL,
	email VARBINARY(300) NOT NULL,
    email_iv BINARY(12) NOT NULL,
    email_tag BINARY(16) NOT NULL
);

CREATE TABLE quartos(
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
	categoria VARCHAR(45) NOT NULL,
	capacidade INT NOT NULL,
	valor_diaria DECIMAL(8,2) NOT NULL,
	status_quarto ENUM('reservado', 'disponivel') DEFAULT 'disponivel' NOT NULL
);

CREATE TABLE reservas(
	id_hospede INT NOT NULL,
	id_quarto INT NOT NULL,
	data_entrada DATE NOT NULL,
	data_termino DATE NOT NULL,
	status_reserva BOOLEAN NOT NULL,
    
    FOREIGN KEY (id_hospede) REFERENCES hospedes (id) ON DELETE CASCADE,
    FOREIGN KEY (id_quarto) REFERENCES quartos (id) ON DELETE CASCADE
);