import * as React from 'react'
import styled from 'styled-components'
import Grid from './grid';
import EdgeScore from './edgescore'
import RoundScore from './roundscore'
import logo from '../logo.svg';
import { ROWS, COLUMNS, BLOCKSIZE } from '../config'
import { Block, Edge, Node } from '../helpers/customtypes'


import { updateBlock, changeGrid } from '../state-management/grid'
import { changeEdges, resetClaimedEdges,EdgeState } from '../state-management/edges'
import { changeNodes } from '../state-management/nodes'
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import { FeedbackMessage, FeedbackState  } from '../state-management/feedback'

/* TODO:
 * Move some logic from grid.tsx to mainpage
 * Display score
 * Clearly display winner
 * Add reset/newgame via button
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
const GameScoreContainer = styled.div`
    margin: 0 auto;
    height: inherit;
    width: 400px;
    background:red;
    display:flex;
    flex-direction:row;
`

type GameScore = {
    p2?: boolean
}

const GameScoreBox = styled.div`
    display:flex;
    box-sizing:border-box;
    height:inherit;
    width: 200px;
    border-right:5px solid black;
    background: ${(props: GameScore) => props.p2 ? 'green' : 'blue'};
    justify-content:center;
    align-items:center;
`

// TODO: Change ErrorBox to feedback box: Green for positive, red for negative.
const FBox = styled.div`
    box-sizing:border-box;
    margin:0 auto;
    width:200px;
    height:100px;
    background: ${(props: {error: boolean}) => props.error ? 'red' : 'green'};
    margin-bottom:10px;
    display:flex;
    justify-content: center;
    align-items:center;
    text-align:center;
`

const FeedbackBox = (props: FeedbackState) => {
    if(props.feedbackMessage)
        return <FBox error= {props.error}> {props.feedbackMessage} </FBox>
    else 
        return <></>
    }
const GameArea = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:${ROWS*BLOCKSIZE}px;
`

const Container = styled.div`
    width:${(1920 - COLUMNS*BLOCKSIZE) / 2}px;
    height: inherit;
    background:brown;
    display:flex;
    justify-content: center;
    align-items:center;
`

const Header = (props: {p1score: number, p2score:number} ) => {
    return (
        <HeadBanner>
            <Logo src={logo} alt="logo" />
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
        this.props.resetClaimedEdges()
        this.props.changeEdges(this.edges)
        this.props.changeNodes(this.nodes)


        this.setState({loading: false})
    }
  
    render(){
        if(!this.state.loading)
            return(
                <>
                    <Header p1score={this.state.p1Score} p2score={this.state.p2Score} />
                    <EdgeScore />
                    <GameArea>
                        <Container>
                        <FeedbackBox feedbackMessage={this.props.feedbackMessage} error={this.props.error}/>
                        </Container>
                        <Grid gameScoreUpdate={this.gameScoreUpdate} rows={ROWS} columns={COLUMNS} nodes={this.nodes}/>
                        <Container/>
                    </GameArea>
                    <RoundScore/>
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