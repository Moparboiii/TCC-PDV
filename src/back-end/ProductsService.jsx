const express = require('express');
const cors = require('cors'); // Importe o módulo cors, preciso usar esssa porra pra acessar diferentes urls entre o APP e a API
const bodyParser = require('body-parser');
const connection = require('./db.jsx');

const app = express();
const port = 5000; // Escolha uma porta para o servidor

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Rota para consultar todos os produtos
app.get('/produtos', (req, res) => {
  connection.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).json({ error: 'Erro ao buscar os produtos.' });
    } else {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ error: 'Produtos não encontrados.' });
      }
    }
  });
});

// Rota para consultar um produto pelo ID
app.get('/produto/:id', (req, res) => {
  const productId = req.params.id;
  connection.query(`SELECT * FROM produtos WHERE id_produto = ?`, [productId], (err, result) => {
    if (err) {
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

// Rota para deletar um produto pelo ID
app.delete('/produto/:id', (req, res) => {
  const productId = req.params.id;
  connection.query(`DELETE FROM produtos WHERE id_produto = ?`, [productId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao deletar o produto.' });
    } else {
      res.status(204).json({ mensagem: 'Produto deletado com sucesso.' });
    }
  });
});

// Rota para atualizar um produto pelo ID
app.put('/produto/:id', (req, res) => {
  const productId = req.params.id;
  const { nome, preco, quantidade } = req.body;

  connection.query(`UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id_produto = ?`, [nome, preco, quantidade, productId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });
      } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
      }
    }
  }
  );
});


// Cadastrar um produto
app.post('/cadProduto', (req, res) => {
  connection.query(`INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)`, [req.body.nome, req.body.preco, req.body.quantidade], (error, results) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    response = {
      mensagem: 'Produto cadastrado com sucesso',
      produtoCriado: {
        id_produto: results.insertId,
        nome: req.body.nome,
        preco: req.body.preco,
        quantidade: req.body.quantidade
      }
    }
    return res.status(201).send(response)
  })
})

app.post('/registrar-venda', (req, res) => {
  const { itens, data_hora, valor_total } = req.body;

  // Primeiro, insira os dados da venda na tabela de vendas
  connection.query('INSERT INTO vendas (data_hora, valor_total) VALUES (?, ?)', [data_hora, valor_total], (err, result) => {
    if (err) {
      console.error('Erro ao registrar a venda:', err);
      res.status(500).json({ error: 'Erro ao registrar a venda.' });
    } else {
      const idVenda = result.insertId;

      // Em seguida, insira os itens vendidos na tabela de itens_vendidos
      const values = itens.map((item) => [idVenda, item.id_produto, item.quantidade]);
      connection.query('INSERT INTO itens_vendidos (id_venda, id_produto, quantidade) VALUES ?', [values], (err, result) => {
        if (err) {
          console.error('Erro ao registrar os itens vendidos:', err);
          res.status(500).json({ error: 'Erro ao registrar os itens vendidos.' });
        } else {
          res.status(201).json('Venda registrada com sucesso.');
        }
      }
      );
    }
  }
  );
});

// Rota para consultar todos as vendas
app.get('/vendidos', (req, res) => {
  connection.query('SELECT * FROM vendas', (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).json({ error: 'Erro ao buscar as vendas.' });
    } else {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ error: 'Nenhuma Venda Encontrada.' });
      }
    }
  });
});

// Rota para consultar uma venda pelo ID
app.get('/vendidosById/:id', (req, res) => {
  const productId = req.params.id;

  const query = `
  SELECT itens_vendidos.id_produto, produtos.nome, produtos.preco, itens_vendidos.quantidade
  FROM itens_vendidos
  JOIN produtos ON itens_vendidos.id_produto = produtos.id_produto
  WHERE itens_vendidos.id_venda = ?;
`;

  connection.query(query, [productId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar o pedido.' });
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Pedido não encontrado.' });
      }
    }
  });
});


// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}.`);
});
