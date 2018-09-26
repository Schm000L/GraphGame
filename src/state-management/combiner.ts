import { ColumnsState, ColumnsActions, columnsReducer, initialColumnState } from './columns';
import { combineReducers, Reducer } from 'redux';

export type RootActions = ColumnsActions
export type RootState = {
    columns: ColumnsState
}

export const initialRootState = initialColumnState
export const rootReducer: Reducer<RootState, RootActions> = combineReducers({
    columns: columnsReducer
});
