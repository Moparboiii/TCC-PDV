const express = require('express');
const cors = require('cors'); // Importe o módulo cors, preciso usar esssa porra pra acessar diferentes urls entre o APP e a API
const bodyParser = require('body-parser');
const connection = require('./db.jsx');

const app = express();
const port = 5000; // Escolha uma porta para o servidor

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Consultando todos os dados da tabela de produtos
connection.query('SELECT * FROM produtos', (err, results) => {
  if (err) {
    console.error('Erro ao executar a consulta:', err);
  } else {
    console.log('Registros encontrados:', results);
  }
});

// Rota para consultar um produto pelo ID
app.get('/produto/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM produtos WHERE id_produto = ?'; // Supondo que sua tabela se chame "produtos"

  connection.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).json({ error: 'Erro ao buscar o produto.' });
    } else {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
      }
    }
  });
});


// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}.`);
});
