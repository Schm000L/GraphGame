import { Action, Reducer } from 'redux'
import { ROWS } from '../config';
import { Block } from '../helpers/customtypes'

let initialGrid:Block[][] = []
for(let i = 0; i<ROWS; i++)
        initialGrid[i] = []
        
// for(let i = 0; i<ROWS; i++) {
//     initialGrid[i] = []
//     for(let j=0; j<COLUMNS;j++) {
//         NODE_POSITIONS[i] && NODE_POSITIONS[i].includes(j) ? initialGrid[i][j] = "NODE" : initialGrid[i][j] = "EMPTYBLOCK"
//     }
// }

export interface GridState {
    grid:Block[][]
}

const UPDATE_BLOCK = "UPDATE_BLOCK"
const CHANGE_GRID = "CHANGE_GRID"

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
        type: UPDATE_BLOCK,
        block: block,
        row: row,
        column: column
})

export const changeGrid = (grid:Block[][]) => ({
    type: CHANGE_GRID,
    grid: grid
})

export const gridReducer: Reducer<GridState> = (state: GridState= {grid: initialGrid}, action:gridAction) => {
    switch(action.type) {
        case UPDATE_BLOCK:
            let grid:Block[][] = []
            for(let i = 0; i<state.grid.length; i++) {
                grid[i] = [...state.grid[i]]
            }
            grid[action.row][action.column] = action.block
            return Object.assign({}, state, {grid:grid})
        
        case CHANGE_GRID:
          return action.grid ? Object.assign({}, state, {grid:action.grid}) : state
            
        default:
            return state
    }
}