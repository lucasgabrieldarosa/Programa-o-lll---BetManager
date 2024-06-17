// Função para carregar e exibir o histórico de apostas
async function loadBetHistory() {
    try {
        const response = await fetch('/bet-history');
        if (response.ok) {
            const betHistory = await response.json();
            const betHistoryTable = document.getElementById('bet-history').querySelector('tbody');

            // Limpa a tabela antes de preencher os dados
            betHistoryTable.innerHTML = '';

            // Preenche a tabela com os dados do histórico de apostas
            betHistory.forEach(bet => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${bet.date}</td>
                    <td>${bet.team1}</td>
                    <td>${bet.team2}</td>
                    <td>${bet.odd}</td>
                    <td>${bet.amount}</td>
                    <td>${bet.betType}</td>
                    <td>${bet.betResult}</td>
                `;
                betHistoryTable.appendChild(row);
            });
        } else {
            console.error('Erro ao obter o histórico de apostas');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}
document.getElementById('searchButton').addEventListener('click', searchBetHistory);

// Função para pesquisar o histórico de apostas com base no filtro selecionado
async function searchBetHistory() {
    const filter = document.getElementById('date-filter').value;
    const url = `/bet-history?filter=${filter}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const betHistory = await response.json();
            const betHistoryTable = document.getElementById('bet-history').querySelector('tbody');

            // Limpa a tabela antes de preencher os dados
            betHistoryTable.innerHTML = '';

            // Preenche a tabela com os dados do histórico de apostas
            betHistory.forEach(bet => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${bet.date}</td>
                    <td>${bet.team1}</td>
                    <td>${bet.team2}</td>
                    <td>${bet.odd}</td>
                    <td>${bet.amount}</td>
                    <td>${bet.betType}</td>
                    <td>${bet.betResult}</td>
                `;
                betHistoryTable.appendChild(row);
            });
        } else {
            console.error('Erro ao obter o histórico de apostas');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Event listener para chamar a função loadBetHistory quando o DOM é carregado
document.addEventListener('DOMContentLoaded', loadBetHistory);
