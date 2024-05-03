const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'brasileirao2024',
    password: 'postgres',
    port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));

client.connect();

// Rota para exibir o formulário HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para processar o envio do formulário
app.post('/addBet', (req, res) => {
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const odd = parseFloat(req.body.odd);
    const amount = parseFloat(req.body.amount); // Novo campo para o valor da aposta

    // Inserir os dados da aposta no banco de dados
    const query = 'INSERT INTO apostas (time1, time2, odd, amount) VALUES ($1, $2, $3, $4)';
    const values = [team1, team2, odd, amount];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir aposta:', err.stack);
            res.status(500).send('Erro ao inserir aposta');
        } else {
            console.log('Aposta adicionada com sucesso');
            res.send('Aposta adicionada com sucesso');
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
