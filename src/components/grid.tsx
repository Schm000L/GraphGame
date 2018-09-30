import * as React from 'react'
import styled from 'styled-components'
import Row from './row'
import {Block, COLUMNS, EDGES} from '../config'
import { updateBlock } from '../state-management/grid';
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import { Edge } from './blockcomponents'
import { edgeParameters } from '../helpers/edgemath';

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
    renderEdges(){
        // let toRender: React.ReactElement<any>[] = []
        let toRender = EDGES.map((edge:[number, number, number], index:number) => {
            let [top, left, width, rotation] = edgeParameters(edge)
            let color = [Math.random()*255, Math.random()*255,Math.random()*255]
            let inlineStyle = {
                backgroundColor: `rgb(${color[0]} ${color[1]} ${color[2]})`
            }
            return <Edge top={top} left={left} width={width} rotation={rotation} zIndex={index} style={inlineStyle} key={"edge" + Math.random + index}/>
        })

        // toRender.push(<Edge top={0} left={0} width={200} rotation={0} zIndex={1}/>)
        return toRender
    }

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
                {this.renderEdges()}
            </BaseGrid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)