type NODE = "NODE"
type EMPTYBLOCK = "EMPTYBLOCK"
export type Block = NODE|EMPTYBLOCK

export type Node = [number, number] //[x, y]
export type Edge = {firstNode: number, secondNode: number, points: number}