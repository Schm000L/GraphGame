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
        return <EdgeBox>Edge score: {this.props.points !== undefined ? this.props.points : '-'}</EdgeBox>
    }
}

export default connect(mapStateToProps, {})(EdgeScore)