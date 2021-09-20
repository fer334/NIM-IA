import RLAgent from "./RL.js";
import { miniMaxDesicion,amountMiniMax } from "./minMax.js";
import {miniMaxDesicionPoda,amountPoda} from "./Poda.js"

// import prompt from "prompt-sync"


let gameState=[2,3,1,5]
// let inputText=prompt(({sigint: true}))
class Main{
    
    constructor(N){
        this.N=N
    }
    gameEnd(state){
        return state.every((i)=>i==0)
    }

    jugarVsRandom(initialState, rl,start){
        rl.state = [...initialState]
        let turn=start
        let last={
            1:undefined,
            0:undefined
        }
        let lastState
        let action
        while(true){
            if(turn) {
                [lastState,action] = rl.play()
            }
            else [lastState,action] = rl.playDiversity()
            last[turn]={state:lastState,action:action}
            turn=(turn+1)%2
            if(this.gameEnd(rl.state)){
                rl.updateLookTable(lastState,action,1)
                rl.updateLookTable(last[turn].state,last[turn].action,-1)
                break;
            }else if (last[turn]){
                rl.update(last[turn].state,last[turn].action,rl.state,0)
            }
            
        }
    }
    jugarVsMiniMax(initialState, rl,start){
        rl.state = [...initialState]
        let turn=start
        let last={
            1:undefined,
            0:undefined
        }
        let lastState
        let action
        while(true){
            if(turn) {
                [lastState,action] = rl.play()
            }
            else{
                [lastState,action] = miniMaxDesicion([...rl.state],1)
                rl.state[action[0]]-=action[1]
            }
            last[turn]={state:lastState,action:action}
            turn=(turn+1)%2
            if(this.gameEnd(rl.state)){
                rl.update(lastState,action,rl.state,1)
                rl.update(last[turn].state,last[turn].action,rl.state,-1)
                break;
            }else if (last[turn]){
                rl.update(last[turn].state,last[turn].action,rl.state,0)
            }
        }
    }

    train(strategy){
        console.log("Training...")
        const state = [...gameState]
        const rl = new RLAgent(0.7, 0.5, state)
        let start=1
        if(strategy==1){
            for (let i = 0; i < this.N; i++) {
                const initialState = [...state]
                this.jugarVsRandom(initialState,rl,start)
            }
        }else if( strategy==2){
            for (let i = 0; i < this.N; i++) {
                const initialState = [...state]
                this.jugarVsMiniMax(initialState,rl,start)
            }
        }
        return rl
    }
    
}
class MainMiniMax{
    constructor(initialState,depth=2){
        this.initialState=initialState
        this.depthMax=depth
    }
    play(){
        let start= new Date().getTime() //Tiempo de inicio del algoritmo
        let [state,action]=miniMaxDesicion(this.initialState,1,this.depthMax)
        let end= new Date().getTime() // Tiempo que termina el algoritmo
        let time=end-start
        console.log(`La jugada a tomar es  [${state}][${action}]`)
        console.log(`El Tiempo que tarda en milisegundos  es`,time)
        console.log(`Cantidade de nodos expandidos`,amountMiniMax)
    }
}
class MainPoda{

    constructor(initialState,depth=2){
        this.initialState=initialState
        this.depthMax=depth
    }

    play(){
        let start= new Date().getTime() //Tiempo de inicio del algoritmo
        let[state,action]=miniMaxDesicionPoda(this.initialState,1,this.depthMax)
        let end= new Date().getTime() // Tiempo que termina el algoritmo
        let time=end-start
        console.log(`La jugada a tomar es  [${state}][${action}]`)
        console.log(`El Tiempo que tarda en milisegundos  es`,time)
        console.log(`Cantidade de nodos expandidos`,amountPoda)
    }
}



let option=2
//1-- RL
//2--MiniMax
//3--MiniMax con Poda
if (option==1){
    const m = new Main(10000)
    //1 para jugar con Random
    //2 para jugar con MiniMAx (aun no anda bien)
    let rlPlayer=m.train(2)
    console.log(rlPlayer.lookTable)
    
}else if(option==2){
    const m = new MainMiniMax(gameState,4)
    m.play()
}
else if(option==3){
    const m = new MainPoda(gameState,4)
    m.play()
}

/*
let Game=[...gameState]
let turn=1
let winner
console.log("Gamee",Game)
console.l
while(!m.gameEnd(Game)){
    winner=turn
    if(turn==1){
        let action = inputText(`Es tu turno, El estado de la Pila es ${Game}:  `);
        action=action.split(',').map((item)=>Number(item))
        Game[action[0]]-=action[1]
    }else{
        rlPlayer.state=[...Game]
        rlPlayer.play(true)
        Game=[...rlPlayer.state]
    }
    turn=(turn+1)%2
}
winner ? console.log("Gano el Humano") : console.log("Gano la computadora")

    */

export default Main;