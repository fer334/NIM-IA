import Game from "./Game.js";


const startGame = (e) => {
  const mode = document.getElementById("mode").value;
  const n = document.getElementById('n').value;
  const k = document.getElementById('k').value;
  
  let m = "";
  if (mode == 1){
    m = "1v1";
  }else if (mode == 2){
    m = "random";
  }
  
  const game = new Game(m, n, k);
  game.start();

  // hide start button
  document.getElementById('start').style.display = 'none';
  // show restart button
  document.getElementById('restart').style.display = '';
}

const restartGame = (e) => {
  // hide game
  console.log('hoal');
  document.getElementsByClassName('cart-item-info')[0].style.display='none'
  const game = document.getElementsByClassName('game')[0]
  const gamediv = document.
  game.parentElement.append("<div class='game'></div>")
  game.parentElement.removeChild(game)
  //hide restart button
  document.getElementById('restart').style.display = 'none';
  // show start button
  document.getElementById('start').style.display = '';

  // startGame();
  document.getElementsByClassName('cart-item-info')[0].style.display=''



}


const main = () => {
  // initialize(rows)
  // modes = ['random', '1v1', 'hard']
  // game.take(4,2);
  // game.start()

  document.getElementById('start').addEventListener('click', startGame);
  document.getElementById('restart').addEventListener('click', restartGame);
  
};

main();
