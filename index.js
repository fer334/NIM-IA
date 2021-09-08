import Game from './Game.js'



const main = () => {
    const rows = [1,3,5,7,9]
    // initialize(rows)
    const game = new Game(rows);
    game.start();
    game.take(4,2);
    console.log('hola');
    // game.start()

}

main()

