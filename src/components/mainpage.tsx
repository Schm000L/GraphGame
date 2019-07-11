import * as React from 'react'
import Grid from './grid';
import EdgeScore from './edgescore'
import RoundScore from './roundscore'
import logo from '../logo.svg';
import { ROWS, COLUMNS, BLOCKSIZE } from '../config'
import { Block, Edge, Node } from '../helpers/customtypes'
import { HeadBanner, GameScoreContainer, GameScoreBox, GameArea, SideContainer, FeedbackBox, Logo, ResetButton } from './gridcomponents'
// import {TopContainer} from './gridcomponents'

import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import { updateBlock, changeGrid } from '../state-management/grid'
import { changeEdges, resetClaimedEdges,EdgeState } from '../state-management/edges'
import { changeNodes } from '../state-management/nodes'
import { FeedbackMessage } from '../state-management/feedback'
import styled from 'styled-components';

/* TODO:
 * Move some logic from grid.tsx to mainpage
 * Cleary show whose turn it is
 */

// type GameScore = {
//     p2?: boolean
// }

// const FBox = styled.div`
//     box-sizing:border-box;
//     margin:0 auto;
//     width:200px;
//     height:100px;
//     background: ${(props: {error: boolean}) => props.error ? 'red' : 'green'};
//     margin-bottom:10px;
//     display:flex;
//     justify-content: center;
//     align-items:center;
//     text-align:center;
// `

const BottomRow = styled.div`
    height: 25px;
    width:${COLUMNS*BLOCKSIZE}px;
    box-sizing: border-box;
    display:flex;
    flex-direction: row; 
    margin:0 auto;
    justify-content:space-between;
`

const DummyDiv = styled.div`
    height:25px;
    width:90px;
`

const Header = (props: {p1score: number, p2score:number, newGame?:() => void} ) => {
    return (
        <HeadBanner>
            <Logo src={logo} alt="logo" onClick={props.newGame ? props.newGame : ()=>{}}/>
            <GameScoreContainer>
                <GameScoreBox> {props.p1score >= 0 ? props.p1score : '-'} </GameScoreBox>
                <GameScoreBox p2> {props.p2score >= 0 ? props.p2score : '-'} </GameScoreBox>
            </GameScoreContainer>
        </HeadBanner>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
      grid: state.gridReducer.grid,
      edgeReducer: state.edgeReducer,
      feedbackMessage: state.feedbackReducer.feedbackMessage,
      error: state.feedbackReducer.error
    }
  }

const mapDispatchToProps = (dispatch: any) => {
    return {
      updateBlock: (block: Block, row: number, column: number) => dispatch(updateBlock(block, row, column)),
      changeGrid: (grid: Block[][]) => dispatch(changeGrid(grid)),
      changeEdges: (edges: Edge[]) => dispatch(changeEdges(edges)),
      changeNodes: (nodes: Node[]) => dispatch(changeNodes(nodes)),
      resetClaimedEdges: () => dispatch(resetClaimedEdges())
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
    edgeReducer: EdgeState,
    feedbackMessage: FeedbackMessage,
    error: boolean
} 

interface DispatchProps {
    updateBlock: typeof updateBlock,
    changeGrid: typeof changeGrid,
    changeEdges: typeof changeEdges,
    changeNodes: typeof changeNodes,
    resetClaimedEdges: typeof resetClaimedEdges
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

    nodeInArr(nodes:Node[], node:Node) {
        let ret = false
        nodes.forEach( (n:Node) => {
            if(n[0] === node[0] && n[1] === node[1])
                ret = true
        })
        return ret
    }

    createNodes3():Node[] {
        let nodes:Node[] = [[4,0]]
        for(let i = 2; i<=COLUMNS; i+=this.distance) { // COLUMNS
            let nodesAtColumn = 0
            let j=0
            let numNodes = 1+Math.floor(Math.random()*2.5)
            while(nodesAtColumn<numNodes) {
                j = (j+this.distance) % (ROWS-1)
                if(Math.random() >= 0.3  && !this.nodeInArr(nodes, [j, i])) {
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

    gameScoreUpdate = (p1: boolean) => {
        if(p1)
            this.setState({ p1Score: this.state.p1Score+1})
        else 
            this.setState({ p2Score: this.state.p2Score+1})
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

        this.props.changeGrid(grid)
        this.props.changeEdges(this.edges)
        this.props.changeNodes(this.nodes)

        this.setState({loading: false})
    }

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
        this.props.resetClaimedEdges()
        this.props.changeEdges(this.edges)
        this.props.changeNodes(this.nodes)


        this.setState({loading: false})
    }

    newGame = () => {
        this.setState({p1Score: 0, p2Score: 0})
        this.resetGrid()
    }
  
    render(){
        if(!this.state.loading)
            return(
                <>
                    {/* <Header p1score={this.state.p1Score} p2score={this.state.p2Score} />
                    <TopContainer>
                        <FeedbackBox feedbackMessage={this.props.feedbackMessage} error={this.props.error}/>
                        <ResetButton style={this.resetStyle} onClick={this.resetGrid}>NEW GRAPH</ResetButton>
                        <EdgeScore />
                    </TopContainer>
                    <GameArea>
                        <SideContainer/>
                        <Grid gameScoreUpdate={this.gameScoreUpdate} rows={ROWS} columns={COLUMNS} nodes={this.nodes}/>
                        <SideContainer/>
                    </GameArea>
                    <RoundScore/> */}
                    <Header p1score={this.state.p1Score} p2score={this.state.p2Score} newGame={this.newGame}/>
                    <EdgeScore />
                    <GameArea>
                        <SideContainer>
                        <FeedbackBox feedbackMessage={this.props.feedbackMessage} error={this.props.error}/>
                        </SideContainer>
                        <Grid gameScoreUpdate={this.gameScoreUpdate} rows={ROWS} columns={COLUMNS} nodes={this.nodes}/>
                        <SideContainer/>
                    </GameArea>
                    <BottomRow>
                        <DummyDiv/>
                        <RoundScore/>
                        <ResetButton style={this.resetStyle} onClick={this.resetGrid}>NEW GRAPH</ResetButton>
                    </BottomRow>
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