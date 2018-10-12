import * as React from 'react'
import styled from 'styled-components'
import { BLOCKSIZE, Block } from '../config';

const green = '0, 255, 0'
const blue = '0, 0, 255'
// const red = '255, 0, 0'
const white = '255, 255, 255'

export const EmptyBlock = styled.div `
    width:${BLOCKSIZE}px;
    height:inherit;
    background-color: rgb(200, 200, 10);
    margin: 0;
    &:nth-child(odd) {
        background-color:rgb(10, 200, 10);
        &:hover {
            background-color:rgba(${green}, 100);
        }
    }
    &:nth-child(even) {
        &:hover{
            background-color:rgba(${blue}, 100);
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
    background-color: rgb(${blue});
    margin: 0;
    position:inherit;
    z-index:100;
    &:hover {
        background-color:rgb(${white});
    }
`
export const Node = () => <NodeContainer><NODE/></NodeContainer>


interface RowProps{
    blocks: Block[]
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
        <Node key={'block'+i+Math.random}/> : <EmptyBlock key={'block'+i+Math.random}/>
    )}
</BaseRow>


export type EdgeProps = {
    top: number,
    left: number,
    width: number,
    rotation: number,
    colour: [number, number, number],
    zIndex: number
}

export const Edge = styled.div`
    position: absolute;
    top:${(props:EdgeProps) => props.top}px;
    left:${(props:EdgeProps) => props.left}px;
    height:inherit;
    
    width:${(props:EdgeProps) => props.width}px;
    transform-origin:0 0 0;
    transform: rotate(${(props:EdgeProps)=>props.rotation}rad);
    z-index:${(props:EdgeProps) => props.zIndex};
    z-index:1;
    &:hover {
        border:2px solid white;
        height:6px;
        width:${(props:EdgeProps) => props.width-4}px;
    }
` 

export const EdgeElement = styled.div`
    position: absolute;
    top:${(props:EdgeProps) => props.top}px;
    left:${(props:EdgeProps) => props.left}px;
    
    height:${Math.floor(BLOCKSIZE/5)}px;
    width:${(props:EdgeProps) => props.width}px;
    
    background-color: rgb(${(props:EdgeProps)=> `${props.colour[0]} ${props.colour[1]} ${props.colour[2]}`});

    transform-origin:0 0 0;
    transform: rotate(${(props:EdgeProps)=>props.rotation}rad);
    z-index:${(props:EdgeProps) => props.zIndex};
    &:hover {
        border:2px solid white;
        height:6px;
        width:${(props:EdgeProps) => props.width-4}px;
    }
` 