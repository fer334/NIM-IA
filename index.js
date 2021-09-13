import Game from "./Game.js";


const startGame = (e) => {
  const rows = [1, 3, 5, 7, 9];
  const mode = document.getElementById("mode").value;
  if (mode == 1){
    const game = new Game(rows, '1v1');
    game.start();
  }else if (mode == 2){
    const game = new Game(rows, 'random');
    game.start();
  }
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
