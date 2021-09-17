

const win = (state) =>{ return state?.every(x => x === 0)};
const lose = (state) => state.filter(x=>x!==0).length==1

class RLAgent{
    isTrain = true

    constructor(qRate, alpha, initialState){
        this.lookTable = [];
        this.qRate = qRate;
        this.alpha = alpha;
        this.state=initialState;
    }
    
    updateAlpha(currentGame,N){
        this.alpha = 0.5 - 0.49 * currentGame / N;
    }

    // play random
    playDiversity(){
        const succesors = this.getSucesors(); 
        const random = Math.floor(Math.random() * succesors.length)
        const action = succesors[random]
        
        //actualizamos el lookTable?
        
        const newState = [...this.state]
        newState[action[0]] -= action[1];
        return newState;
    }

    calculateReward(state){
        // 1---Ganas
        // 0--- Perdes
        let reward = 0;
        if (win(state)) {
            reward = 1
        }else if (lose(state)){
            reward = 0
        }else{
            const stateKey = JSON.stringify(state);
            if (this.lookTable[stateKey] === undefined){
                this.lookTable[stateKey] = 0.5;
                reward = 0.5;
            }else{
                reward = this.lookTable[stateKey];
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
        return succesors
    }
    
    playElitist(){
        let maxReward = -999;
        let bestState=[];
        let succesors = this.getSucesors()
        // console.log('succesors',succesors);
        const lastState = [...this.state]

        for (let s of succesors){
            const newState = [...this.state]   //[2,3,4] ==>[1,3,4],[0,3,4]
            // console.log('s',s);
            newState[s[0]] -= s[1]
        
            const reward = this.calculateReward(newState);
            if (reward > maxReward) {
                maxReward = reward;
                bestState = [...newState];
            }
        }

        // play
        this.state = [...bestState]
        
        if (this.isTrain){
            this.updateLookTable(lastState, maxReward)
        }

        // console.log('bestState',bestState);
        // console.log('looktable',this.lookTable);
        return bestState;
    }

    updateLookTable(state, reward){  
        // vi=vi+alpha(vsgte-vi)   
        let prob = this.calculateReward(state)
        prob = prob + this.alpha * (reward - prob);

        const key = JSON.stringify(state)
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

    loose(){
        const key = JSON.stringify(this.state)
        this.lookTable[key] = 0
    }

    win(){
        const key = JSON.stringify(this.state)
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