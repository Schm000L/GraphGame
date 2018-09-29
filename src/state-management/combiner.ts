import {GridState, gridReducer} from './grid'
import {Reducer} from 'redux'

export interface RootState extends GridState {}

export const RootReducer: Reducer<RootState>  = gridReducer