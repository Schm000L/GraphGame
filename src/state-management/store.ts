import { createStore } from 'redux'
import {rootReducer, initialRootState} from './combiner'
// const store = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;
const store: any = enhancer(rootReducer, initialRootState);

export default store