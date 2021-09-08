const init = (rows) => {
    // select the game class
    const game = document.getElementsByClassName('game')[0];
    // append buttons with "shrink-border" class
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i]; j++) {
            const button = document.createElement('button');
            button.innerHTML = 'x';
            button.classList.add('shrink-border');
            button.id = `${i}-${j}`;
            game.appendChild(button);
        }
        game.appendChild(document.createElement('br'));
    }
};

const gameEnded = (rows)=>{
    const sum = rows.reduce((a,b) => a+b, 0)
    if (sum==0){
        return true
    }
    return false
}

const getElementForRow = (row,col)=>{
    const elements = []
    for(let i=0; i < col; i++){
        elements.push(document.getElementById(`${row}-${i}`))
    }
    return elements
} 


class Game {
    constructor(rows) {
        this.rows = rows;
        this.turn = 0;
        this.rowPlayed = -1;
    }

    take(row, count){
        const elements = getElementForRow(row, this.rows[row]);
        this.rows[row]-=count;
        for(let i=0; i<count; i++){
            elements[i].remove();
        }


    }

    start() {

        init(this.rows);
        this.prepareButtonsClick();
        this.prepareNextTurn();
    }

    prepareNextTurn() {
        document.getElementById('nextTurn').addEventListener('click', () => {
            if (this.rowPlayed == -1) {
                alert('no row played');
            }
            else {
                this.turn = (this.turn + 1) % 2;
                this.rowPlayed = -1;
            }
            if (this.turn == 0) {
                document.getElementById('playerTurn').innerHTML = 'Player 1 turns';
            }
            else {
                document.getElementById('playerTurn').innerHTML = 'Player 2 turns';
            }
        });
    }

    prepareButtonsClick() {
        const buttons = document.getElementsByClassName('shrink-border');
        const handleClick = (event) => {
            const button = event.target;
            const id = button.id.split('-');
            const row = parseInt(id[0]);
            const col = parseInt(id[1]);
            if (row == this.rowPlayed || this.rowPlayed == -1) {
                this.rowPlayed = row;
                //delete this button
                button.remove();
                this.rows[row]--;
                console.log(this.rows);
            }
            if (gameEnded(this.rows)) {
                alert('game ended, The player ' + (1 + this.turn) + ' won');
            }
        };
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', handleClick);
        }
    }
}
export default Game;