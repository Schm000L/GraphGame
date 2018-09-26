import { ColumnsState, ColumnsActions, columnsReducer, initialColumnState } from './columns';
import { GridState, GridActions, gridReducer, initialGridState } from './grid';

import { combineReducers, Reducer } from 'redux';

export type RootActions = ColumnsActions|GridActions
export type RootState = {
    columns: ColumnsState
    grid: GridState
}

export const initialState: RootState = {
    columns: initialColumnState,
    grid: initialGridState
}
export const rootReducer: Reducer<RootState, RootActions> = combineReducers({
    columns: columnsReducer,
    grid: gridReducer
});
