import * as React from 'react'
import styled from 'styled-components'
import Row from './row'

const BaseGrid = styled.div`
    display:flex;
    flex-direction:column;
    width:50%;
    padding:0;
    margin:auto;
    text-align:center;
    border:1px solid hotpink;
`

interface NodePos {
    row: number
    column: number
}

interface GridProps {
    rows: number
    columns: number
    nodePositions: NodePos[]
}

export default class Grid extends React.Component<GridProps,{}> {
    render(){
        let toRender: React.ReactElement<Row>[] = []
        for(let i = 0; i<this.props.rows; i++) {
            let nodesOnRow: number[] = []
            this.props.nodePositions.forEach(NodePos => {
                if (NodePos.row === i) nodesOnRow.push(NodePos.column)
                console.log(i, "Row", NodePos.row, "Col", NodePos.column)
            }); 
            console.log("Row:", i, "NodesOnRow:", nodesOnRow)
            toRender.push((<Row blocks={this.props.columns} id={i} nodePositions={nodesOnRow} key={"Row"+i}/>))
        }

        return(
            <BaseGrid style={{width: 50*this.props.rows+''}}>
               {toRender}
            </BaseGrid>
        )
    }
}
