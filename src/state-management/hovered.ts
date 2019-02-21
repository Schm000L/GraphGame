import {Action, Reducer} from 'redux'

const intialState: HoveredState = {
    points: undefined,
}

export interface HoveredState {
    points: number|undefined
}

const UPDATE_HOVERED = "UPDATE_HOVERED"

export interface hoveredAction extends Action, updateHoveredAction {}

export interface updateHoveredAction {
    points: number|undefined
}


export const updateHovered = (points: number|undefined) => ({
        type: UPDATE_HOVERED,
        points: points
})

export const hoveredReducer: Reducer<HoveredState> = (state: HoveredState=intialState, action:hoveredAction) => {
    switch(action.type) {
        case UPDATE_HOVERED:
            return Object.assign({}, state, {points:action.points})
        default:
            return state
    }
}