import * as React from 'react'
import { connect } from 'react-redux';
import { RootState } from '../state-management/combiner';
import { ScoreBox } from './gridcomponents'

interface EdgeScoreState {
}

interface EdgeScoreProps extends StateProps, DispatchProps {
}

interface StateProps {
    points: number|undefined
} 

interface DispatchProps {
}

const mapStateToProps = (state: RootState) => {
    return {
        points: state.hoveredReducer.points
    }
}

class EdgeScore extends React.Component<EdgeScoreProps,EdgeScoreState> {
    render(){
        return <ScoreBox>Edge score: {this.props.points !== undefined ? this.props.points : '-'}</ScoreBox>
    }
}

export default connect(mapStateToProps, {})(EdgeScore)