import * as React from 'react'
import styled from 'styled-components'
import Row from './row'

const BaseGrid = styled.div`
    display:flex;
    flex-direction:column;
    width:50%;
    height:300px;
    padding:0;
    margin:auto;
    text-align:center;
`
interface GridProps {
    rows: number
    columns: number
}

export default class Grid extends React.Component<GridProps,{}> {
    render(){
        let toRender: React.ReactElement<Row>[] = []
        for(let i = 0; i<this.props.rows; i++)
            toRender.push((<Row blocks={this.props.columns}/>))

        return(
            <BaseGrid>
               {toRender}
            </BaseGrid>
        )
    }
}
