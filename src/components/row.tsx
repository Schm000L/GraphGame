import * as React from 'react'
import styled from 'styled-components'
import {Node, EmptyBlock} from './blockcomponents'

interface RowProps{
    id: number
    blocks: number
    nodePositions: number[]
}

const BaseRow = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:50px;
    padding:0;
    margin:0;
    &:nth-child(1) {
        margin-top:0;
    }
`

export default class Row extends React.Component<RowProps,{}>{
    id:number
    constructor(props: RowProps){
        super(props)
         this.id = this.props.id
    }

    render(){
        let toRender: any[] = []
        for(let i = 0; i<this.props.blocks; i++) {
            this.props.nodePositions.includes(i) ? toRender.push((<Node key={'block'+i+Math.random}/>)) : toRender.push((<EmptyBlock key={'block'+i+Math.random}/>))
        }

        //console.log(toRender)
        return(<BaseRow>
            {toRender}
        </BaseRow>)
    }
}