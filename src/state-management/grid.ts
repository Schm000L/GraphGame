// import {ROWS, COLUMNS} from '../config'
import {Action, Reducer} from 'redux'
import { ROWS, COLUMNS } from '../config';

// type ChangeBlock = 'CHANGE_BLOCK'

type NODE = "NODE"
type EMPTYBLOCK = "EMPTYBLOCK"
type LEFTRIGHT = "LEFTRIGHT"
type UPDOWN = "UPDOWN"
type LEFTCENTER = "LEFTCENTER"
type LEFTDOWN = "LEFTDOWN"
type LEFTUP = "LEFTUP"
type RIGHTDOWN = "RIGHTDOWN"
type RIGHTUP = "RIGHTUP"
type ALLDIRECTIONS = "ALLDIRECTIONS"

type BLOCK = NODE|EMPTYBLOCK|LEFTRIGHT|UPDOWN|LEFTCENTER|LEFTDOWN|LEFTUP|RIGHTDOWN|RIGHTUP|ALLDIRECTIONS

let initialGrid: BLOCK[][] = []
for(let i = 0; i<ROWS; i++) {
    initialGrid[i] = []
    for(let j=0; j<COLUMNS;j++) {
        initialGrid[i][j] = "EMPTYBLOCK"
    }
}

export interface GridState {
    grid: BLOCK[][]
}

export enum gridActionTypes{
    UPDATE_BLOCK,
    CHANGE_GRID
}

export interface gridAction extends Action, updateBlockAction, changeGridAction {}

export interface updateBlockAction {
    block:BLOCK,
    row: number,
    column: number
}

export interface changeGridAction {
    grid: BLOCK[][]
}

export const updateBlock = (block: BLOCK, row: number, column: number) => ({
        type: gridActionTypes.UPDATE_BLOCK,
        block: block,
        row: row,
        column: column
})

export const changeGrid = (grid: BLOCK[][]) => ({
    grid: grid
})

export const gridReducer: Reducer<GridState> = (state: GridState= {grid: initialGrid}, action:gridAction) => {
    switch(action.type) {
        case gridActionTypes.UPDATE_BLOCK:
            let grid: BLOCK[][] = []
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