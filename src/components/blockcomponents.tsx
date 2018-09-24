import styled from 'styled-components'

const green = '0, 255, 0'
const blue = '0, 0, 255'
const white = '255, 255, 255'

export const Block = styled.div `
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

export const BContainer = styled.div `
    width:50px;
    height:inherit;
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