import * as React from 'react';
import MainPage from './components/mainpage';
import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import {combiner} from '../state-management/combiner'
let store:any
//const store = createStore(combiner)

class App extends React.Component {
  render() {
    if(store) 
    return (<Provider store={store}>
        <MainPage/>
        </Provider>
    )
    else
    return (
      <MainPage/>
    )
  }
}

export default App;
