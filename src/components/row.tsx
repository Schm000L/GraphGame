import * as React from 'react'
import styled from 'styled-components'

interface RowProps{
    blocks: number
}

const BaseRow = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:50px;
    padding:0;
    margin:0;
    margin-top:10px;
    &:nth-child(1) {
        margin-top:0;
    }
`
const green = '0, 255, 0'
const blue = '0, 0, 255'

const Block = styled.div `
    width:50px;
    height:inherit;
    border-radius:25px;
    background-color: rgba(${blue}, 0);
    margin: auto;
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

export default class Row extends React.Component<RowProps,{}>{
    render(){
        let toRender: any[] = []
        for(let i = 0; i<this.props.blocks; i++)
            toRender.push((<Block key={'block'+i+Math.random}/>))

        console.log(toRender)
        return(<BaseRow>
            {toRender}
        </BaseRow>)
    }
}