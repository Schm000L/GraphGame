import {Action, Reducer} from 'redux'
import {Edge, Node} from '../config';

const intialState: EdgeState = {
    edges: [],
    p1Edges:[],
    p2Edges: []
}

export interface EdgeState {
    edges: Edge[],
    p1Edges:Edge[],
    p2Edges: Edge[]
}

export enum edgeActionTypes{
    UPDATE_EDGE,
    CHANGE_EDGES,
    CLAIM_EDGE
}



export interface edgeAction extends Action, updateEdgeAction, changeEdgesAction, claimEdgesAction {}

export interface updateEdgeAction {
    edge:Edge,
    node: Node
}

export interface changeEdgesAction {
    edges:Edge[]
}

export interface claimEdgesAction {
    edge: Edge,
    player: boolean
}

export const updateEdge = (edge:Edge, node: Node) => ({
        type: edgeActionTypes.UPDATE_EDGE,
        edge: edge,
        node: node
})

export const changeEdges = (edges: Edge[]) => ({
    type: edgeActionTypes.CHANGE_EDGES,
    edges: edges
})

export const claimEdge = (edge:Edge, player: boolean) => ({
    type: edgeActionTypes.CLAIM_EDGE,
    edge: edge,
    player: player
})

export const edgeReducer: Reducer<EdgeState> = (state: EdgeState=intialState, action:edgeAction) => {
    switch(action.type) {
        case edgeActionTypes.UPDATE_EDGE:
        // Kanske måste gå tillbaka till Object.assign
            return Object.assign({}, state, {edge:action.edge})
        
        case edgeActionTypes.CHANGE_EDGES:
          return Object.assign({}, state, {edges:action.edges})
            
        // TODO: Do check to not allow duplicates and claiming the other player's edges
        case edgeActionTypes.CLAIM_EDGE:
            return action.player ? Object.assign({}, state, {p1Edges: [...state.p1Edges, action.edge]}) : Object.assign({},state, {p2Edges: [...state.p2Edges, action.edge]})

        default:
            return state
    }
}