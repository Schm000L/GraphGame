import * as React from 'react'
import styled from 'styled-components'
import Grid from './grid';
import EdgeScore from './edgescore'
import logo from '../logo.svg';
import { ROWS, COLUMNS } from '../config'
import { Block, Edge, Node } from '../helpers/customtypes'


import { updateBlock, changeGrid } from '../state-management/grid'
import { changeEdges, EdgeState } from '../state-management/edges'
import { changeNodes } from '../state-management/nodes'
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';

/* TODO:
 * Move some logic from grid.tsx to mainpage
 * Display score
 * Add end-condition - DONE
 * Clearly display winner
 * Add reset/newgame via button
 * Put the nodes above the edges or hide/remove the edge part that overlaps a node
 */

const ResetButton = styled.button`
    background-color:red;
    float:right;
`

const HeadBanner = styled.header `
    background-color: #222;
    width: 100%;
    height: 90px;
    margin-bottom:10px;
    color: white;
`
const Logo = styled.img`
    animation: App-logo-spin infinite 20s linear;
    height: 80px;
    @keyframes App-logo-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    position:absolute;
    top:5px;
`
const GameScoreBox = styled.div`
    margin: 0 auto;
    height: inherit;
    width: 400px;
    background:red;
    display:flex;
    flex-direction:row;
`
const P1GameScore = styled.div`
    display:flex;
    box-sizing:border-box;
    height:inherit;
    width: 200px;
    border-right:5px solid black;
    background:blue;
    justify-content:center;
    align-items:center;
`

const P2GameScore = styled.div`
    display:flex;
    box-sizing:border-box;
    height:inherit;
    width: 200px;
    border-left: 5px solid black; 
    background:green;
    justify-content: center;
    align-items:center;
`
const RoundScore = styled.div`
    height: 40px;
    width: 80px;
    background:red;
    display:flex;
    flex-direction:row;
`

// const ErrorBox = styled.div`
//     box-sizing:border-box;
//     margin:0 auto;
//     width:400px;
//     height:25px;
//     background:hotpink;
//     margin-bottom:10px;
// `


const Header = (props: {p1score: number, p2score:number} ) => {
    return (
        <HeadBanner>
            <Logo src={logo} alt="logo" />
            <GameScoreBox>
                <P1GameScore> {props.p1score >= 0 ? props.p1score : '-'} </P1GameScore>
                <P2GameScore> {props.p2score >= 0 ? props.p2score : '-'} </P2GameScore>
            </GameScoreBox>
        </HeadBanner>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
      grid: state.gridReducer.grid,
      edgeReducer: state.edgeReducer
    }
  }

const mapDispatchToProps = (dispatch: any) => {
    return {
      updateBlock: (block: Block, row: number, column: number) => dispatch(updateBlock(block, row, column)),
      changeGrid: (grid: Block[][]) => dispatch(changeGrid(grid)),
      changeEdges: (edges: Edge[]) => dispatch(changeEdges(edges)),
      changeNodes: (nodes: Node[]) => dispatch(changeNodes(nodes))
    }
}

interface MainPageState {
    loading: boolean,
    p1Score: number,
    p2Score: number
}

interface MainPageProps extends StateProps, DispatchProps {

}

interface StateProps {
    grid: Block[][],
    edgeReducer: EdgeState
} 

interface DispatchProps {
    updateBlock: typeof updateBlock,
    changeGrid: typeof changeGrid,
    changeEdges: typeof changeEdges,
    changeNodes: typeof changeNodes
}

class MainPage extends React.Component<MainPageProps, MainPageState> {

    p1sTurn: boolean = true;
    distance = 2
    nodes = this.createNodes3();
    edges = this.populateTree(this.nodes);
    resetStyle = {}

    constructor(props: MainPageProps){
        super(props)
        this.state = {
            loading: true,
            p1Score: 0,
            p2Score: 0
        }
    }
 
