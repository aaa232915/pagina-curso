use appfake;


-- Criar tabela de login
CREATE TABLE login (
    senha INT NOT NULL,
    nome VARCHAR(30) NOT NULL
);

-- Criar tabela de professores
CREATE TABLE professores (
	id_professor int auto_increment primary key,
    nome_professor VARCHAR(30) NOT NULL,
    materia_professor VARCHAR(200) NOT NULL,
    senha varchar(20)
)DEFAULT CHARSET=utf8;

-- Criar tabela de alunos
CREATE TABLE alunos (
    id_alunos INT AUTO_INCREMENT PRIMARY KEY,
    nome_alunos VARCHAR(200) NOT NULL,
    datadenasci_alunos VARCHAR(10),
    semestre_alunos INT NOT NULL,
    senha varchar(20)
) DEFAULT CHARSET=utf8;

-- Criar tabela de matérias
CREATE TABLE materias (
    nome_materia VARCHAR(20) NOT NULL,
    semestre_materias INT NOT NULL,
    aulasporsemana_materias INT NOT NULL,
    professorqueensina_materias VARCHAR(30) NOT NULL,
    notas_materias INT NOT NULL
);

use appfake
-- Excluir tabelas (se necessário)
DROP TABLE  professores;
DROP TABLE IF EXISTS alunos;



-- Inserir dados na tabela alunos
INSERT INTO alunos VALUES
(DEFAULT, 'Arthur Mariano da Luz', 9.0, '29.04.2009', 3),
(DEFAULT, 'Ana Paula Gatto', 9.5, '23.03.2009', 3),
(DEFAULT, 'Thaila Casal', 9.5, '15.08.2008', 3),
(DEFAULT, 'Gabriela Biesek', 9.5, '23.10.2008', 3);

select * from alunos;

use appfake;

create table trabalhos(
    id_trabalhos INT AUTO_INCREMENT PRIMARY KEY,
   materia_trabalhos VARCHAR(200) NOT NULL,
    dataentrega_trabalhos date,
    descri_trabalhos VARCHAR(200) NOT NULL
) DEFAULT CHARSET=utf8;

select * from professores;