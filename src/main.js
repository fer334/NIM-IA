import RLAgent from "./RL.js";
import { miniMaxDesicion,amountMiniMax } from "./minMax.js";
import {miniMaxDesicionPoda,amountPoda} from "./Poda.js"

// import prompt from "prompt-sync"


let gameState=[2,3,1,5,5,1,3,2]
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

    train(strategy,maxDepth=3){
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
                this.jugarVsMiniMax(initialState,rl,start,maxDepth)
            }
        }
        return rl
    }
    winner(game,rl){
        let turn=0
        let lastState=[...rl.state]
        let w
        let gameAxu=[...game]
        while(!this.gameEnd(gameAxu)){
            w=turn
            if(turn==0){
                rl.state=[...gameAxu]
                let [state,action]=rl.play(true)
                gameAxu[action[0]]-=action[1]
                rl.state=[...lastState]
                //console.log("GanoIA")
            }else{
                rl.state=[...gameAxu]
                let [state,action]=rl.playDiversity()
                gameAxu[action[0]]-=action[1]
                rl.state=[...lastState]
            }
            turn=(turn+1)%2
        }
        return w
    }

    testRandom(rl,strategy=1){
        console.log("Testiing...")
        const state = [...gameState]
        let winners=[0,0]
        if(strategy==1){
            for (let i = 0; i < this.N; i++) {
                let w=this.winner(state,rl)
                winners[w]+=1
            }
        }else if( strategy==2){
            for (let i = 0; i < this.N; i++) {
                const initialState = [...state]
                this.jugarVsMiniMax(initialState,rl,start,maxDepth)
            }
        }
        console.log(`La IA gano ${winners[0]} veces, random gano ${winners[1]} veces`)
    }
}
class MainMiniMax{
    constructor(initialState,depth=2){
        this.initialState=initialState
        this.depthMax=depth
    }
    play(){
        let start= console.time("timeMin") //Tiempo de inicio del algoritmo//Tiempo de inicio del algoritmo
        let [state,action]=miniMaxDesicion(this.initialState,1,this.depthMax)
        let end= console.timeEnd("timeMin") // Tiempo que termina el algoritmo
        let time=end-start
        console.log(`La jugada a tomar es  [${state}][${action}]`)
        //onsole.log(`El Tiempo que tarda en milisegundos  es`,time)
        console.log(`Cantidade de nodos expandidos`,amountMiniMax)
    }
}
class MainPoda{

    constructor(initialState,depth=2){
        this.initialState=initialState
        this.depthMax=depth
    }

    play(){
        let start= console.time("timePoda") //Tiempo de inicio del algoritmo
        let[state,action]=miniMaxDesicionPoda(this.initialState,1,this.depthMax)
        let end= console.timeEnd("timePoda") // Tiempo que termina el algoritmo
        let time=end-start
        console.log(`La jugada a tomar es  [${state}][${action}]`)
        //console.log(`El Tiempo que tarda en milisegundos  es`,time)
        console.log(`Cantidade de nodos expandidos`,amountPoda)
    }
}



let option=1
//1-- RL
//2--MiniMax
//3--MiniMax con Poda
if (option==1){
    const m = new Main(300000)
    //1 para jugar con Random
    //2 para jugar con MiniMAx (aun no anda bien)
    console.log("Entrenandoo")
    let rlPlayer=m.train(1)
    console.log("Testeando")
    m.testRandom(rlPlayer)
    //console.log(rlPlayer.lookTable)
    
}else if(option==2){
    const m = new MainMiniMax(gameState,3)
    m.play()
}
else if(option==3){
    const m = new MainPoda(gameState,3)
    m.play()
}
/*
const m = new MainMiniMax(gameState,5)
m.play()
const m2 = new MainPoda(gameState,5)
m2.play()
*/
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