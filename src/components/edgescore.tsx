import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';

const EdgeBox = styled.div`
    display:flex;
    box-sizing:border-box;
    margin:0 auto;
    width:400px;
    height:25px;
    background:hotpink;
    margin-bottom:10px;
    align-items:center;
    justify-content:center;
`

// const EdgeScore = (props: {score?: number}) => {
//     return <EdgeBox>Edge score: {props.score !== undefined ? props.score : '-'}</EdgeBox>
// }

interface EdgeScoreState {
    // connectedNodes: number[]
}

interface EdgeScoreProps extends StateProps, DispatchProps {

}

interface StateProps {
    points: number|undefined
} 

interface DispatchProps {
    // updateBlock: typeof updateBlock,
}

const mapStateToProps = (state: RootState) => {
    return {
        points: state.hoveredReducer.points
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
    //   updateBlock: (block: Block, row: number, column: number) => dispatch(updateBlock(block, row, column)),
    }
}

class EdgeScore extends React.Component<EdgeScoreProps,EdgeScoreState> {
    // componentDidUpdate(prevProps: EdgeScoreProps, prevState: EdgeScoreState) {
        // if(prevProps.points !== this.props.p1Edges || prevProps.p2Edges !== this.props.p2Edges) {
        //     this.setState({connectedNodes: this.getConnectedNodes()})
        //     this.calculateScore()
        // }
    // }

    render(){
        return <EdgeBox>Edge score: {this.props.points !== undefined ? this.props.points : '-'}</EdgeBox>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeScore)