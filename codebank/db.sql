CREATE TABLE credit_cards (
  id uuid NOT NULL,
  name VARCHAR NOT NULL,
  number VARCHAR NOT NULL,
  expiration_month VARCHAR NOT NULL,
  expiration_year VARCHAR,
	CVV VARCHAR NOT NULL,
	balance float not null,
	balance_limit float not null,
  PRIMARY KEY (id)
);

CREATE TABLE transactions (
  id uuid NOT NULL,
	credit_card_id uuid NOT NULL references credit_cards(id),
  amount float NOT NULL,
  status VARCHAR NOT NULL,
  description VARCHAR,
	store VARCHAR NOT NULL,
	created_at timestamp not null,
  PRIMARY KEY (id)
);

insert into credit_cards(id, name, number, expiration_month, expiration_year, CVV, balance, balance_limit) 
values('30d08c4e-dd90-40d0-adfd-6d693abe3320', 'Rudolf HiOk', '1234567812345678', '10', '2022', '123', '0', '100000');

insert into credit_cards(id, name, number, expiration_month, expiration_year, CVV, balance, balance_limit) 
values('d0af3b29-4bdb-449d-848a-7801acbf1838', 'Rudolf Order', '1234123412341234', '12', '2023', '123', '0', '100000');

select * from credit_cards;
