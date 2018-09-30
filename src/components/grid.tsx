import * as React from 'react'
import styled from 'styled-components'
import Row from './row'
import {Block, COLUMNS, ROWS} from '../config'
import { updateBlock } from '../state-management/grid';
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import {Edge} from './blockcomponents'

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

interface GridProps extends StateProps, DispatchProps {
    rows: number
    columns: number
}

interface StateProps {
    grid: Block[][]
} 

interface DispatchProps {
    updateBlock: typeof updateBlock
}

const mapStateToProps = (state: RootState) => {
    return {
      grid: state.gridReducer.grid
    }
  }

const mapDispatchToProps = (dispatch: any) => {
    return {
      updateBlock: (block: Block, row: number, column: number) => dispatch(updateBlock(block, row, column))
    }
}

class Grid extends React.Component<GridProps,{}> {

    // componentDidMount(){
    //     this.props.updateBlock("NODE", 0, 5)
    // }

    render(){
        let toRender: React.ReactElement<Row>[] = []
        for(let i = 0; i<this.props.grid.length; i++) {
            let nodesOnRow: number[] = []
            this.props.grid[i].forEach((block: Block, index: number) => {
                if(block === "NODE")
                    nodesOnRow.push(index)
            })
            toRender.push((<Row blocks={this.props.columns} id={i} nodePositions={nodesOnRow} key={"Row"+i}/>))
        }

        return(
            <BaseGrid style={{width: 50*this.props.rows+''}}>
               {toRender}
              <Edge top={50*ROWS/2-10/2} left={50*COLUMNS/2-200/2} width={200} rotation={0} zIndex={1}/>
            </BaseGrid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)