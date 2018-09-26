
type ChangeColumns = 'CHANGE_COLUMNS'

type ChangeAction = {
  type: ChangeColumns
  columns: number
}

export type ColumnsState = {
  columns: number
} 

export const initialColumnState: ColumnsState = {
  columns: 0
}

export const changeColumns = (columns: number):ChangeAction => ({
    type: 'CHANGE_COLUMNS',
    columns: columns
  })

export type ColumnsActions = ChangeAction

export const columnsReducer = (state: ColumnsState = initialColumnState, action: ColumnsActions ) => {
    switch (action.type) {

      case 'CHANGE_COLUMNS':
      return Object.assign({},state, action.columns)

      default:
        return state
    }
  
}