const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3010;

// Configuração do pool de conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'betmanager',
  password: 'postgres',
  port: 5432,
});

app.use(bodyParser.json());

// Rota para obter o histórico de apostas com base nos critérios de filtragem
app.get('/bet-history', async (req, res) => {
    try {
      let query = `
        SELECT *
        FROM bets
      `;
  
      // Verifica se o parâmetro de consulta 'filter' está presente na solicitação
      if (req.query.filter) {
        const filter = req.query.filter;
  
        // Aplica o filtro correspondente com base no valor do parâmetro 'filter'
        switch (filter) {
          case 'daily':
            query += ` WHERE bet_date >= current_date `;
            break;
          case 'weekly':
            query += ` WHERE bet_date >= current_date - interval '7 days' `;
            break;
          case 'monthly':
            query += ` WHERE bet_date >= date_trunc('month', current_date) `;
            break;
          default:
            break;
        }
      }
  
      // Execute a consulta no banco de dados
      const { rows } = await pool.query(query);
  
      // Envie os dados de volta como uma resposta JSON
      res.json(rows);
    } catch (error) {
      console.error('Erro ao obter o histórico de apostas:', error);
      res.status(500).json({ error: 'Erro ao obter o histórico de apostas' });
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post('/add-bet', async (req, res) => {
  try {
      const { team1, team2, odd, amount, bet_type, bet_result, profit } = req.body;

      // Aqui você pode adicionar a lógica para inserir os dados da aposta no banco de dados
      // Por exemplo, você pode executar uma consulta SQL de inserção usando o pool de conexão
      
      // Exemplo de consulta SQL de inserção usando o pool de conexão
      const query = `
          INSERT INTO bets (team1, team2, odd, amount, bet_type, bet_result, profit)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const values = [team1, team2, odd, amount, bet_type, bet_result, profit];
      await pool.query(query, values);

      res.status(200).json({ message: 'Aposta adicionada com sucesso!' });
  } catch (error) {
      console.error('Erro ao adicionar aposta:', error);
      res.status(500).json({ error: 'Erro ao adicionar aposta' });
  }
});
