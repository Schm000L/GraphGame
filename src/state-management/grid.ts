import {Action, Reducer} from 'redux'
import {Block, ROWS, COLUMNS, NODE_POSITIONS } from '../config';



let initialGrid:Block[][] = []
for(let i = 0; i<ROWS; i++) {
    initialGrid[i] = []
    for(let j=0; j<COLUMNS;j++) {
        NODE_POSITIONS[i] && NODE_POSITIONS[i].includes(j) ? initialGrid[i][j] = "NODE" : initialGrid[i][j] = "EMPTYBLOCK"
    }
}

export interface GridState {
    grid:Block[][]
}

export enum gridActionTypes{
    UPDATE_BLOCK,
    CHANGE_GRID
}

export interface gridAction extends Action, updateBlockAction, changeGridAction {}

export interface updateBlockAction {
    block:Block,
    row: number,
    column: number
}

export interface changeGridAction {
    grid:Block[][]
}

export const updateBlock = (block:Block, row: number, column: number) => ({
        type: gridActionTypes.UPDATE_BLOCK,
        block: block,
        row: row,
        column: column
})

export const changeGrid = (grid:Block[][]) => ({
    grid: grid
})

export const gridReducer: Reducer<GridState> = (state: GridState= {grid: initialGrid}, action:gridAction) => {
    switch(action.type) {
        case gridActionTypes.UPDATE_BLOCK:
            let grid:Block[][] = []
            for(let i = 0; i<state.grid.length; i++) {
                grid[i] = [...state.grid[i]]
            }
            grid[action.row][action.column] = action.block
            return Object.assign({}, state, {grid:grid})
        
        case gridActionTypes.CHANGE_GRID:
          return Object.assign({}, state, {grid:action.grid})
            
        default:
            return state
    }
}