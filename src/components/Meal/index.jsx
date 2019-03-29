import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Meal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meal:[]
    }
  }

  componentDidMount() {
    // const { match: { params } } = this.props;
    // console.log(params.id);

    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`) 
    .then(response => response.json())
    .then( meal=> {
      this.setState({ meal: meal.categories});
    }).catch(error => console.log(error));

  }

  renderData(){
    let { meal } = this.state;
    console.log(meal);
    
    return meal.map((mealItem, itemID) => {
      console.log(mealItem);
      return (
        <div className="col-lg-3 mt-30">
          <div key={itemID} className="card h-100">
            <img className="card-img-top" src={mealItem.strCategoryThumb}/>
            <div className="card-body">
              <h5 className="card-title">{mealItem.strCategory}</h5>
              <p class="card-text">{mealItem.strCategoryDescription.split(' ').slice(0, 15).join(" ")} .....</p>
              <Link className="btn btn-primary" to={{ pathname: '/meal-category', id: mealItem.strCategory }}>View</Link>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    
    return (
      <section className="product-wrapper">
        <div className="container">
          <div className="d-flex flex-row-wrap-center">
            Available Meals
          </div>
          <div className="row">
            {this.renderData()}
          </div>
        </div>
      </section>
    )
  }
}

export default Meal;
