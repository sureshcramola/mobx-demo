import React, { Component } from 'react';
import './App.scss';
import Catalogue from './components/Catalogue';
import { Provider } from 'mobx-react';
import ProductStore from './stores/ProductStore';

class App extends Component {
  render() {
    return (
      <Provider productStore={ProductStore}>
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