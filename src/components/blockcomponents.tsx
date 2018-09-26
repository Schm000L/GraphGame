import * as React from 'react'
import styled from 'styled-components'

const green = '0, 255, 0'
const blue = '0, 0, 255'
const red = '255, 0, 0'
const white = '255, 255, 255'

export const EmptyBlock = styled.div `
    width:50px;
    height:inherit;
    background-color: rgba(200, 200, 10, 100);
    margin: 0;
    &:nth-child(odd) {
        background-color:rgba(10, 200, 10, 100);
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

export const LeftRight = () =>  <BContainer><Left/><Center/><Right/></BContainer>
export const UpDown = () =>  <BContainer><Top/><Center/><Bottom/></BContainer>
export const LeftCenter = () => <BContainer><Left/><Center/><Bottom/><Top/><Right/></BContainer>
export const LeftDown = () => <BContainer><Left/><Center/><Bottom/></BContainer>
export const LeftUp = () => <BContainer><Left/><Center/><Top/></BContainer>
export const RightDown = () => <BContainer><Center/><Bottom/><Right/></BContainer>
export const RightUp = () => <BContainer><Center/><Top/><Right/></BContainer>
export const AllDirections = () => <BContainer><Left/><Center/><Bottom/><Top/><Right/></BContainer>


export const Node = styled.div `
    width:50px;
    height:inherit;
    border-radius:25px;
    background-color: rgb(${blue});
    margin: 0;
    &:hover {
        background-color: rbg(${white});
    }
`