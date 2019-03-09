import React, { Component } from 'react';
import './App.scss';
import Catalogue from './components/Catalogue';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main-wrapper">
          <Catalogue />
        </div>
      </div>
    );
  }
}

export default App;