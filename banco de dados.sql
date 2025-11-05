create database appfake;
use appfake;

CREATE table login (
	senha int(4) NOT null,
    nome varchar(30) not null);
    
create table professores (
nome_professor varchar(30) not null,
materia_professor varchar(20) not null);

create table alunos (
id_alunos   INTEGER PRIMARY KEY AUTO_INCREMENT,
nome_alunos varchar(200) not null,
media_alunos float not null,
datadenasci_alunos varchar(10) null,
semestre_alunos int not null),
primary key(id_alunos)
)default charset = utf8;

create table materias (
nome_materia varchar(20) not null,
semestre_materias int not null,
aulasporsemana_materias int not null,
professorqueensina_materias varchar(30) not null,
notas_materias int not null);

drop table materias;
drop table alunos;

insert into alunos values
(default, 'Arthur Mariano da Luz', '9.0', '29.04.2009', '3'),
(default, 'Ana Paula Gatto', '9.5', '23.03.2009', '3'),
(default, 'Thaila Casal', '9.5', '15.08.2008', '3'),
(default, 'Gabriela Biesek', '9.5', '23.10.2008', '3');



use appfake;
