const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',       // Substitua pelo host do seu banco de dados
  user: 'root',     // Substitua pelo usuário do seu banco de dados
  password: 'root123',   // Substitua pela senha do seu banco de dados
  database: 'mercadinho',   // Substitua pelo nome do seu banco de dados
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão ao banco de dados estabelecida.');
  }
});

module.exports = connection;
