-- Create tables
CREATE TABLE user (
	user_id INTEGER NOT NULL AUTO_INCREMENT, 
	name VARCHAR(30) NOT NULL, 
	joined_date DATETIME NOT NULL DEFAULT now(), 
	PRIMARY KEY (user_id)
);

CREATE TABLE currency (
	currency VARCHAR(10) NOT NULL, 
	symbol VARCHAR(300) NOT NULL, 
	PRIMARY KEY (currency)
);

CREATE TABLE login_history (
	login_date DATETIME NOT NULL DEFAULT now(), 
	user_id INTEGER NOT NULL, 
	confidence FLOAT NOT NULL, 
	logout_date DATETIME, 
	PRIMARY KEY (login_date, user_id), 
	FOREIGN KEY(user_id) REFERENCES user (user_id)
);

CREATE TABLE account (
	account_num INTEGER NOT NULL AUTO_INCREMENT, 
	owner INTEGER NOT NULL, 
	balance FLOAT NOT NULL, 
	account_type VARCHAR(10) NOT NULL, 
	currency VARCHAR(10) NOT NULL, 
	PRIMARY KEY (account_num), 
	FOREIGN KEY(owner) REFERENCES user (user_id), 
	FOREIGN KEY(currency) REFERENCES currency (currency)
);

CREATE TABLE model (
	model_id INTEGER NOT NULL AUTO_INCREMENT, 
	path VARCHAR(300) NOT NULL, 
	date_created DATETIME DEFAULT now(), 
	user INTEGER NOT NULL, 
	PRIMARY KEY (model_id), 
	FOREIGN KEY(user) REFERENCES user (user_id)
);

CREATE TABLE exchange_rate (
	from_currency VARCHAR(10) NOT NULL, 
	to_currency VARCHAR(10) NOT NULL, 
	rate FLOAT NOT NULL, 
	PRIMARY KEY (from_currency, to_currency), 
	FOREIGN KEY(from_currency) REFERENCES currency (currency), 
	FOREIGN KEY(to_currency) REFERENCES currency (currency)
);

CREATE TABLE transaction (
	id INTEGER NOT NULL AUTO_INCREMENT, 
	from_account_num INTEGER NOT NULL, 
	to_account_num INTEGER NOT NULL, 
	date DATETIME DEFAULT now(), 
	description VARCHAR(300), 
	amount FLOAT NOT NULL, 
	from_balance FLOAT NOT NULL, 
	to_balance FLOAT NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(from_account_num) REFERENCES account (account_num), 
	FOREIGN KEY(to_account_num) REFERENCES account (account_num)
);


-- Create currencies and exchange rates
INSERT INTO currency (currency, symbol)
VALUES ('HKD', '$'),('USD', '$'),('EUR', '€'),('GBP', '£'),('CAD', '$');

INSERT INTO exchange_rate (from_currency, to_currency, rate)
VALUES ('HKD', 'HKD', 1),('HKD', 'USD', 0.13),('HKD', 'EUR', 0.11),('HKD', 'GBP', 0.09),('HKD', 'CAD', 0.16),('USD', 'USD', 1),('USD', 'HKD', 7.77),('USD', 'EUR', 0.86),('USD', 'GBP', 0.73),('USD', 'CAD', 1.24),('EUR', 'EUR', 1),('EUR', 'USD', 1.16),('EUR', 'HKD', 9.05),('EUR', 'GBP', 0.85),('EUR', 'CAD', 1.44),('GBP', 'GBP', 1),('GBP', 'USD', 1.38),('GBP', 'EUR', 1.18),('GBP', 'HKD', 10.7),('GBP', 'CAD', 1.7),('CAD', 'CAD', 1),('CAD', 'USD', 0.81),('CAD', 'EUR', 0.69),('CAD', 'GBP', 0.59),('CAD', 'HKD', 6.29)		;


-- Create users and accounts
INSERT INTO user (name) 
VALUES ('kittie'),('ivan');

INSERT INTO model (path, user) 
VALUES 
    ('C:\\ComputerScience\\COMP3278\\Intelligent-Know-Your-Customer\\server\\recognition\\models', 1),
    ('C:\\ComputerScience\\COMP3278\\Intelligent-Know-Your-Customer\\server\\recognition\\models', 2)
;

INSERT INTO account (owner, balance, account_type, currency)
VALUES 
    (1, 10000, 'Current', 'HKD'),
    (1, 10000, 'Savings', 'HKD'),
    (1, 10000, 'American', 'USD'),
    (1, 10000, 'Euro', 'EUR'),
    (1, 10000, 'British', 'GBP'),
    (1, 10000, 'Canadian', 'CAD'),
    (2, 10000, 'Current', 'HKD'),
    (2, 10000, 'Savings', 'HKD'),
    (2, 10000, 'American', 'USD'),
    (2, 10000, 'Euro', 'EUR'),
    (2, 10000, 'British', 'GBP'),
    (2, 10000, 'Canadian', 'CAD')
;
