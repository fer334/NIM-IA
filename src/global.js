

//Variables Globales
const K=5  //  items size p/row
const N=4  //row size
const startMax=true //if startMax is true, it starts with a Max Node otherwise it starts with Min Node.
const depthMax=4 //Depth Max 
let InitialState=[5,2,5,3]  //Game's Initial State

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
const generateInitialState=(k,n)=>{
    let States=[]
    for(let i =1;i<=n;i++){
        States.push(getRandomArbitrary(1,k))
    }
    return States
}

const calculateHeuristhic=(state=[])=>{
    return state.reduce((prev,next)=>prev ^ next)
}

const getSucesors=(states)=>{
    let sucesors=[]
    for(let i=0;i<=states.length;i++){
        if (states[i]==0) sucesors.push(0)
        else for(let j=1;j<=states[i];j++) sucesors.push(j)
    }
    return sucesors
}

const cloneArray=(array,row,newValue)=>{
    let cloneArrayValue=[...array]
    cloneArrayValue[row]-=newValue
    return cloneArrayValue
}

const terminalNode=(state)=>{
    return state.reduce((prev,next)=>prev + next)==0 ? true : false
}


export  {
    generateInitialState,
    getRandomArbitrary,
    calculateHeuristhic,
    getSucesors,
    cloneArray,
    terminalNode,
    K,
    N,
    depthMax,
    startMax,
    InitialState
}