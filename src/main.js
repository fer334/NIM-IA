import RLAgent from "./RL.js";

class Main{
    
    constructor(N){
        this.N=N
    }

    jugarVsRandom(initialState){

        let state = [...initialState]
        const rl = new RLAgent(0.1, 0.1, state)
        let turn=1
        while(true){
            if(gameEnd()){
                //actualizar el lookTable
                break;
            }
            rl.setState = state
            // rl.updateAlpha(this.N-i, this.N)
            if(turn) state = rl.play(state)
            else state = rl.playDiversity(state)
            turn=(turn+1)%2
        }

        if(turn == 1)
            rl.win()
        else
            rl.loose()

    }
    jugarVsMiniMax(){
        
    }

    train(){
        for (let i = 0; i < this.N; i++) {
            
            
        }
    }
    
}


m = Main(10)