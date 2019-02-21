import {Reducer, combineReducers} from 'redux'
import {GridState, gridReducer} from './grid'
import { EdgeState, edgeReducer} from './edges'
import { NodeState, nodeReducer} from './nodes'
import { HoveredState, hoveredReducer} from './hovered'

export interface RootState {
    gridReducer: GridState,
    edgeReducer: EdgeState,
    nodeReducer: NodeState,
    hoveredReducer: HoveredState
}

export const rootReducer: Reducer<RootState>  = combineReducers( {
    gridReducer,
    edgeReducer,
    nodeReducer,
    hoveredReducer
})