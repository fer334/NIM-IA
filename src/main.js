import RLAgent from "./RL.js";

class Main{
    
    constructor(N){
        this.N=N
    }
    gameEnd(state){
        
        return state.every((i)=>i==0)
    }

    jugarVsRandom(initialState, rl){

        let state = [...initialState]
        rl.state = state
        let turn=1
        let lastState
        while(true){
            // console.log(`Jugada: ${state}`);
            if(this.gameEnd(state)){
                //actualizar el lookTable
                if(turn == 0)
                    rl.lose(lastState)
                else    
                    rl.win(state) ///0.0
                break;
            }
            // rl.updateAlpha(this.N-i, this.N)
            lastState = [...state]
            if(turn) state = rl.play()
            else state = rl.playDiversity()
            state = rl.state
            turn=(turn+1)%2
        }
        // console.log('gano', turn)
        

    }
    jugarVsMiniMax(){
        
    }

    train(){
        const state = [2,3]
        const rl = new RLAgent(0.1, 0.1, state)
        
        for (let i = 0; i < this.N; i++) {
            const initialState = [...state]
            rl.updateAlpha(i,this.N)
            this.jugarVsRandom(initialState,rl)
        }
         console.log(rl.lookTable)
    }
    
}


const m = new Main(100000)
m.train()

