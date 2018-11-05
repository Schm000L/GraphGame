import * as React from 'react'
import styled from 'styled-components'
import { BLOCKSIZE } from '../config';
import {Block, Edge} from '../helpers/customtypes'

export const EmptyBlock = styled.div `
    width:${BLOCKSIZE}px;
    height:inherit;
    background-color: rgb(200, 200, 10);
    margin: 0;
    &:nth-child(odd) {
        background-color:rgb(10, 200, 10);
        &:hover {
            background-color:green;
        }
    }
    &:nth-child(even) {
        &:hover{
            background-color:blue;
        }
    }
`

const NodeContainer = styled.div `
    position:relative;
    width:${BLOCKSIZE}px;
    height:${BLOCKSIZE}px;
    margin: 0;
    background-color:rgb(200, 200, 10);
    &:nth-child(odd) {
        background-color:rgb(10, 200, 10);
    }
`

const NODE = styled.div `
    width:${BLOCKSIZE}px;
    height:inherit;
    border-radius:${Math.floor(BLOCKSIZE/2)}px;
    background-color: blue;
    margin: 0;
    position:inherit;
    z-index:100;
    &:hover {
        background-color:white;
    }
`
export const Node = () => <NodeContainer><NODE/></NodeContainer>


interface RowProps{
    blocks: Block[],
    rowIndex: number
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
        <Node key={'block'+props.rowIndex+i+Math.random}/> : <EmptyBlock key={'block'+props.rowIndex+i+Math.random}/>
    )}
</BaseRow>


export type ElementProps = {
    top: number,
    left: number,
    width: number,
    rotation: number,
    colour: [number, number, number],
    zIndex: number
}


export const EdgeElement = styled.div`
    position: absolute;
    top:${(props:ElementProps) => props.top}px;
    left:${(props:ElementProps) => props.left}px;
    
    height:${Math.floor(BLOCKSIZE/5)}px;
    width:${(props:ElementProps) => props.width}px;
    
    background-color: rgb(${(props:ElementProps)=> `${props.colour[0]} ${props.colour[1]} ${props.colour[2]}`});

    transform-origin:0 0 0;
    transform: rotate(${(props:ElementProps)=>props.rotation}rad);
    z-index:${(props:ElementProps) => props.zIndex};
    &:hover {
        border:2px solid white;
        height:6px;
        width:${(props:ElementProps) => props.width-4}px;
    }
` 

interface EdgeProps {
    top: number,
    left: number,
    width: number,
    rotation: number,
    zIndex: number,
    dispatch: (edge:Edge) => void,
    colour: [number, number, number]
    edge: Edge
}

export const EdgeComponent = (props: EdgeProps) => {
    const handleClickEvent = (event: React.MouseEvent<HTMLElement>) => { 
        return props.dispatch(props.edge)
    }
    return <EdgeElement top={props.top} left={props.left} width={props.width} rotation={props.rotation} zIndex={props.zIndex} colour={props.colour} onClick={handleClickEvent}>
        <EdgePoints top={props.top} left={props.left} width={props.width} rotation={props.rotation} zIndex={props.zIndex} points={props.edge.points}>
        {`${props.edge.points}`}
        </EdgePoints>
        </EdgeElement>
}

interface PointProps {
    top: number,
    left: number,
    width:number,
    zIndex: number,
    rotation: number,
    points: number
}

export const EdgePoints = styled.p`
    position: absolute;
    // width:50px;
    // height:30px;
    
    top:${(props:PointProps) => Math.abs(Math.cos(props.rotation))}px;
    left:${(props:PointProps) => 0.5*props.width-20/2}px;
    // z-index:${(props:PointProps) => 10000};
    z-index: 200;
    // background-color:pink;

    transform-origin:0 0 0;
    transform: rotate(${(props:PointProps)=>-props.rotation}rad);
    visibility:hidden;
    ${EdgeElement}:hover & {
        visibility:visible;
    }
`
// top:${(props:PointProps) => props.top+0.5*props.width*Math.sin(props.rotation)}px;
// left:${(props:PointProps) => props.left+0.5*props.width*Math.cos(props.rotation)}px;