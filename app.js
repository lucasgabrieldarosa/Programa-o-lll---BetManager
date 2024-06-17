let totalProfit = 0;
let betData = [];
let barChartInitialized = false;
let barChart;

function fillTeamOptions() {
    const teamsData = [
        'Flamengo', 'Palmeiras', 'Atlético Mineiro', 'São Paulo', 'Fluminense',
        'Grêmio', 'Internacional', 'Athletico Paranaense', 'Corinthians', 'Cruzeiro',
        'Vasco da Gama', 'Botafogo', 'Santos', 'Bahia', 'Chapecoense', 'Sport Recife',
        'Fortaleza', 'Ceará', 'Goiás', 'Avaí'
    ];

    const team1Select = document.getElementById('team1');
    const team2Select = document.getElementById('team2');

    teamsData.forEach(team => {
        const option1 = document.createElement('option');
        option1.text = team;
        team1Select.add(option1);

        const option2 = document.createElement('option');
        option2.text = team;
        team2Select.add(option2);
    });
}

function updateBarChart() {
    if (!barChartInitialized) {
        const ctx = document.getElementById('bet-chart').getContext('2d');
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lucro Total'],
                datasets: [{
                    label: 'Lucro Total das Apostas',
                    data: [totalProfit],
                    backgroundColor: totalProfit >= 0 ? 'rgba(173, 255, 47, 1)' : 'rgba(255, 69, 0, 1)',
                    borderColor: totalProfit >= 0 ? 'rgba(173, 255, 47, 1)' : 'rgba(255, 69, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        barChartInitialized = true;
    } else {
        barChart.data.datasets[0].data[0] = totalProfit;
        barChart.data.datasets[0].backgroundColor = totalProfit >= 0 ? 'rgba(173, 255, 47, 1)' : 'rgba(255, 69, 0, 1)';
        barChart.data.datasets[0].borderColor = totalProfit >= 0 ? 'rgba(173, 255, 47, 1)' : 'rgba(255, 69, 0, 1)';
        barChart.update();
    }
}

async function addBetToTableAndChart(event) {
    event.preventDefault();

    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const odd = parseFloat(document.getElementById('odd').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const betType = document.getElementById('bet-type').value;
    const betResult = document.getElementById('bet-result').value;

    if (team1 === '' || team2 === '' || isNaN(odd) || isNaN(amount)) {
        alert('Por favor, preencha todos os campos antes de adicionar uma aposta.');
        return;
    }

    let result;
    if (betResult === 'green') {
        result = odd * amount;
    } else if (betResult === 'red') {
        result = -amount;
    }

    totalProfit += result;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${team1}</td>
        <td>${team2}</td>
        <td>${odd}</td>
        <td>${amount}</td>
        <td>${betType}</td>
        <td>${betResult}</td>
        <td>${totalProfit.toFixed(2)}</td>
    `;
    document.getElementById('results-table').querySelector('tbody').appendChild(newRow);

    betData.push({ team1, team2, result });

    try {
        const response = await fetch('/add-bet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'usuario',
                team1,
                team2,
                odd,
                amount,
                bet_type: betType,
                bet_result: betResult,
                profit: result
            })
        });

        if (response.ok) {
            console.log('Aposta adicionada com sucesso!');
        } else {
            console.error('Erro ao adicionar aposta');
        }
    } catch (error) {
        console.error('Erro:', error);
    }

    updateBarChart(); // Atualizar o gráfico após adicionar uma nova aposta
}

document.getElementById('bet-form').addEventListener('submit', addBetToTableAndChart);
document.addEventListener('DOMContentLoaded', fillTeamOptions);
