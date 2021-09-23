import Game from "./Game.js";
import { depthMax } from "./src/global.js";
import {MainPoda} from "./src/main.js";
import {MainMiniMax} from "./src/main.js";

const startGame = (e) => {
  const mode = document.getElementById("mode").value;
  const n = document.getElementById('n').value;
  const k = document.getElementById('k').value;
  const N = document.getElementById('N').value;
  const first_move = document.getElementById('first_move').value;
  const maxDepth  = document.getElementById('maxDepth').value;
  
  let m = "";
  if (mode == 1){
    m = "1v1";
  }else if (mode == 2){
    m = "random";
  }else if (mode == 3){
    m = "rl-random"
  }else if (mode == 4){
    m = "rl-minimax"
  }else if (mode == 5){
    m = "minimax"
  }

  const game = new Game(m, n, k, first_move, N, maxDepth);
  game.start();

  // hide start button
  document.getElementById('start').style.display = 'none';
  // show restart button
  document.getElementById('restart').style.display = '';
}

const restartGame = (e) => {
  // reload page
  window.location.reload()
}
const minAndPoda=(state,depthMin,depthPoda)=>{
    let min=new MainMiniMax(state,depthMin)
    let mainVector=min.play() //0->time; 1->amount
    let minPoda=new MainPoda(state,depthPoda)
    let podaVector=min.play()
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
