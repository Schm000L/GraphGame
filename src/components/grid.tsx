import * as React from 'react'
import styled from 'styled-components'
import {Row, EdgeComponent, /*EdgePoints*/} from './gridcomponents'
import {COLUMNS,  BLOCKSIZE} from '../config'
import {Block, Node, Edge} from '../helpers/customtypes'
import { updateBlock } from '../state-management/grid';
import { claimEdge} from '../state-management/edges'
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import { edgeParameters } from '../helpers/edgemath';

const blue:[number, number, number] = [0,0,255] 
const red: [number, number, number] = [255,0,0]
const black: [number, number, number] = [0,0,0]
const grey:[number, number, number] = [90, 90, 90]

const BaseGrid = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    width:${COLUMNS*BLOCKSIZE}px;
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
    edges: Edge[],
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
      claimEdge: (edge: Edge, player: boolean) => dispatch(claimEdge(edge, player))
    }
}

class Grid extends React.Component<GridProps,GridState> {
    p1sTurn: boolean = true
    
    constructor(props: GridProps) {
        super(props)
        this.state = {
            connectedNodes: this.getConnectedNodes()
        }
    }

    componentDidUpdate(prevProps: GridProps, prevState: GridState) {
        if(prevProps.p1Edges !== this.props.p1Edges || prevProps.p2Edges !== this.props.p2Edges) {
            this.setState({connectedNodes: this.getConnectedNodes()})
            this.calculateScore()
        }
    }

    
    calculateScore() {
        let score = 0
        const p1Edges = this.props.p1Edges
        const p2Edges = this.props.p2Edges
        const edges = this.props.edges
        if(!this.p1sTurn) { //!this.p1sTurn since it's called before click
            if(p1Edges && p1Edges.length > 0 && edges && edges.length > 0)
                p1Edges.forEach((index:number) => score+= edges[index].points )
        } else {
            if(p2Edges && p2Edges.length > 0 && edges && edges.length > 0)
                p2Edges.forEach((index:number) => score+= edges[index].points )
        }
        console.log(!this.p1sTurn ? "P1 score:":"P2 score:", score)
    }


    getConnectedNodes() {
        let connNodes:number[] = [0]
        this.props.p1Edges.forEach( (edgeIndex:number) => {
            if(!connNodes.includes(this.props.edges[edgeIndex].firstNode))
                connNodes.push(this.props.edges[edgeIndex].firstNode)
            if(!connNodes.includes(this.props.edges[edgeIndex].secondNode))
                connNodes.push(this.props.edges[edgeIndex].secondNode)
        })
        this.props.p2Edges.forEach( (edgeIndex:number) => {
            if(!connNodes.includes(this.props.edges[edgeIndex].firstNode))
                connNodes.push(this.props.edges[edgeIndex].firstNode)
            if(!connNodes.includes(this.props.edges[edgeIndex].secondNode))
                connNodes.push(this.props.edges[edgeIndex].secondNode)
        })
        return connNodes
    }


    edgeClick = (edge:Edge) => {
        if(this.props.nodes.length === this.getConnectedNodes().length) {
            console.log("ALL NODES REACHED - GAME IS DONE!!!!")
        } else {
            if( this.state.connectedNodes.includes(edge.firstNode) || this.state.connectedNodes.includes(edge.secondNode) ) {
                let edgeIndex = this.props.edges.findIndex( (propEdge: Edge) => propEdge===edge)
                if(edgeIndex>=0 && !this.props.p1Edges.includes(edgeIndex) && !this.props.p2Edges.includes(edgeIndex)) {
                    this.props.claimEdge(edge, this.p1sTurn)
                    this.p1sTurn = !this.p1sTurn
                } else {
                    console.log("EDGE ALREADY CLAIMED")
                }
            } else {
                console.log("INVALID EDGE SELECTION")
            }
        }
    }

    // IDÉ: Skapa edgecontainer, state på hover.
    renderEdges(){
        let toRet = this.props.edges.map((edge:Edge, index:number) => {
            let [top, left, width, rotation] = edgeParameters(this.props.nodes[edge.firstNode], this.props.nodes[edge.secondNode])
            let clr:[number, number, number] = grey
            if(this.state.connectedNodes.includes(edge.firstNode) || this.state.connectedNodes.includes(edge.secondNode))
                clr = black
            if(this.props.p1Edges.includes(index))
                clr = blue
            if(this.props.p2Edges.includes(index))
                clr = red

            // if(index === 0) {
            //     console.log("------------------------------")
            //     console.log("Point Disp:", "Between", this.props.nodes[edge.firstNode], "and", this.props.nodes[edge.secondNode])
            //     console.log("Top:", top)
            //     console.log("Top offset:", width*Math.sin(rotation))
            //     console.log("Left:", left)
            //     console.log("Left offset:", width*Math.cos(rotation))
            //     console.log("------------------------------")
            // }
            return <EdgeComponent top={top} left={left} width={width} rotation={rotation} zIndex={index} edge={edge} colour={clr} dispatch={this.edgeClick} key={"edge" + Math.random + index}/>
        })
        // toRet.push(<EdgePoints key="fsdgvbcjknubvkhjbhjhbjhjbjkhb"><p>HEJJEJ</p></EdgePoints>)
        return toRet
    }

    render(){
        if(this.props.grid) {
            let toRender = this.props.grid.map((row: Block[], index: number) => {
                return <Row blocks={row} rowIndex={index} key={"Row"+index}/>
            })
        
            return(
                <>
                <BaseGrid style={{width: 50*this.props.rows+''}}>
                    {toRender}
                    {this.renderEdges()}
                </BaseGrid>
                </>
            )
        }
        return(<h1>GRID UNDEFINED</h1>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)