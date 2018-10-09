import {Action, Reducer} from 'redux'
import {Edge, Node} from '../config';

const intialState: EdgeState = {
    edges: [],
    p1Edges:[],
    p2Edges: []
}

export interface EdgeState {
    edges: Edge[],
    p1Edges:number[],
    p2Edges: number[]
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
            return Object.assign({}, state, {edge:action.edge})
        
        case CHANGE_EDGES:
          return Object.assign({}, state, {edges:action.edges})
            
        // TODO: Do check to not allow duplicates and claiming the other player's edges
        case CLAIM_EDGE:
            let edgeIndex = state.edges.findIndex((edge:Edge) => edge===action.edge)
            if( edgeIndex>=0 && !state.p1Edges.includes(edgeIndex) && !state.p2Edges.includes(edgeIndex) ) 
                    return action.player ? Object.assign({}, state, {p1Edges: [...state.p1Edges, edgeIndex]}) : Object.assign({},state, {p2Edges: [...state.p2Edges, edgeIndex]})
            return state            

        default:
            return state
    }
}