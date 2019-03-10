import { Action, Reducer } from 'redux'

export type FeedbackMessage = string

const intialState: FeedbackState = {
    feedbackMessage: undefined,
    error: true,
}

export interface FeedbackState {
    feedbackMessage: string|undefined,
    error: boolean
}

const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_INFO_MESSAGE = "SET_INFO_MESSAGE"
const RESET_FEEDBACK = "RESET_FEEDBACK"

export interface feedbackAction extends Action, updateFeedbackAction {}

export interface updateFeedbackAction {
    feedbackMessage: FeedbackMessage
}

export const setErrorMessage = (feedbackMessage: FeedbackMessage) => ({
        type: SET_ERROR_MESSAGE,
        feedbackMessage: feedbackMessage
})

export const setInfoMessage = (feedbackMessage: FeedbackMessage) => ({
    type: SET_INFO_MESSAGE,
    feedbackMessage: feedbackMessage
})

export const resetFeedback = () => ({
    type: RESET_FEEDBACK,
})

export const feedbackReducer: Reducer<FeedbackState> = (state: FeedbackState=intialState, action:feedbackAction) => {
    switch(action.type) {
        case SET_ERROR_MESSAGE:
            return Object.assign({}, state, {feedbackMessage:action.feedbackMessage, error: true})
        case SET_INFO_MESSAGE:
            return Object.assign({}, state, {feedbackMessage:action.feedbackMessage, error: false})
        case RESET_FEEDBACK:
            return Object.assign({}, state, {feedbackMessage:undefined, error: true})
        default:
            return state
    }
}