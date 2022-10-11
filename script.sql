-- formato de fecha de la BD YYYY/MM/DD
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
										 ('desarrollo'),
										 ('rrhh');

create table tipos_accidentes(
	ta_id serial primary key,
	ta_desc text not null
);
insert into tipos_accidentes(ta_desc) values ('accidente vehicular'),
											 ('sansion'),
											 ('conflictos severos');

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
	on update no action
	on delete no action
);

insert into empleados(emp_apellido, emp_nombre, emp_sexo, emp_fecnac, emp_fecing, emp_id_supervisor, emp_sector_id) values
('chumacero','joaquin', true, '1990/01/03', '2019/05/16', null, 1),
('quispe','ruddy', false, '1980/03/15', '2021/06/30', 1,1),
('chavarria','marisol', true, '2000/10/20', '2022/05/3', null, 1);

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

insert into accidentes (acc_fecha, acc_severidad, acc_emp_id, acc_sector_id, acc_ta_id) values
('2022/09/03', 'simple', 1, 1, 1),
('2022/09/10', 'simple', 1, 1, 1),
('2022/09/15', 'grave', 2, 2, 2),
('2022/09/18', 'simple', 3, 2, 1),
('2022/09/20', 'grave', 1, 2, 2),
('2022/09/30', 'simple', 3, 1, 1);

-- funcion qu retorna una sql query
create or replace function lista_igualxacci(first_param date, second_param date) 
returns table(tipo_acc_id int, acc_desc text, cant_acc bigint)
as $$ begin
	return query select ta.ta_id, ta.ta_desc, count(distinct a.acc_id) 
			from tipos_accidentes ta, accidentes a, sectores s
			where ta.ta_id=a.acc_ta_id and a.acc_emp_id=s.sector_id and s.sector_id=a.acc_sector_id  
				and first_param <= a.acc_fecha and a.acc_fecha  <= second_param 
			group by ta.ta_id, ta.ta_desc;
end $$ language plpgsql;

-- ejecucion de la funcion con formato de fecha YYYY/MM/DD
select * from lista_igualxacci('2022/09/9', '2022/09/30');