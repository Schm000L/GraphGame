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

const UPDATE_EDGE = "UPDATE_EDGE"
const CHANGE_EDGES = "CHANGE_EDGES"
const CLAIM_EDGE = "CLAIM_EDGE"

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
        type: UPDATE_EDGE,
        edge: edge,
        node: node
})

export const changeEdges = (edges: Edge[]) => ({
    type: CHANGE_EDGES,
    edges: edges
})

export const claimEdge = (edge:Edge, player: boolean) => ({
    type: CLAIM_EDGE,
    edge: edge,
    player: player
})

export const edgeReducer: Reducer<EdgeState> = (state: EdgeState=intialState, action:edgeAction) => {
    switch(action.type) {
        case UPDATE_EDGE:
        // Kanske måste gå tillbaka till Object.assign
            return Object.assign({}, state, {edge:action.edge})
        
        case CHANGE_EDGES:
          return Object.assign({}, state, {edges:action.edges})
            
        // TODO: Do check to not allow duplicates and claiming the other player's edges
        case CLAIM_EDGE:
            return action.player ? Object.assign({}, state, {p1Edges: [...state.p1Edges, action.edge]}) : Object.assign({},state, {p2Edges: [...state.p2Edges, action.edge]})

        default:
            return state
    }
}