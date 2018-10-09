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

/*
    Connected edges

    1. Go through all taken edges and put all "touched" nodes in an array
    2. Loop through all edges; Any edge not taken that has one or both nodes in the "touched" nodes is a connectedEdge

*/
const blue:[number, number, number] = [0,0,255] 
const red: [number, number, number] = [255,0,0]
const black: [number, number, number] = [0,0,0]
const grey:[number, number, number] = [90, 90, 90]

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

interface GridState {
    connectedNodes: number[]
}

interface GridProps extends StateProps, DispatchProps {
    rows: number
    columns: number
    nodes: Node[]
}

interface StateProps {
    grid: Block[][],
    edges: [number, number, number][],
    p1Edges:number[],
    p2Edges:number[],
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

class Grid extends React.Component<GridProps,GridState> {
    constructor(props: GridProps) {
        super(props)
        let connNodes:number[] = [0]
        this.props.p1Edges.forEach( (edgeIndex:number) => {
            if(!connNodes.includes(this.props.edges[edgeIndex][0]))
                connNodes.push(this.props.edges[edgeIndex][0])
            if(!connNodes.includes(this.props.edges[edgeIndex][1]))
                connNodes.push(this.props.edges[edgeIndex][1])
        })
        this.props.p2Edges.forEach( (edgeIndex:number) => {
            if(!connNodes.includes(this.props.edges[edgeIndex][0]))
                connNodes.push(this.props.edges[edgeIndex][0])
            if(!connNodes.includes(this.props.edges[edgeIndex][1]))
                connNodes.push(this.props.edges[edgeIndex][1])
        })
        this.state = {
            connectedNodes: connNodes
        }
    }

    componentDidUpdate(prevProps: GridProps, prevState: GridState) {
        if(prevProps.p1Edges !== this.props.p1Edges || prevProps.p2Edges !== this.props.p2Edges) {
            console.log("NEW")
            this.updateConnectedEdges()
        }

        if(prevState.connectedNodes !== this.state.connectedNodes){
            console.log("NEW STATE")
            console.log("OLD", prevState.connectedNodes)
            console.log("NEW", this.state.connectedNodes)
        }

        console.log("------------------------------------------------------")
    }

    updateConnectedEdges() {
        let connNodes:number[] = [0]
        this.props.p1Edges.forEach( (edgeIndex:number) => {
            if(!connNodes.includes(this.props.edges[edgeIndex][0]))
                connNodes.push(this.props.edges[edgeIndex][0])
            if(!connNodes.includes(this.props.edges[edgeIndex][1]))
                connNodes.push(this.props.edges[edgeIndex][1])
        })
        this.props.p2Edges.forEach( (edgeIndex:number) => {
            if(!connNodes.includes(this.props.edges[edgeIndex][0]))
                connNodes.push(this.props.edges[edgeIndex][0])
            if(!connNodes.includes(this.props.edges[edgeIndex][1]))
                connNodes.push(this.props.edges[edgeIndex][1])
        })
        this.setState({connectedNodes: connNodes})
    }

    p1sTurn: boolean = true

    edgeClick = (edge:[number, number, number]) => {
        console.log("Clicked on", this.props.reduxNodes[edge[0]], this.props.reduxNodes[edge[1]])
        if(this.state.connectedNodes.includes(edge[0]) || this.state.connectedNodes.includes(edge[1])) {
            this.props.claimEdge(edge, this.p1sTurn)
            this.p1sTurn = !this.p1sTurn
        } else {
            console.log("INVALID EDGE SELECTION")
        }
    }

    renderEdges(){
        return this.props.edges.map((edge:[number, number, number], index:number) => {
            let [top, left, width, rotation] = edgeParameters(this.props.nodes[edge[0]], this.props.nodes[edge[1]])
            let clr:[number, number, number] = grey
            if(this.state.connectedNodes.includes(edge[0]) || this.state.connectedNodes.includes(edge[1]))
                clr = black
            if(this.props.p1Edges.includes(index))
                clr = blue
            if(this.props.p2Edges.includes(index))
                clr = red
            return <Edge top={top} left={left} width={width} rotation={rotation} zIndex={index} edge={edge} colour={clr} dispatch={this.edgeClick} key={"edge" + Math.random + index}/>
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