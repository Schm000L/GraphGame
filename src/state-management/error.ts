import {Action, Reducer} from 'redux'

export type ErrorMessage = string|undefined

const intialState: ErrorState = {
    errorMessage: undefined,
}

export interface ErrorState {
    errorMessage: ErrorMessage
}

const UPDATE_ERROR_MESSAGE = "UPDATE_ERROR_MESSAGE"

export interface errorAction extends Action, updateErrorAction {}

export interface updateErrorAction {
    errorMessage: ErrorMessage
}


export const updateError = (errorMessage: ErrorMessage) => ({
        type: UPDATE_ERROR_MESSAGE,
        errorMessage: errorMessage
})

export const errorReducer: Reducer<ErrorState> = (state: ErrorState=intialState, action:errorAction) => {
    switch(action.type) {
        case UPDATE_ERROR_MESSAGE:
            return Object.assign({}, state, {errorMessage:action.errorMessage})
        default:
            return state
    }
}