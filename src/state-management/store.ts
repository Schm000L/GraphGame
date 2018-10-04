import {createStore, Store} from 'redux'
import {RootState, rootReducer} from './combiner'
import { composeWithDevTools } from 'redux-devtools-extension'

const store:Store<RootState> = createStore(rootReducer,composeWithDevTools())
export default store