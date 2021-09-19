import RLAgent from "./RL.js";
import { miniMaxDesicion } from "./minMax.js";
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
            //console.log('laastSa',lastState,'action',action)
            last[turn]={state:lastState,action:action}
            turn=(turn+1)%2
            //console.log(`Previus ${lastState}, currently ${rl.state}`)
            if(this.gameEnd(rl.state)){
                //actualizar el lookTable
                //console.log('lastState',lastState,'laaasStaate',last[(turn+1)%2].state,last[(turn+1)%2].action)
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
                [lastState,action] = miniMaxDesicion(rl.state,1)
                rl.state[action[0]]-=action[1]
            }
            //console.log('laastSa',lastState,'action',action)
            last[turn]={state:lastState,action:action}
            turn=(turn+1)%2
            //console.log(`Previus ${lastState}, currently ${rl.state}`)
            if(this.gameEnd(rl.state)){
                //actualizar el lookTable
                //console.log('lastState',lastState,'laaasStaate',last[(turn+1)%2].state,last[(turn+1)%2].action)
                rl.updateLookTable(lastState,action,1)
                rl.updateLookTable(last[turn].state,last[turn].action,-1)
                break;
            }else if (last[turn]){
                rl.update(last[turn].state,last[turn].action,rl.state,0)
            }
            
        }
    }

    train(strategy){
        const state = [2,3]
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
        
         console.log('lookTable',rl.lookTable)
    }
    
}



// 2,3 suc -> 1,3 0,3 *2,2* *2,1* 2,0
// 2,1 suc 



const m = new Main(1000)

//1 para jugar con Random
//2 para jugar con MiniMAx (aun no anda bien)
m.train(1)

