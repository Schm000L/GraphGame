import * as React from 'react'
import styled from 'styled-components'
import Row from './row'
import {COLUMNS, ROWS} from '../config'

const BaseGrid = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    width:${COLUMNS*50}px;
    padding:0;
    margin:auto;
    text-align:center;
    border:1px solid hotpink;
`

interface NodePosition {
    row: number
    column: number
}

interface GridProps {
    rows: number
    columns: number
    nodePositions: NodePosition[]
}

type NODE = "NODE"
type EMPTYBLOCK = "EMPTYBLOCK"
type LEFTRIGHT = "LEFTRIGHT"
type UPDOWN = "UPDOWN"
type LEFTCENTER = "LEFTCENTER"
type LEFTDOWN = "LEFTDOWN"
type LEFTUP = "LEFTUP"
type RIGHTDOWN = "RIGHTDOWN"
type RIGHTUP = "RIGHTUP"
type ALLDIRECTIONS = "ALLDIRECTIONS"

type BLOCK = NODE|EMPTYBLOCK|LEFTRIGHT|UPDOWN|LEFTCENTER|LEFTDOWN|LEFTUP|RIGHTDOWN|RIGHTUP|ALLDIRECTIONS

export default class Grid extends React.Component<GridProps,{}> {
    private grid: BLOCK[][]
    constructor(GridProps: GridProps) {
        super(GridProps)
        this.grid = []

        for(let i = 0; i<ROWS; i++) {
            this.grid[i] = []
            for(let j=0; j<COLUMNS;j++) {
                this.grid[i][j] = "NODE"
            }
        }
    }

    

    render(){
        this.grid[1][1] = "EMPTYBLOCK"
        console.log(this.grid[1][1])
        let toRender: React.ReactElement<Row>[] = []
        for(let i = 0; i<this.props.rows; i++) {
            let nodesOnRow: number[] = []
            this.props.nodePositions.forEach(NodePos => {
                if (NodePos.row === i) nodesOnRow.push(NodePos.column)
                // console.log(i, "Row", NodePos.row, "Col", NodePos.column)
            }); 
            // console.log("Row:", i, "NodesOnRow:", nodesOnRow)
            toRender.push((<Row blocks={this.props.columns} id={i} nodePositions={nodesOnRow} key={"Row"+i}/>))
        }

        return(
            <BaseGrid style={{width: 50*this.props.rows+''}}>
               {toRender}
            </BaseGrid>
        )
    }
}
