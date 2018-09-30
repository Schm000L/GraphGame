export const ROWS:number = 7
export const COLUMNS:number = 13
export const BLOCKSIZE = 50

export type Node = [number, number]
export const NODES: Node[] = [
    [0,0], [2,0], [2,2], [4,2], [6,6], [6,12]
]

let NP: {[row:number]:number[]} = {}

NODES.forEach( (node:[number, number]) => {
        if(!NP[node[0]]) NP[node[0]] = [] //initialize if needed
        NP[node[0]].push(node[1])
    }
)


// Much easier to loop through NODE_POSITIONS than NODES when initializing grid
export const NODE_POSITIONS: {[row:number]:number[]} = NP

//NODE_POSITIONS:
//      0:[0],
//      2:[0,2], 
//      4:[2], 
//      6:[6,12]

// [firstNode, secondNode, value]
export type Edge = [number, number, number]

export const EDGES: Edge[] = [
    // [0,4,1], [2,3,1]
    [0,1,1], [0,2,1], [2,3,1], [4,5,1], [3,5,1]
]


type NODE = "NODE"
type EMPTYBLOCK = "EMPTYBLOCK"
type LEFTRIGHT = "LEFTRIGHT"
type UPDOWN = "UPDOWN"
type LEFTCENTER = "LEFTCENTER"
type LEFTDOWN = "LEFTDOWN"
type LEFTUP = "LEFTUP"
type RIGHTDOWN = "RIGHTDOWN"
type RIGHTUP = "RIGHTUP"
type ALLDIRECTIONS = "ALLDIRECTIONS"
export type Block = NODE|EMPTYBLOCK|LEFTRIGHT|UPDOWN|LEFTCENTER|LEFTDOWN|LEFTUP|RIGHTDOWN|RIGHTUP|ALLDIRECTIONS

// v1.x.x - Flexboxes, "pipes"
// v2.x.x - Absolute positioning, direct edges utilizing z-values
// Will likely skip "pipes" implementation