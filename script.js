let player1 = "";
let player2 = "";
let turn = "";
let board = Array(9).fill("");
let winner = "";
let gameStarted = false;

function handleSubmit(e) {
  e.preventDefault();
  player1 = document.getElementById('player-1').value;
  player2 = document.getElementById('player-2').value;
  if (player1 && player2) {
    turn = player1;
    gameStarted = true;
    renderGame();
  }
}

function checkWinner(newBoard) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
      pattern.forEach(index => {
        document.getElementById(index + 1).style.backgroundColor = '#4B0082';
        document.getElementById(index + 1).style.color = '#fff';
      });
      return newBoard[a];
    }
  }
  return null;
}

function handleCellClick(index) {
  if (board[index] || winner) return;
  board[index] = turn === player1 ? 'X' : 'O';
  const gameWinner = checkWinner(board);
  if (gameWinner) {
    winner = turn;
  } else {
    turn = turn === player1 ? player2 : player1;
  }
  renderGame();
}

function renderGame() {
  const container = document.querySelector('.container');
  container.innerHTML = "";
  if (!gameStarted) {
    container.innerHTML = `
      <form onsubmit="handleSubmit(event)">
        <input id="player-1" type="text" placeholder="Player 1 Name" required />
        <input id="player-2" type="text" placeholder="Player 2 Name" required />
        <button id="submit" type="submit">Submit</button>
      </form>
    `;
  } else {
    container.innerHTML = `
      <h1>Tic Tac Toe</h1>
      <div class="message">
        ${winner ? `${winner}, congratulations you won!` : `${turn}, you're up`}
      </div>
      <div class="board">
        ${board.map((cell, index) => `
          <div id="${index + 1}" class="cell" onclick="handleCellClick(${index})">
            ${cell}
          </div>`).join('')}
      </div>
    `;
  }
}

window.onload = renderGame;
