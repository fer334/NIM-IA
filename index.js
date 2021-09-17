import Game from "./Game.js";


const startGame = (e) => {
  const rows = [1, 3, 5, 7, 9];
  const mode = document.getElementById("mode").value;
  let m = "";

  if (mode == 1){
    m = "1v1";
  }else if (mode == 2){
    m = "random";
  }
  
  const game = new Game(rows, m);
  game.start();

  // hide options div
  e.target.parentElement.style.display = 'none';
}

const main = () => {
  // initialize(rows)
  // modes = ['random', '1v1', 'hard']
  // game.take(4,2);
  // game.start()

  document.getElementById('start').addEventListener('click', startGame);
};

main();
