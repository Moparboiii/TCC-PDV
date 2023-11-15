const express = require('express');
const cors = require('cors'); // Importe o módulo cors, preciso usar esssa porra pra acessar diferentes urls entre o APP e a API
const bodyParser = require('body-parser');
const connection = require('./db.jsx');

const app = express();
const port = 6000; // Escolha uma porta para o servidor

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.post('/registrar-venda', (req, res) => {
    const { itens, valorTotal, dataHora } = req.body;

    // Primeiro, insira os dados da venda na tabela de vendas
    connection.query('INSERT INTO vendas (data_hora, valor_total) VALUES (?, ?)', [dataHora, valorTotal], (err, result) => {
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

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}.`);
  });
