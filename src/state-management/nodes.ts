import {Action, Reducer} from 'redux'
import {Node} from '../config';

const intialState: NodeState = {
    nodes: [[4,0]]
}

export interface NodeState {
    nodes: Node[]
}

const CHANGE_NODES = "CHANGE_NODES"

export interface nodeAction extends Action, changeNodesAction{}

export interface changeNodesAction {
    nodes:Node[]
}

export const changeNodes = (nodes: Node[]) => ({
    type: CHANGE_NODES,
    nodes: nodes
})

export const nodeReducer: Reducer<NodeState> = (state: NodeState=intialState, action:nodeAction) => {
    switch(action.type) {
        case CHANGE_NODES:
            console.log("NODE REDUCER CHANGE_NODES")
          return Object.assign({}, state, {nodes: action.nodes})
            
        default:
            return state
    }
}