//Dependências //Executar da primeira vez
//npm init -y
//npm install express mysql2 dotenv
//npm install cors

//Para executar o servi

const cors = require('cors');

const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;

//Rota POST - Cadastrar novo produto
app.post('/cadAluno', (req, res) => {
  // As variáveis dentro dos {} recebem os dados que vieram do front-end
  const { nome_alunos, datadenasci_alunos, semestre_alunos, senha } = req.body;

  //Se os dados que vieram do font-end forem em branco
  if (!nome_alunos || !datadenasci_alunos|| !semestre_alunos || !senha) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  // Realiza a inserção dos dados recebidos no banco de dados
  const sql = 'INSERT INTO alunos (nome_alunos, datadenasci_alunos, semestre_alunos, senha) VALUES (?,?,?,?)';
  db.query(sql, [nome_alunos, datadenasci_alunos, semestre_alunos, senha], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Esse produto já está cadastrado' });
      }
      return res.status(500).json({ error: err.message });
    }

    // Em caso de sucesso encaminha uma mensagem e o id do produto
    res.status(201).json({ message: 'Aluno cadastrado com sucesso', nome_alunos: result.insertnome_alunos  });
  });
});

app.get('/alunos', (req, res) => {
  const sql = 'SELECT * FROM alunos';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});



//Rota POST - Cadastrar novo professor
app.post('/cadProfessor', (req, res) => {
  // As variáveis dentro dos {} recebem os dados que vieram do front-end
  const { nome_professor, materia_professor, senha } = req.body;

  //Se os dados que vieram do font-end forem em branco
  if (!nome_professor || !materia_professor|| !senha) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  // Realiza a inserção dos dados recebidos no banco de dados
  const sql = 'INSERT INTO professores (nome_professor, materia_professor, senha) VALUES (?,?,?)';
  db.query(sql, [nome_professor, materia_professor, senha], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Esse produto já está cadastrado' });
      }
      return res.status(500).json({ error: err.message });
    }

    // Em caso de sucesso encaminha uma mensagem e o id do produto
    res.status(201).json({ message: 'Professor cadastrado com sucesso', nome_professor: result.insertnome_professores  });
  });
});

app.get('/professores', (req, res) => {
  const sql = 'SELECT * FROM professores';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/alunos', (req, res) => {
  const sql = 'SELECT * FROM alunos';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


app.post('/entrarAluno', (req, res) => {
  const { nome_alunos, datadenasci_alunos, semestre_alunos, senha } = req.body;

  if (!nome_alunos || !datadenasci_alunos || !semestre_alunos || !senha) {
    return res.status(400).json({ error: 'Os campos são obrigatórios' });
  }

  const sql = 'SELECT * FROM alunos WHERE nome_alunos = ? AND datadenasci_alunos = ? AND semestre_alunos = ? AND senha = ?';

  db.query(sql, [nome_alunos, datadenasci_alunos, semestre_alunos, senha], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro no banco de dados' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Aluno não encontrado ou dados incorretos' });
    }

    res.json({ message: "Login realizado com sucesso", aluno: results[0] });
  });
});

app.post('/entrarProf', (req, res) => {
  const { nome_professor, senha } = req.body;

  if (!nome_professor || !senha) {
    return res.status(400).json({ error: 'Os campos são obrigatórios' });
  }

  const sql = 'SELECT * FROM professores WHERE nome_professor = ? AND senha = ?';

  db.query(sql, [nome_professor, senha], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro no banco de dados' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Aluno não encontrado ou dados incorretos' });
    }

    res.json({ message: "Login realizado com sucesso", aluno: results[0] });
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});