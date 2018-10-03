import {Reducer, combineReducers} from 'redux'
import {GridState, gridReducer} from './grid'
import { EdgeState, edgeReducer} from './edges'

export interface RootState {
    gridReducer: GridState,
    edgeReducer: EdgeState
}

export const rootReducer: Reducer<RootState>  = combineReducers( {
    gridReducer,
    edgeReducer
})