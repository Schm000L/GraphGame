import * as React from 'react'
import styled from 'styled-components'
import { BLOCKSIZE, COLUMNS } from '../config';
import { Block, Edge } from '../helpers/customtypes'

// TODO: Add visual when edge goes through a node

export const EmptyBlock = styled.div`
    width:${BLOCKSIZE}px;
    height:inherit;
    margin: 0;
`

type NodeProps = {
    connected?: boolean
}

export const Node = styled.div `
    box-sizing: border-box;
    width:${BLOCKSIZE}px;
    height:${BLOCKSIZE}px;
    border-radius:${Math.floor(BLOCKSIZE/2)}px;
    background-color: ${(props:NodeProps = {connected: false}) => props.connected ? 'skyblue' : 'blue'};
    margin: 0;
    position:relative;
    z-index:100;
    &:hover {
        background-color:white;
    }
    border:4px double navy;
    box-shadow: 0 0 10px 3px black inset;
`

interface RowProps{
    blocks: Block[],
    rowIndex: number,
    connectedNodes?: number[]
}

const BaseRow = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:${BLOCKSIZE}px;
    padding:0;
    margin:0;
    &:nth-child(1) {
        margin-top:0;
    }
`

export const Row = (props: RowProps) => <BaseRow>
    { props.blocks.map( (block:Block, i:number) => block === "NODE" ? 
        <Node key={'block'+props.rowIndex+i+Math.random} connected={props.connectedNodes && props.connectedNodes.includes(i)}/> : <EmptyBlock key={'block'+props.rowIndex+i+Math.random}/>
    )}
</BaseRow>

export const BaseGrid = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    width:${COLUMNS*BLOCKSIZE}px;
    padding:0;
    text-align:center;
    border:1px solid black;
`

// TODO: Refactor Edge
export type ElementProps = {
    top: number,
    left: number,
    width: number,
    rotation: number,
    colour: [number, number, number],
    zIndex: number
}

export const EdgeElement = styled.div.attrs<ElementProps>({
    style: (props: ElementProps) => ({
        backgroundColor: `rgb(${props.colour[0]} ${props.colour[1]} ${props.colour[2]})`,
        top: `${props.top}px`,
        left: `${props.left}px`,
        width:`${props.width}px`,

        transform: `rotate(${props.rotation}rad)`,
        zIndex: `${props.zIndex}`,
    })
})`
    box-sizing:border-box;
    position: absolute;
    height:${Math.floor(BLOCKSIZE/5)}px;
    transform-origin:0 0 0;

    &:hover {
        border:2px solid white;
    }
`

// export const EdgeComponent2 = styled.div.attrs<EdgeProps>({
//     style: (props: EdgeProps) => ({
//         backgroundColor: `rgb(${props.colour[0]} ${props.colour[1]} ${props.colour[2]})`,
//         top: `${props.top}px`,
//         left: `${props.left}px`,
//         width:`${props.width}px`,

//         transform: `rotate(${props.rotation}rad)`,
//         zIndex: `${props.zIndex}`,
//     }),
//     onClick: (event: React.MouseEvent<HTMLElement>, props: EdgeProps) => props.dispatchClick(props.edge),
//     onMouseEnter: (event: React.MouseEvent<HTMLElement>, props: EdgeProps) => props.dispatchHover(props.edge.points),
//     onMouseLeave: (event: React.MouseEvent<HTMLElement>, props:EdgeProps) => props.dispatchHover(),
// })`
//     box-sizing:border-box;
//     position:absolute;
//     height:${Math.floor(BLOCKSIZE/5)}px;
//     transform-origin:0 0 0;

//     &:hover {
//         border:2px solid white;
//     }
// `

interface EdgeProps {
    top: number,
    left: number,
    width: number,
    rotation: number,
    zIndex: number,
    dispatchClick: (edge:Edge) => void,
    dispatchHover: (points?: number) => void,
    colour: [number, number, number]
    edge: Edge
}

export const EdgeComponent = (props: EdgeProps) => {
    const handleClickEvent = (event: React.MouseEvent<HTMLElement>) => { 
        return props.dispatchClick(props.edge)
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        return props.dispatchHover(props.edge.points)
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        return props.dispatchHover()
    }

    return <EdgeElement top={props.top} left={props.left} width={props.width} 
        rotation={props.rotation} zIndex={props.zIndex} colour={props.colour} 
        onClick={handleClickEvent} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} > 
    </EdgeElement>
}