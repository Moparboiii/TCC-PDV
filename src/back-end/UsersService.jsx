const express = require('express');
const cors = require('cors'); // Importe o módulo cors, preciso usar esssa porra pra acessar diferentes urls entre o APP e a API
const bodyParser = require('body-parser');
const connection = require('./db.jsx');
const bcrypt = require('bcrypt')

const app = express();
const port = 5001; // Escolha uma porta para o servidor

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Rota para consultar todos os usuários
app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro na consulta:', err);
            res.status(500).json({ error: 'Erro ao retornar os usuários.' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(404).json({ error: 'Não foram encontrados usuários.' });
            }
        }
    });
});

// Rota para consultar um usuário pelo ID
app.get('/usuario/:id', (req, res) => {
    const userId = req.params.id;
    connection.query(`SELECT * FROM usuarios WHERE id_usuario = ?`, [userId], (err, result) => {
        if (err) {
            console.error('Erro na consulta:', err);
            res.status(500).json({ error: 'Erro ao buscar o usuário.' });
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        }
    });
});

// Rota para deletar um produto pelo ID
app.delete('/usuario/:id', (req, res) => {
    const userId = req.params.id;
    connection.query(`DELETE FROM usuarios WHERE id_usuario = ?`, [userId], (err, result) => {
        if (err) {
            console.error('Erro na consulta:', err);
            res.status(500).json({ error: 'Erro ao deletar o usuário.' });
        } else {
            res.status(204).json({ mensagem: 'Usuário deletado com suceddo.' });
        }
    });
});

// Rota para atualizar um usuario pelo ID
app.put('/usuario/:id', (req, res) => {
    const userId = req.params.id;
    const { email, senha } = req.body;
    bcrypt.hash(senha, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            return res.status(500).send({ error: errBcrypt })
        }
        connection.query(`UPDATE usuarios SET email = ?, senha = ? WHERE id_usuario = ?`, [email, hash, userId], (err, result) => {
            if (err) {
                console.error('Erro na consulta:', err);
                res.status(500).json({ error: 'Erro ao atualizar o usuario.' });
            } else {
                if (result.affectedRows > 0) {
                    res.status(200).json({ mensagem: 'Usuario atualizado com sucesso.' });
                } else {
                    res.status(404).json({ error: 'Usuario não encontrado.' });
                }
            }
        }
        );
    });
})


// Rota para cadastrar um usuário
app.post('/cadUsuario', (req, res) => {
    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            return res.status(500).send({ error: errBcrypt })
        }
        connection.query(`INSERT INTO usuarios (email, senha) VALUES (?, ?)`, [req.body.email, hash], (error, results) => {
            if (error) {
                return res.status(500).send({ error: error })
            }
            response = {
                mensagem: 'Usuário cadastrado com sucesso',
                usuarioCriado: {
                    id_usuario: req.body.id,
                    email: req.body.email,
                    senha: hash
                }
            }
            return res.status(201).send(response)
        })
    })
})

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}.`);
});