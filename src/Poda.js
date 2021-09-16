

let depth=-1
let nodes=[]
let nodeAmount=0

import {
    getRandomArbitrary,
    calculateHeuristhic,
    getSucesors,
    cloneArray,
    terminalNode,
    generateInitialState,
    K,
    N,
    depthMax,
    startMax,
    InitialState
} from './global.js'

/* previusNode was Max , previusNodeFacto=1 ,otherwise previusNodeFacto=-1 */
const miniMaxValue=(state,previusNodeFactor,alpha,beta)=>{
    depth+=1
    nodeAmount+=1
    let current_id=nodeAmount
  
    if(terminalNode(state)) return [2*previusNodeFactor,current_id]
    
    if(depth==depthMax) return calculateHeuristhic(state)==0 ? [previusNodeFactor,current_id] : [-1*previusNodeFactor,current_id] 

    if(previusNodeFactor==-1){  //you are now in a Max Node
        let [currentRow,maxValue,row,amount,nextNode]=[-1,-99,0,0,-1]
        for (let item of getSucesors(state)) {
                if(item!=0){
                    if(item==1) currentRow+=1
                    let stateclone=cloneArray(state,currentRow,item)
                    let [value, idNextNode]=miniMaxValue(stateclone,1,alpha,beta)
                    depth-=1
                    value>alpha && (alpha=value)
                    value>maxValue && ([maxValue,row,amount,nextNode]=[value,currentRow,item,idNextNode])
                    if (alpha>beta) {
                        return [beta,nextNode]
                    }
                }else currentRow+=1
        };
        
        let x=cloneArray(state,row,amount)
        nodes.unshift({
            current_id,row,amount,nextNode,x
        })

        return [maxValue,current_id]

    }else{  //your are now in a Min Node
        let [currentRow,minValue,row,amount,nextNode]=[-1,99,0,0,-1]
        for(let item of getSucesors(state)){
            if(item!=0){
                if(item==1) currentRow+=1
                    let stateclone=cloneArray(state,currentRow,item)
                    let [value,idNextNode]=miniMaxValue(stateclone,-1,alpha,beta)
                    depth-=1
                    value<beta && (beta=value)
                    value<minValue && ([minValue,row,amount,nextNode]=[value,currentRow,item,idNextNode])
                    if(beta<alpha)return [alpha,nextNode]
            }else currentRow+=1
        };
        let x=cloneArray(state,row,amount)
        nodes.unshift({
            current_id,row,amount,nextNode,x
        })
 
        return [minValue,current_id]
    }
  
    
}
const miniMaxDesicion=(initialState,start)=>{
    console.log(`Calculando la solucion, espere un momento...`)
    if (start==1)miniMaxValue(initialState,-1,-999,999)
    else miniMaxValue(initialState,1,-999,999)
    let nextNode=1
    console.log("---------Solucion Encontrada Por MiniMax con Poda----------")
    console.log(`Estado Inicial [${initialState}] con SumNim ${calculateHeuristhic(initialState)}`)
    while(nextNode){
        let value=nodes.find((item)=>item.current_id==nextNode)
        nextNode= value ? value.nextNode : undefined
        nextNode && (console.log(`Se saca ${value.amount} fichas de la fila ${value.row +1}, mi estado sgte sera [${value.x}] con sumNim=${calculateHeuristhic(value.x)} -------Nodo ${start==1?"Max":"Min"} `))
        start*=-1
    }
    console.log(`Cantidad de Nodos Visitados ${nodeAmount}`)
}

miniMaxDesicion(InitialState,1)//cambiar por la variable States para calcular de los nodos Aleatorios