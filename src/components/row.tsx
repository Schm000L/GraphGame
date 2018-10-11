import * as React from 'react'
import styled from 'styled-components'
import {Node, EmptyBlock} from './blockcomponents'
import { Block, BLOCKSIZE } from '../config';

interface RowProps{
    id: number
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

export default class Row extends React.Component<RowProps,{}>{
    id:number
    constructor(props: RowProps){
        super(props)
         this.id = this.props.id
    }

    render(){
        let toRender = this.props.blocks.map((block: Block, i:number) => {
            return block === "NODE" ? (<Node key={'block'+i+Math.random}/>) : (<EmptyBlock key={'block'+i+Math.random}/>)
        })

        return(
            <BaseRow>
                {toRender}
            </BaseRow>
        )
    }
}