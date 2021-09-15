
//Variables Globales
const K=5  //  items size p/row
const N=4  //row size
const startMax=true //if startMax is true, starts with a Max Node.
let States=[]  //game State
let depth=-1
let depthMax=4
let nodes=[]
let nodeAmount=0

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
const generateInitialState=(k,n)=>{
    for(let i =1;i<=n;i++){
        States.push(getRandomArbitrary(1,k))
    }
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
    //console.log('Sucesors of ',states,' are',sucesors)
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
/* previusNode was Max , previusNodeFacto=1 ,otherwise previusNodeFacto=-1 */
const miniMaxValue=(state,previusNodeFactor)=>{
    depth+=1
    nodeAmount+=1
    let current_id=nodeAmount
    //console.log(`NodoId:${current_id}`)
    if(terminalNode(state)) return [2*previusNodeFactor,current_id]
    
    if(depth==depthMax) return calculateHeuristhic(state)==0 ? [previusNodeFactor,current_id] : [-1*previusNodeFactor,current_id] 

    if(previusNodeFactor==-1){  //you are now in a Max Node
        let [currentRow,maxValue,row,amount,nextNode]=[-1,-99,0,0,-1]
        for (let item of getSucesors(state)) {
                if(item!=0){
                    if(item==1) currentRow+=1
                    stateclone=cloneArray(state,currentRow,item)
                    let [value, idNextNode]=miniMaxValue(stateclone,1)
                    depth-=1
                    value>maxValue && ([maxValue,row,amount,nextNode]=[value,currentRow,item,idNextNode])
                }else currentRow+=1
        };
        //console.log("Se ejecuta")
        let x=cloneArray(state,row,amount)
        nodes.unshift({
            current_id,row,amount,nextNode,x
        })
        //console.log(`NodoId:${current_id}, nextNode:${nextNode}`)
        return [maxValue,current_id]

    }else{  //your are now in a Min Node
        let [currentRow,minValue,row,amount,nextNode]=[-1,99,0,0,-1]
        for(let item of getSucesors(state)){
            if(item!=0){
                if(item==1) currentRow+=1
                    stateclone=cloneArray(state,currentRow,item)
                    let [value,idNextNode]=miniMaxValue(stateclone,-1)
                    depth-=1
                    value<minValue && ([minValue,row,amount,nextNode]=[value,currentRow,item,idNextNode])
            }else currentRow+=1
        };
        let x=cloneArray(state,row,amount)
        nodes.unshift({
            current_id,row,amount,nextNode,x
        })
        //console.log(`NodoId:${current_id}, nextNode:${nextNode}`)
        return [minValue,current_id]
    }
  
    
}
const miniMaxDesicion=(initialState,start)=>{
    if (start==1)miniMaxValue(initialState,-1)
    else miniMaxValue(initialState,1)
    let nextNode=1
    console.log("------------------------")
    console.log(`Estado Inicial [${initialState}] con SumNim ${calculateHeuristhic(initialState)}`)
    while(nextNode){
        let value=nodes.find((item)=>item.current_id==nextNode)
        nextNode= value ? value.nextNode : undefined
        nextNode && (console.log(`Se saca ${value.amount} fichas de la fila ${value.row +1}, mi estado sgte sera [${value.x}] con sumNim=${calculateHeuristhic(value.x)} -------Nodo ${start==1?"Max":"Min"} `))
        start*=-1
    }
}
generateInitialState(K,N)
miniMaxDesicion(States,1)