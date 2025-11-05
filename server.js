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
app.post('/cadNome', (req, res) => {
  // As variáveis dentro dos {} recebem os dados que vieram do front-end
  const { nome, dataAcesso } = req.body;

  //Se os dados que vieram do font-end forem em branco
  if (!nome || !dataAcesso) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  // Realiza a inserção dos dados recebidos no banco de dados
  const sql = 'INSERT INTO nomes (nome, dataAcesso) VALUES (?,?)';
  db.query(sql, [nome, dataAcesso], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Esse produto já está cadastrado' });
      }
      return res.status(500).json({ error: err.message });
    }

    // Em caso de sucesso encaminha uma mensagem e o id do produto
    res.status(201).json({ message: 'Produto cadastrado com sucesso', id: result.insertId });
  });
});

app.get('/nomes', (req, res) => {
  const sql = 'SELECT * FROM nomes';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});




app.post('/entrarAlunos', async (req, res) => {
  const { nome_alunos, datadenasc_alunos } = req.body;

  if (!nomeUsuario || senha) {
    return res.status(400).json({ error: 'Os campos nome do aluno e a data de nascimento são obrigatórios' });
  }

  try {
    // Query para buscar usuários com nome parecido
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE name LIKE ?', [`%${nome_alunos, datadenasc_alunos}%`]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});