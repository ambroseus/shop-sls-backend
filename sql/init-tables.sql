drop table if exists stocks;
drop table if exists products;

create table products (
	id uuid primary key default gen_random_uuid(),
	title text not null,
	description text,
	price integer
);

create table stocks (
	product_id uuid,
	count integer,
	foreign key (product_id) references products(id)
);

with product as 
 (insert into products(title,description,price) values ('Product1','description 1', 100) returning id)
  insert into stocks(product_id, count) select product.id, 10 from product;

with product as
 (insert into products(title,description,price) values ('Product2','description 2', 200) returning id)
  insert into stocks(product_id, count) select product.id, 20 from product;

with product as
 (insert into products(title,description,price) values ('Product3','description 3', 300) returning id)
  insert into stocks(product_id, count) select product.id, 30 from product;

with product as
 (insert into products(title,description,price) values ('Product4','description 4', 400) returning id)
  insert into stocks(product_id, count) select product.id, 40 from product;

with product as
 (insert into products(title,description,price) values ('Product5','description 5', 500) returning id)
  insert into stocks(product_id,count) select product.id, 50 from product;
