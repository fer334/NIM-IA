import Game from "./Game.js";
import { generateRows } from "./Game.js";
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
  //show next turn button
  document.getElementById('nextTurn').style.display = '';
}

const restartGame = (e) => {
  // reload page
  window.location.reload()
}

const simGen = () => {
  const container = document.getElementById('sim-container');
  // create a table
  const table = document.createElement('table');
  table.setAttribute('id', 'table');
  table.classList.add('table');
  container.appendChild(table);
  
  const n = document.getElementById('cn').value;
  const k = document.getElementById('ck').value;

  // const [n,k]=[6,4]
  const game = new Game(0, n, k, 0, 0, 0);
  const state = game.rows;
  document.getElementById('state').innerHTML += 'State: '+ JSON.stringify(game.rows);
  console.log(n,k,state)

  table.innerHTML=`
  <tr>
      <th>N</th><th>Metrica</th><th>MiniMax</th><th>Alpha-Beta prunning</th>
  </tr>`
  
  for (let i = 2; i < 6; i++) {
    
    let min = new MainMiniMax(state,i)
    const [minTime, minAmount]=min.play()
    let poda = new MainPoda(state,i)
    const [podaTime, podaAmount]=poda.play()
    table.innerHTML+=`
    <tr>
        <td rowspan="2" style="vertical-align:middle">${i}</td>
        <td>Expanded Nodes</td>
        <td>${minAmount}</td>
        <td>${podaAmount}</td>
    </tr>
    <tr>
        <td>Time</td>
        <td>${minTime}ms</td>
        <td>${podaTime}ms</td>
    </tr>
    `
  }
}

const simSpec = (d1, d2) => {

  const n = document.getElementById('cn').value;
  const k = document.getElementById('ck').value;
  const state = generateRows(n, k);

  const container = document.getElementById('sim-container');
  let min = new MainMiniMax(state,d1)
  const [minTime, minAmount]=min.play()
  let poda = new MainPoda(state,d2)
  const [podaTime, podaAmount]=poda.play()
  
  document.getElementById('state').innerHTML += 'State: '+ JSON.stringify(state);

  container.innerHTML+=`<h6>MiniMax. The time it takes in milliseconds is ${minTime}</h6>`
  container.innerHTML+=`<h6>MiniMax. Number of nodes expanded is ${minAmount}</h6>`
  container.innerHTML+=`<h6>Alpha Beta Prunning. The time it takes in milliseconds is ${podaTime}</h6>`
  container.innerHTML+=`<h6>Alpha Beta Prunning. Number of nodes expanded is ${podaAmount}</h6>`
}

const sim = () => {
  const d1 = document.getElementById('d1').value;
  const d2 = document.getElementById('d2').value;
  document.getElementById('crestart').style.display = '';
  document.getElementById('sim').style.display = 'none';
  if (d1 && d2) {
    console.log('hola');
    simSpec(d1, d2);
  }else{
    simGen()
  }
}


const main = () => {
  // initialize(rows)
  // modes = ['random', '1v1', 'hard']
  // game.take(4,2);
  // game.start()

  document.getElementById('start').addEventListener('click', startGame);
  document.getElementById('restart').addEventListener('click', restartGame);
  document.getElementById('crestart').addEventListener('click', restartGame);
  document.getElementById('sim').addEventListener('click', sim);
  
};

main();
