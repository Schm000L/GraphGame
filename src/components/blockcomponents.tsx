import * as React from 'react'
import styled from 'styled-components'

const green = '0, 255, 0'
const blue = '0, 0, 255'
const red = '255, 0, 0'
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

const BContainer = styled.div `
    position:relative;
    width:50px;
    height:50px;
    margin: 0;
    &:nth-child(odd) {
        background-color:rgba(${green}, 0);
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

const Left = styled.div`
    position:absolute;
    width:20px;
    height:10px;
    top:20px;
    background-color:rgba(${red}, 100);
`
const Center = styled.div`
    position:absolute;
    width:10px;
    height:10px;
    top:20px;
    left:20px; 
    background-color:rgba(${red}, 100);
`
const Bottom = styled.div`
    position:absolute;
    width:10px;
    height:20px;
    top:30px;
    left:20px;
    background-color:rgba(${red}, 100);
`

const Top = styled.div`
    position:absolute;
    width:10px;
    height:20px;
    top:0;
    left:20px;
    background-color:rgba(${red}, 100);
`

const Right = styled.div`
    position:absolute;
    width:20px;
    height:10px;
    top:20px;
    left:30px;
    background-color:rgba(${red}, 100);
`

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
    &:hover {
        border:2px solid white;
        height:6px;
        width:${(props:EdgeProps) => props.width-4}px;
    }
` 

export const LeftRight = () =>  <BContainer><Left/><Center/><Right/></BContainer>
export const UpDown = () =>  <BContainer><Top/><Center/><Bottom/></BContainer>
export const LeftCenter = () => <BContainer><Left/><Center/><Bottom/><Top/><Right/></BContainer>
export const LeftDown = () => <BContainer><Left/><Center/><Bottom/></BContainer>
export const LeftUp = () => <BContainer><Left/><Center/><Top/></BContainer>
export const RightDown = () => <BContainer><Center/><Bottom/><Right/></BContainer>
export const RightUp = () => <BContainer><Center/><Top/><Right/></BContainer>
export const AllDirections = () => <BContainer><Left/><Center/><Bottom/><Top/><Right/></BContainer>


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
    &:hover {
        background-color:rgb(${white});
    }
`
export const Node = () => <NodeContainer><NODE/></NodeContainer>