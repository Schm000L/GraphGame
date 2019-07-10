import * as React from 'react'
import { Row, EdgeComponent, BaseGrid } from './gridcomponents'
import { Block, Node, Edge } from '../helpers/customtypes'
import { updateBlock } from '../state-management/grid';
import { claimEdge} from '../state-management/edges'
import { updateHovered } from '../state-management/hovered'
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import { edgeParameters } from '../helpers/edgemath';
import { setErrorMessage, setInfoMessage, resetFeedback, FeedbackMessage } from '../state-management/feedback';

const blue:[number, number, number] = [0,0,255] 
const red: [number, number, number] = [255,0,0]
const black: [number, number, number] = [0,0,0]
const grey:[number, number, number] = [90, 90, 90]

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
    claimEdge: typeof claimEdge,
    updateHovered: typeof updateHovered,
    gameScoreUpdate: (p1: boolean) => void,
    setErrorMessage: typeof setErrorMessage,
    setInfoMessage: typeof setInfoMessage,
    resetFeedback: typeof resetFeedback
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
        claimEdge: (edge: Edge, player: boolean) => dispatch(claimEdge(edge, player)),
        updateHovered: (points: number|undefined) => dispatch(updateHovered(points)),
        setErrorMessage: (errorMessage: FeedbackMessage ) => dispatch(setErrorMessage(errorMessage)),
        setInfoMessage: (infoMessage: FeedbackMessage) => dispatch(setInfoMessage(infoMessage)) ,
        resetFeedback: () => dispatch(resetFeedback())
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
            let connectedNodes = this.getConnectedNodes()
            this.setState({connectedNodes: connectedNodes})
            
            if(this.props.nodes.length === connectedNodes.length) {
                this.props.setInfoMessage('REACHED GOAL STATE')
                let {p1score, p2score} = this.calculateScore()
                if(p1score !== p2score)
                    this.props.gameScoreUpdate(p1score > p2score)
                this.props.setInfoMessage(`WINNER: ${p1score === p2score ? 'None - DRAW' : (p1score > p2score ? 'P1' : 'P2') }`)
            }
        }
    }

    calculateScore(): {p1score: number, p2score: number} {
        let p1score = 0
        let p2score = 0
        const p1Edges = this.props.p1Edges
        const p2Edges = this.props.p2Edges
        const edges = this.props.edges
        
        if(edges && edges.length > 0) {
            if(p1Edges && p1Edges.length > 0)
                    p1Edges.forEach((index:number) => p1score+= edges[index].points )
            
            if(p2Edges && p2Edges.length > 0)
                p2Edges.forEach((index:number) => p2score+= edges[index].points )
        }
        return {p1score, p2score}
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

    getConnectedNodesByRow(row:number) {
        let connNodes = this.getConnectedNodes()
        let connectedNodesOnRow:number[] = []

        connNodes.forEach((conn:number) => {
            if(this.props.nodes[conn][0] === row)
            connectedNodesOnRow.push(this.props.nodes[conn][1])
        })
            
        return connectedNodesOnRow
    }

    edgeClick = (edge:Edge) => {
        if(this.props.nodes.length === this.getConnectedNodes().length) {
            this.props.setErrorMessage("ALL NODES REACHED - GAME IS DONE!!!!")
        } else {
            if( this.state.connectedNodes.includes(edge.firstNode) || this.state.connectedNodes.includes(edge.secondNode) ) {
                let edgeIndex = this.props.edges.findIndex( (propEdge: Edge) => propEdge===edge)
                if(edgeIndex>=0 && !this.props.p1Edges.includes(edgeIndex) && !this.props.p2Edges.includes(edgeIndex)) {
                    this.props.claimEdge(edge, this.p1sTurn)
                    this.props.resetFeedback()
                    this.p1sTurn = !this.p1sTurn
                } else {
                    this.props.setErrorMessage("EDGE ALREADY CLAIMED")
                }
            } else {
                this.props.setErrorMessage("INVALID EDGE SELECTION")
            }
        }
    }

    edgeHover = (points: number|undefined) => {
        this.props.updateHovered(points)
    }

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

            return <EdgeComponent top={top} left={left} width={width} rotation={rotation} zIndex={index} edge={edge} colour={clr} dispatchClick={this.edgeClick} dispatchHover={this.edgeHover} key={"edge" + Math.random + index}/>
        })

        return toRet
    }

    // TODO: Should probably move toRender and renderEdges() elsewhere
    render(){
        if(this.props.grid) {
            let toRender = this.props.grid.map((row: Block[], index: number) => {
                return <Row blocks={row} rowIndex={index} connectedNodes={this.getConnectedNodesByRow(index)} key={"Row"+index}/>
            })
        
            return(
                <>
                <BaseGrid style={{width: `${50*this.props.rows}`, backgroundColor: 'pink'}}>
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