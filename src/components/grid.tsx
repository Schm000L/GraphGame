import * as React from 'react'
import styled from 'styled-components'
import Row from './row'
import {Block, COLUMNS, Node} from '../config'
import { updateBlock } from '../state-management/grid';
import { claimEdge} from '../state-management/edges'
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import Edge from './edge'
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
    nodes: Node[]
}

interface StateProps {
    grid: Block[][],
    edges: [number, number, number][],
    p1Edges:[number, number, number][],
    p2Edges:[number, number, number][],
    reduxNodes: Node[]
} 

interface DispatchProps {
    updateBlock: typeof updateBlock,
    claimEdge: typeof claimEdge
}

const mapStateToProps = (state: RootState) => {
    return {
        grid: state.gridReducer.grid,
        edges: state.edgeReducer.edges,
        p1Edges: state.edgeReducer.p1Edges,
        p2Edges: state.edgeReducer.p2Edges,
        reduxNodes: state.nodeReducer.nodes
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
      updateBlock: (block: Block, row: number, column: number) => dispatch(updateBlock(block, row, column)),
      claimEdge: (edge: [number, number, number], player: boolean) => dispatch(claimEdge(edge, player))
    }
}

class Grid extends React.Component<GridProps,{}> {
    p1sTurn: boolean = true

    edgeClick = (edge:[number, number, number]) => {
        console.log("Clicked on", this.props.reduxNodes[edge[0]], this.props.reduxNodes[edge[1]])
        this.props.claimEdge(edge, this.p1sTurn)
        this.p1sTurn = !this.p1sTurn
    }

    renderEdges(){
        return this.props.edges.map((edge:[number, number, number], index:number) => {
            let [top, left, width, rotation] = edgeParameters(this.props.nodes[edge[0]], this.props.nodes[edge[1]])
            return <Edge top={top} left={left} width={width} rotation={rotation} zIndex={index} edge={edge} dispatch={this.edgeClick} key={"edge" + Math.random + index}/>
        })
    }

    render(){
        if(this.props.grid) {
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
        return(<h1>GRID UNDEFINED</h1>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)