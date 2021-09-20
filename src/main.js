import RLAgent from "./RL.js";
import { miniMaxDesicion } from "./minMax.js";

// import prompt from "prompt-sync"


let gameState=[2,3,1,4,5]
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




// console.log("Entrenaandooooo")
// const m = new Main(10000)
// console.log("Horaa de Jugar")
// //1 para jugar con Random
// //2 para jugar con MiniMAx (aun no anda bien)
// let rlPlayer=m.train(2)
// console.log(rlPlayer.lookTable)

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