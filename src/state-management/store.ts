// import * as React from 'react'
import {createStore, Store} from 'redux'
import {GridState, gridReducer} from './grid'
import { composeWithDevTools } from 'redux-devtools-extension'

const store:Store<GridState> = createStore(gridReducer,composeWithDevTools())
export default store