import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Catalogue from './components/Catalogue';
import About from './components/About';
import Contact from './components/Contact';
import Meal from './components/Meal';
import MealCategory from './components/MealCategory';
import Recipe from './components/Recipe';

import { Provider } from 'mobx-react';
import ProductStore from './stores/ProductStore';
import userStore from './stores/UserStore';

class App extends Component {
  render() {
    return (
      <Provider productStore={ProductStore} userStore={userStore}>
        <Router>
          <div className="App">
            <div className="main-wrapper">

            <div className="nav-wrapper">
              <Link  className="nav-links" to="/">Catalogue</Link>
              <Link  className="nav-links" to="/about/2">About</Link>
              <Link  className="nav-links" to="/contact">Contact</Link>
              <Link  className="nav-links" to="/meal">Meal</Link>
            </div>
              
            

              <Route exact path="/" component={Catalogue} />
              <Route path="/about/:id" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/meal" component={Meal} />
              <Route path="/meal-category" component={MealCategory} />
              <Route path="/recipe" component={Recipe} />
              {/*  */}
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;