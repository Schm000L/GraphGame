import * as React from 'react'
import styled from 'styled-components'

const green = '0, 255, 0'
const blue = '0, 0, 255'
// const red = '255, 0, 0'
const white = '255, 255, 255'

export const EmptyBlock = styled.div `
    width:50px;
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
    width:50px;
    height:50px;
    margin: 0;
    background-color:rgb(200, 200, 10);
    &:nth-child(odd) {
        background-color:rgb(10, 200, 10);
    }
`

const NODE = styled.div `
    width:50px;
    height:inherit;
    border-radius:25px;
    background-color: rgb(${blue});
    margin: 0;
    position:inherit;
    z-index:100;
    &:hover {
        background-color:rgb(${white});
    }
`
export const Node = () => <NodeContainer><NODE/></NodeContainer>


export type EdgeProps = {
    top: number,
    left: number,
    width: number,
    rotation: number,
    zIndex: number
}

export const Edge = styled.div`
    position: absolute;
    top:${(props:EdgeProps) => props.top}px;
    left:${(props:EdgeProps) => props.left}px;
    height:10px;
    
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

export const EdgeComponent = styled.div`
    position: absolute;
    top:${(props:EdgeProps) => props.top}px;
    left:${(props:EdgeProps) => props.left}px;
    
    height:10px;
    width:${(props:EdgeProps) => props.width}px;
    
    background-color: rgb(${Math.random()*255} ${Math.random()*255} ${Math.random()*255});

    transform-origin:0 0 0;
    transform: rotate(${(props:EdgeProps)=>props.rotation}rad);
    z-index:${(props:EdgeProps) => props.zIndex};
    &:hover {
        border:2px solid white;
        height:6px;
        width:${(props:EdgeProps) => props.width-4}px;
    }
` 