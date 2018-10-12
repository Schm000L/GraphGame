export const ROWS:number = 9
export const COLUMNS:number = 15
export const BLOCKSIZE = 50

export type Node = [number, number]
// [firstNode, secondNode, value]
export type Edge = {firstNode: number, secondNode: number, points: number}

type NODE = "NODE"
type EMPTYBLOCK = "EMPTYBLOCK"
export type Block = NODE|EMPTYBLOCK

// let NP: {[row:number]:number[]} = {}

// NODES.forEach( (node:[number, number]) => {
//         if(!NP[node[0]]) NP[node[0]] = [] //initialize if needed
//         NP[node[0]].push(node[1])
//     }
// )


// Much easier to loop through NODE_POSITIONS than NODES when initializing grid
// export const NODE_POSITIONS: {[row:number]:number[]} = NP

//NODE_POSITIONS:
//      0:[0],
//      2:[0,2], 
//      4:[2], 
//      6:[6,12]
