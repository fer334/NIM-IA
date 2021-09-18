

const iswin = (state) =>{ return state?.every(x => x === 0)};
const islose = (state) => state.filter(x=>x!==0).length==1 //0.0,5,0  1=1

class RLAgent{
    isTrain = true

    constructor(qRate, alpha, initialState){
        this.lookTable = [];
        this.qRate = qRate;
        this.alpha = alpha;
        this.state=initialState;
    }
    
    updateAlpha(currentGame,N){
        this.alpha = 1 - 0.99 * currentGame / N;
    }

    // play random
    playDiversity(){
        const succesors = this.getSucesors(); 
        const random = Math.floor(Math.random() * succesors.length)
        const action = succesors[random]
        
        //actualizamos el lookTable?
        const newState = [...this.state]
        newState[action[0]] -= action[1];
        console.log(`New State ${newState} from action ${action} state ${this.state}`)
        this.state = [...newState]
        this.action = [...action]
        return newState;
    }

    calculateReward(state,action){
        // 1---Ganas
        // 0--- Perdes
        let reward = 0;
        let newState=[...state]
        newState[action[0]]-=action[1]
        if (iswin(newState)) {
            // console.log('gano')
            reward = 1
        }else{
            const stateKey = JSON.stringify(state)+JSON.stringify(action);
            //console.log(`LookTable ${this.lookTable[stateKey]}`,isNaN(this.lookTable[stateKey]))
            if (isNaN(this.lookTable[stateKey])){
                //console.log("Heeer")
                this.lookTable[stateKey] = 0;
                reward = this.lookTable[stateKey];
                //!reward && (console.log(`StateKey ${stateKey}`))
            }else{
                reward=this.lookTable[stateKey]
            }
        }
        // console.log('reward',reward);
        return reward;
    }
    
    getSucesors(){
        // [1,2,3,4]=>[1,1,2,1,2,3,1,2,3,4] 
        const succesors = []
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 1; j <= this.state[i]; j++) { 
                succesors.push([i,j])
            }
        }
        // console.log('state',this.state,'succesors',succesors);
        return succesors
    }
    
    playElitist(){
        let maxReward = -999;
        let bestState=[];
        let bestAction=[];
        let succesors = this.getSucesors()
        // console.log('succesors',succesors);
        const lastState = [...this.state]

        for (let s of succesors){
            const newState = [...this.state]   //[2,3,4] ==>[1,3,4],[0,3,4]
            // console.log('s',s);
            newState[s[0]] -= s[1]
        
            const reward = this.calculateReward(lastState,s);
            if (reward > maxReward) {
                maxReward = reward;
                bestState = [...newState];
                bestAction = [...s];
            }
        }
        // reward==1 ? console.log("Gane") : console.log("Perdi")
        // play
        this.state = [...bestState]
        this.action = [...bestAction]
        
        if (this.isTrain){
            this.updateLookTable(lastState, bestAction, maxReward)
        }

        // console.log('bestState',bestState);
        // console.log('looktable',this.lookTable);
        return bestState;
    }

    updateLookTable(state, action, reward){  
        // vi=vi+alpha(vsgte-vi)   
        let prob = this.calculateReward(state,action)
        //console.log(`prob ${prob} aplha ${this.alpha} reward ${reward} state ${state}`)
        prob = prob + this.alpha * (reward - prob);

        const key = JSON.stringify(state)+JSON.stringify(action)
        //console.log("Prob",prob)
        this.lookTable[key] = prob

    }

    play(){
        // 0.1 - 0.9
        const q = Math.random()
        if (q <= this.qRate){
            this.playElitist()
        }else{
            this.playDiversity()
        }
    }

    lose(state){
        const key = JSON.stringify(state) + JSON.stringify(this.action)
        this.lookTable[key] = -1
    }

    win(state){
        const key = JSON.stringify(state) + JSON.stringify(this.action)
        this.lookTable[key] = 1 
    }
}
export default RLAgent;
const state = [2,3,1,4]
const rl = new RLAgent( 0.1, 0.1, state);
//console.log(`Inicial: ${state}`)
//console.log(rl.getSucesors([0,3,1,4]))
///rl.lookTable['[2,2,1,4]'] = 1
//console.log('Aleatorio:',rl.playDiversity())
//console.log('Greedy:',rl.playElitist())

// state = rl.play()
// minimaxjugo = minmax.play(state)
// rl.state = mini
// rl.contricanteplay(minimaxjugo)


// // train(state, action, reward, nextState){
// //     // q = Math.random()
// //     const q = 10

// //     if(q < this.qRate){
// //         nextState = this.playElitist();
// //     }else{
// //         nextState = this.playDiversity();
// //     }

// //     // if (this.gameOver(nextState)){
// //     //     reward = calculateReward(nextState);
// //     //     this.updateLookTable(state, action, reward, nextState);
// //     // }

// //     return nextState;
// // }
// const a = rl.playDiversity([1,2,3])
// for (let i = 0; i < 1; i++) {
//     let state = [1,2,3]
//     while (true){
//         console.log('state',state,'win',win(state),'lose',lose(state));
//         if (win(state) || lose(state)){
//             break
//         }else{
//             const q = Math.random()
//             if (q < 1){
//                 state = rl.playElitist(state)
//             }else{
//                 state = rl.playDiversity(state)
//             }
//         }
//     }
//     console.log('a',state);
// }
// // const a = rl.playElitist([0,0,0])
// console.log(a)