import {BLOCKSIZE} from '../config'
import {Node} from '../helpers/customtypes'

function deltas(node1:Node, node2:Node):[number, number] {
    let center1:[number, number] = [(node1[0]+0.5)*BLOCKSIZE,(node1[1]+0.5)*BLOCKSIZE]
    let center2:[number, number] = [(node2[0]+0.5)*BLOCKSIZE,(node2[1]+0.5)*BLOCKSIZE]

    let deltaY:number = center1[0] - center2[0]
    let deltaX:number = center1[1] - center2[1]
    return [deltaY, deltaX]
}

// [top, left, width, rotation]
export function edgeParameters(node1:Node, node2:Node):[number, number, number, number] {
    let [deltaY, deltaX] = deltas(node1, node2)
    let rotation: number = deltaX!==0 ? Math.atan(deltaY/deltaX) : deltaY>0 ? -Math.PI/2 : Math.PI/2
    deltaX>0 && deltaY<0 ? rotation+=Math.PI:{}
    return [(node1[0]+0.5)*BLOCKSIZE-5*Math.cos(rotation), (node1[1]+0.5)*BLOCKSIZE+5*Math.sin(rotation), Math.sqrt(deltaY**2+deltaX**2), rotation]
    
}