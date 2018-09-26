import {ROWS, COLUMNS} from '../config'

type ChangeBlock = 'CHANGE_BLOCK'

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





export type GridState = {
  grid: BLOCK[][]
} 

let grid: BLOCK[][] = []
for(let i = 0; i<ROWS;i++){
    grid[i] = []
    for(let j=0;j<COLUMNS;j++) {
        grid[i][j] = "EMPTYBLOCK"
    }
}

export const initialGridState: GridState = {
    grid: grid
}

type ChangeAction = {
    type: ChangeBlock
    row: number
    column: number
    block: BLOCK
  }

export const changeColumns = (row: number, column: number, block:BLOCK):ChangeAction => ({
    type: 'CHANGE_BLOCK',
    row: row,
    column: column,
    block: block
  })

export type GridActions = ChangeAction

export const gridReducer = (state: GridState = initialGridState, action: GridActions ) => {
    switch (action.type) {

      case 'CHANGE_BLOCK':
      state.grid[action.row][action.column] = action.block
      return Object.assign({},state, grid)

      default:
        return state
    }
  
}