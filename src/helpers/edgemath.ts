// import {Node, Edge, BLOCKSIZE} from '../config'
import {Node, BLOCKSIZE} from '../config'

function deltas(node1:Node, node2:Node):[number, number] {
    // let node1:Node = NODES[edge[0]]
    // let node2:Node = NODES[edge[1]]

    let center1:[number, number] = [(node1[0]+0.5)*BLOCKSIZE,(node1[1]+0.5)*BLOCKSIZE]
    let center2:[number, number] = [(node2[0]+0.5)*BLOCKSIZE,(node2[1]+0.5)*BLOCKSIZE]

    let deltaY:number = center1[0] - center2[0]
    let deltaX:number = center1[1] - center2[1]
    return [deltaY, deltaX]
}

// export function width(edge:Edge):number{
//     let [deltaY, deltaX] = deltas(edge)
//     return Math.sqrt(deltaY**2+deltaX**2) //Pyth Agoras
// }

// export function rotation(edge:Edge):number {
//     let [deltaY, deltaX] = deltas(edge)
//     let rotation:number = deltaX!==0 ? Math.atan(deltaY/deltaX) : 0
//     return rotation
// }

// export function edgePosition(edge:Edge):[number, number]{
//     let [deltaY, deltaX] = deltas(edge)
//     return [deltaY/2,deltaX/2]
// }

// [top, left, width, rotation]
export function edgeParameters(node1:Node, node2:Node):[number, number, number, number] {
    let [deltaY, deltaX] = deltas(node1, node2)

    // let node:Node = NODES[edge[0]]
    let rotation:number = deltaX!==0 ? Math.atan(deltaY/deltaX) : deltaY>0 ? -Math.PI/2 : Math.PI/2
    deltaX>0 && deltaY<0 ? rotation+=Math.PI:{}
    // Different signs, excluding 0
    // if( deltaX<0 && deltaY>0) {
    //     console.log("DIFF1")
    // } else if ((deltaX>0 && deltaY<0)) {
    //     rotation+=Math.PI
    //     console.log("DIFF2")
    // }

    // console.log("Y:", deltaY, "X:", deltaX)
    // console.log("Distance:", Math.sqrt(deltaY**2+deltaX**2))
    // console.log("Rotation:",rotation)
    return [(node1[0]+0.5)*BLOCKSIZE-5*Math.cos(rotation), (node1[1]+0.5)*BLOCKSIZE+5*Math.sin(rotation), Math.sqrt(deltaY**2+deltaX**2), rotation]
    
}