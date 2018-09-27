import * as React from 'react';
import MainPage from './components/mainpage';
import { Provider } from 'react-redux'
import store from './state-management/store'

class App extends React.Component {
  render() {
    if(store) 
    return (
      <Provider store={store}>
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
