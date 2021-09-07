const initialize=(rows)=>{
    // select the game class
    const game = document.getElementsByClassName('game')[0]
    // append buttons with "shrink-border" class
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i]; j++) {
            const button = document.createElement('button')
            button.innerHTML='x'
            button.classList.add('shrink-border')
            button.id=`${i}-${j}`
            game.appendChild(button)
        }
        game.appendChild(document.createElement('br'))
    }
}

const gameEnded=(rows)=>{
    sum = rows.reduce((a,b) => a+b, 0)
    if (sum==0){
        return true
    }
    return false
}



const main = () => {
    const rows = [1,3,5,7]

    initialize(rows);

    let turn = 0 // turns are 0 or 1
    let rowPlayed = -1;
    const buttons = document.getElementsByClassName('shrink-border')

    const handleClick = (event) => {
        const button = event.target
        const id = button.id.split('-')
        const row = parseInt(id[0])
        const col = parseInt(id[1])
        if (row==rowPlayed || rowPlayed==-1){
            rowPlayed=row
            //delete this button
            button.remove()
            rows[row]--
            console.log(rows);
        }
        if(gameEnded(rows)){
            alert('game ended, The'+' player '+(1+turn) + ' won')
        }
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', handleClick)
    }

    document.getElementById('nextTurn').addEventListener('click',() => {
        if (rowPlayed==-1){
            alert('no row played')
        }else{
            turn = (turn+1)%2
            rowPlayed = -1
        }

        if (turn==0){
            document.getElementById('playerTurn').innerHTML='Player 1 turns'
        } else {
            document.getElementById('playerTurn').innerHTML='Player 2 turns'
        }
    })

    // createEvents();

}

