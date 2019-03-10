import { Reducer, combineReducers } from 'redux'
import { GridState, gridReducer } from './grid'
import { EdgeState, edgeReducer } from './edges'
import { NodeState, nodeReducer } from './nodes'
import { HoveredState, hoveredReducer } from './hovered'
import { FeedbackState, feedbackReducer } from './feedback'

export interface RootState {
    gridReducer: GridState,
    edgeReducer: EdgeState,
    nodeReducer: NodeState,
    hoveredReducer: HoveredState,
    feedbackReducer: FeedbackState
}

export const rootReducer: Reducer<RootState>  = combineReducers( {
    gridReducer,
    edgeReducer,
    nodeReducer,
    hoveredReducer,
    feedbackReducer
})