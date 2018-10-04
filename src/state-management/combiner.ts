import {Reducer, combineReducers} from 'redux'
import {GridState, gridReducer} from './grid'
import { EdgeState, edgeReducer} from './edges'
import { NodeState, nodeReducer} from './nodes'

export interface RootState {
    gridReducer: GridState,
    edgeReducer: EdgeState,
    nodeReducer: NodeState
}

export const rootReducer: Reducer<RootState>  = combineReducers( {
    gridReducer,
    edgeReducer,
    nodeReducer
})