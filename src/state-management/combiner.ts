import {Reducer, combineReducers} from 'redux'
import {GridState, gridReducer} from './grid'


export interface RootState {
    gridReducer: GridState
}

export const rootReducer: Reducer<RootState>  = combineReducers( {
    gridReducer
})