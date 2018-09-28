import * as React from 'react'
import styled from 'styled-components'
import Row from './row'
import {COLUMNS} from '../config'
import { GridState, updateBlock } from '../state-management/grid';
import { connect } from 'react-redux';

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

export type BLOCK = NODE|EMPTYBLOCK|LEFTRIGHT|UPDOWN|LEFTCENTER|LEFTDOWN|LEFTUP|RIGHTDOWN|RIGHTUP|ALLDIRECTIONS

interface NodePosition {
    row: number
    column: number
}

interface GridProps extends StateProps, DispatchProps {
    rows: number
    columns: number
    nodePositions: NodePosition[]
}

interface StateProps {
    grid: BLOCK[][]
} 

interface DispatchProps {
    updateBlock: typeof updateBlock
}

const mapStateToProps = (state: GridState) => {
    return {
      grid: state.grid
    }
  }

const mapDispatchToProps = (dispatch: any) => {
    return {
      updateBlock: (block: BLOCK, row: number, column: number) => dispatch(updateBlock(block, row, column))
    }
}

class Grid extends React.Component<GridProps,{}> {
    render(){
        let toRender: React.ReactElement<Row>[] = []
        for(let i = 0; i<this.props.grid.length; i++) {
            let nodesOnRow: number[] = []
            this.props.grid[i].forEach((block: BLOCK, index: number) => {
                if(block === "NODE")
                    nodesOnRow.push(index)
            })
            toRender.push((<Row blocks={this.props.columns} id={i} nodePositions={nodesOnRow} key={"Row"+i}/>))
        }

        return(
            <BaseGrid style={{width: 50*this.props.rows+''}}>
               {toRender}
            </BaseGrid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)