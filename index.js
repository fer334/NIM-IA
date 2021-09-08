import Game from "./Game.js";

const main = () => {
  const rows = [1, 3, 5, 7, 9];
  // initialize(rows)
  // modes = ['random', '1v1', 'hard']
  const game = new Game(rows, "1v1");
  game.start();
  // game.take(4,2);
  // game.start()
};

main();
