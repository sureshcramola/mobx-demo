import React, { Component } from 'react';
import './App.scss';
import Catalogue from './components/Catalogue';
import { Provider } from 'mobx-react';
import ProductStore from './stores/ProductStore';
import userStore from './stores/UserStore';

class App extends Component {
  render() {
    return (
      <Provider productStore={ProductStore} userStore={userStore}>
        <div className="App">
          <div className="main-wrapper">
            <Catalogue productStore={ProductStore} />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;