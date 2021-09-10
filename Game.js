import AI from "./AI.js";

const init = (rows) => {
  // select the game class
  const game = document.getElementsByClassName("game")[0];
  // append buttons with "shrink-border" class
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i]; j++) {
      const button = document.createElement("button");
      button.innerHTML = "x";
      button.classList.add("shrink-border");
      button.id = `${i}-${j}`;
      game.appendChild(button);
    }
    game.appendChild(document.createElement("br"));
  }
};

const handleGameOver = (rows, turn) => {
  const sum = rows.reduce((a, b) => a + b, 0);
  let res = false;
  if (sum == 0) {
    res = true;
  }
//   console.log(rows, turn, res);
  if (res) {
    alert("game ended, The player " + (1 + turn) + " won");
  }
};

const getElementForRow = (row, col) => {
  const elements = document.querySelectorAll(`[id^="${row}-"]`);
  return elements;
};

class Game {
  aiTurn = 1;
  started = false;

  turn = 0;
  rowPlayed = -1;

  constructor(rows, mode='1v1') {
    this.rows = rows;
    this.mode = mode;
    if(mode != "1v1"){
      this.ai = new AI();
    }
  }

  take(row, count) {
    const elements = getElementForRow(row, this.rows[row]);
    this.rows[row] -= count;
    for (let i = 0; i < count; i++) {
      elements[i].remove();
    }
  }

  start() {
    init(this.rows);
    this.prepareButtonsClick();
    this.prepareNextTurn();
  }

  prepareNextTurn() {
    const handle1v1 = () => {
      this.started = true
      if (this.rowPlayed == -1) {
        alert("no row played");
      } else {
        this.turn = (this.turn + 1) % 2;
        this.rowPlayed = -1;
      }
      if (this.turn == 0) {
        document.getElementById("playerTurn").innerHTML = "Player 1 turns";
      } else {
        document.getElementById("playerTurn").innerHTML = "Player 2 turns";
      }
    };
    const handle1vAI = () => {
      this.started = true
      if (this.turn != this.aiTurn) {
        if (this.rowPlayed == -1) {
          alert("no row played");
        } else {
          this.turn = (this.turn + 1) % 2;
          this.rowPlayed = -1;
          document.getElementById("playerTurn").innerHTML = "IA turns";
        }
      } else {
        const { from, count } = this.ai.play(this.rows);
        // console.log(from, count);
        this.take(from, count);
        this.turn = (this.turn + 1) % 2;
        this.rowPlayed = -1;
        handleGameOver(this.rows, this.turn);
        document.getElementById("playerTurn").innerHTML = "Player turns";
      }
    };
    if (this.mode == "1v1") {
      document.getElementById("playerTurn").innerHTML = `Player ${1+this.turn} turns`;
      document.getElementById("nextTurn").addEventListener("click", handle1v1);
    } else {
      document.getElementById("playerTurn").innerHTML = this.aiTurn ?  "Player turns": "IA turns";
      document.getElementById("nextTurn").addEventListener("click", handle1vAI);
    }
  }

  prepareButtonsClick() {
    const buttons = document.getElementsByClassName("shrink-border");
    const handle1v1 = (event) => {
      const button = event.target;
      const id = button.id.split("-");
      const row = parseInt(id[0]);
      const col = parseInt(id[1]);
      if (row == this.rowPlayed || this.rowPlayed == -1) {
        this.rowPlayed = row;
        //delete this button
        button.remove();
        this.rows[row]--;
        // console.log(this.rows);
      }
      handleGameOver(this.rows, this.turn);
    };

    const handle1vAI = (event) => {
      const button = event.target;
      const id = button.id.split("-");
      const row = parseInt(id[0]);
      const col = parseInt(id[1]);
      if (
        this.aiTurn != this.turn &&
        (row == this.rowPlayed || this.rowPlayed == -1)
      ) {
        this.rowPlayed = row;
        //delete this button
        button.remove();
        this.rows[row]--;
        // console.log(this.rows);
      }
      handleGameOver(this.rows, this.turn);
    };

    for (let i = 0; i < buttons.length; i++) {
      if (this.mode == "1v1") {
        buttons[i].addEventListener("click", handle1v1);
      } else {
        buttons[i].addEventListener("click", handle1vAI);
      }
    }
  }
}
export default Game;