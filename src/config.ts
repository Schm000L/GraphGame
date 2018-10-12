export const ROWS:number = 9
export const COLUMNS:number = 15
export const BLOCKSIZE = 50

type NODE = "NODE"
type EMPTYBLOCK = "EMPTYBLOCK"
export type Block = NODE|EMPTYBLOCK

export type Node = [number, number] //[x, y]
export type Edge = {firstNode: number, secondNode: number, points: number}