    createNodes2():Node[] {
        let nodes:Node[] = [[4,0]]
        for(let j = 2; j<=COLUMNS; j+=this.distance) { // COLUMNS
            for(let i = 0; i<=ROWS;i+=this.distance){ // ROWS    
                if(Math.random() >= 0.5) {
                    nodes.push([i, j])
                }
            }
        }
        return nodes
    }

    createNodes3():Node[] {
        let nodes:Node[] = [[4,0]]
        for(let i = 2; i<=COLUMNS; i+=this.distance) { // COLUMNS
            let nodesAtColumn = 0
            let j=0
            while(nodesAtColumn<1+Math.floor(Math.random()*2.5)) {
                j = (j+this.distance) % (ROWS-1)
                if(Math.random() >= 0.3) {
                    nodesAtColumn++
                    nodes.push([j, i])
                }
            }
        }
        return nodes
    }

    // TODO: Ensure at least 1 node per column
    createNodes():Node[] {
        let nodes: Node[]=[[4,0]];
        for(let i = 0; i<=ROWS;i+=this.distance){ // ROWS
            for(let j = 2; j<=COLUMNS; j+=this.distance) { // COLUMNS
                if(Math.random() >= 0.6)
                    nodes.push([i, j])
            }
        }
        return nodes;
    }

    // TODO: Skriv roligare generering av träd (ej kompletta träd.)
    // Skriv om så att den endast genererar bågar till noder 2 column bort.
    populateTree(nodes:Node[]) {
        let n:number = nodes.length
        let edges: Edge[] = [];
        for(let i=0; i<n; i++) {
            for(let j=0; j<n; j++) {
                if(i<j && (nodes[j][1]-nodes[i][1]===this.distance||nodes[j][1]===nodes[i][1])) {
                    let edge: Edge = {firstNode: i, secondNode: j, points: Math.floor(Math.random()*6)+1};
                    edges.push(edge);
                }
            }
        }
        return edges;
    }

    componentDidMount(){
        let grid:Block[][] = []
        for(let i = 0; i<ROWS; i++) {
            grid[i] = []
            for(let j=0; j<COLUMNS;j++) {
                grid[i][j] = "EMPTYBLOCK"
            }
        }

        this.nodes.forEach((node:Node) => {
            grid[node[0]][node[1]] = "NODE"
        })
        //Seems to be a bug where changeGrid gets called twice with grid as undefined the second time
        // FIX THE BUG, partial solution is to add checking to input in the reducer
        this.props.changeGrid(grid)
        this.props.changeEdges(this.edges)
        this.props.changeNodes(this.nodes)

        this.setState({loading: false})
    }

    // TODO: Reset selected edges variables.
    // Create variables such that there are
    // variables for points during this game
    // and total points
    resetGrid = () => {
        this.setState({loading: true})
        
        this.nodes = this.createNodes3();
        this.edges = this.populateTree(this.nodes);
        let grid:Block[][] = []
        for(let i = 0; i<ROWS; i++) {
            grid[i] = []
            for(let j=0; j<COLUMNS;j++) {
                grid[i][j] = "EMPTYBLOCK"
            }
        }

        this.nodes.forEach((node:Node) => {
            grid[node[0]][node[1]] = "NODE"
        })
        this.props.changeGrid(grid)
        this.props.changeEdges(this.edges)
        this.props.changeNodes(this.nodes)

        this.setState({loading: false})
    }
  
    render(){
        if(!this.state.loading)
            return(
                <>
                    <Header p1score={0} p2score={-1} />
                    <EdgeScore />
                    <Grid rows={ROWS} columns={COLUMNS} nodes={this.nodes}/>
                    <RoundScore></RoundScore>
                    <ResetButton style={this.resetStyle} onClick={this.resetGrid}>NEW GRAPH</ResetButton>
                </>
            )
        return(
            <>
                <Header p1score={0} p2score={0}/>
                <p>We loading</p>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)