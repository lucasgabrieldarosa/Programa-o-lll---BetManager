// Função para preencher as opções de seleção de times
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
        const option = document.createElement('option');
        option.text = team;
        team1Select.add(option.cloneNode(true));
        team2Select.add(option.cloneNode(true));
    });
}

// Função para adicionar uma aposta à tabela de resultados
function addBetToTable(event) {
    event.preventDefault(); // Evita que o formulário seja enviado

    // Obter os valores do formulário
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const odd = document.getElementById('odd').value;
    const amount = document.getElementById('amount').value;

    // Calcular o resultado da aposta
    const result = parseFloat(odd) * parseFloat(amount);

    // Criar uma nova linha na tabela de resultados
    const tableBody = document.querySelector('#results-table tbody');
    const newRow = tableBody.insertRow();

    // Inserir células com os valores da aposta e o resultado
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4); // Nova célula para o resultado

    // Preencher as células com os valores da aposta e o resultado
    cell1.textContent = team1;
    cell2.textContent = team2;
    cell3.textContent = odd;
    cell4.textContent = amount;
    cell5.textContent = result.toFixed(2); // Formata o resultado para exibir duas casas decimais
}

// Preencher as opções de seleção de times ao carregar a página
fillTeamOptions();

// Adicionar o evento de submissão do formulário
const betForm = document.getElementById('bet-form');
betForm.addEventListener('submit', addBetToTable);
