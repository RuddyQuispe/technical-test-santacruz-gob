-- CREATE ROLE
CREATE ROLE test_user
    WITH
    LOGIN
    INHERIT
    REPLICATION
    CONNECTION LIMIT -1
    PASSWORD 'b6200836-fea7-4a86-9d33-107d08655f33';

-- CREATE DATABASE
CREATE DATABASE test_gobernation
    OWNER test_user;


create table sectores(
	sector_id serial primary key,
	sector_desc text not null
);

insert into sectores(sector_desc) values ('administracion'),
										 ('desarrollo');

create table tipos_accidentes(
	ta_id serial primary key,
	ta_desc text not null
);

insert into tipos_accidentes(ta_desc) values ('lucha libre'),('choque autos');

create table empleados(
	emp_id serial primary key,
	emp_apellido text not null,
	emp_nombre text null,
	emp_sexo boolean not null, -- true=femenino false=masculino
	emp_fecnac date not null,
	emp_fecing date not null,
	emp_id_supervisor int null,
	emp_sector_id int not null,
	foreign key (emp_sector_id) references sectores(sector_id)
	on update cascade
	on delete cascade,
	foreign key (emp_id_supervisor) references empleados(emp_id)
);

insert into empleados(emp_apellido, emp_nombre, emp_sexo, emp_fecnac, emp_fecing, emp_id_supervisor, emp_sector_id) values
('chumacero','joaquin', true, '09/09/1980', '09/10/2019', null, 1),
('quispe','ruddy', false, '11/10/1999', '11/10/2022', 1,1);

create table accidentes(
	acc_id serial primary key,
	acc_fecha date not null,
	acc_severidad text not null,
	acc_emp_id int not null,
	acc_sector_id int not null,
	acc_ta_id int not null,
	foreign key (acc_emp_id) references empleados(emp_id)
	on update cascade
	on delete cascade,
	foreign key (acc_sector_id) references sectores(sector_id)
	on update cascade
	on delete cascade,
	foreign key (acc_ta_id) references tipos_accidentes(ta_id)
	on update cascade
	on delete cascade
);
select * from accidentes a ;

insert into accidentes (acc_fecha, acc_severidad, acc_emp_id, acc_sector_id, acc_ta_id) values
('01/10/2022', 'simple', 1, 1, 1),
('10/10/2022', 'grave', 2, 1, 1);
