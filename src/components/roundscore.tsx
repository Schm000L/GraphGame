import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import { Edge } from 'src/helpers/customtypes';

const RoundBox = styled.div`
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

interface RoundScoreState {
}

interface RoundScoreProps extends StateProps, DispatchProps {
}

interface StateProps {
    edges: Edge[],
    p1Edges:number[],
    p2Edges:number[],
} 

interface DispatchProps {
}

const mapStateToProps = (state: RootState) => {
    return {
        edges: state.edgeReducer.edges,
        p1Edges: state.edgeReducer.p1Edges,
        p2Edges: state.edgeReducer.p2Edges,
    }
}


class RoundScore extends React.Component<RoundScoreProps,RoundScoreState> {
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

    render(){
        let { p1score, p2score } = this.calculateScore()
        return <RoundBox> P1-score: {p1score} || P2-score: {p2score} </RoundBox>
    }
}

export default connect(mapStateToProps, {})(RoundScore)