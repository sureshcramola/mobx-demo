import React, { Component } from 'react';
import { Link } from "react-router-dom";

class MealCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      food:[]
    }
  }

  componentDidMount() {
    const { id } = this.props.location;
    console.log(id);

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=`+id) 
      .then(response => response.json()
        
      )
      .then( food=> {
          this.setState({ food: food.meals},()=> console.log(this.state.food) );
      }).catch(error => console.log(error));
  }

  renderData(){
    const { food } = this.state;
    if(food != null){
      return food.map((mealItem, itemID) => {
        console.log(mealItem);
        return (
          <div className="col-lg-3 mt-30">
            <div key={itemID} className="card h-100">
              <img className="card-img-top" src={mealItem.strMealThumb}/>
              <div className="card-body">
                <h5 className="card-title">{mealItem.strMeal}</h5>
                <Link className="btn btn-primary" to={{ pathname: '/recipe', mealId: mealItem.idMeal }}>View Recipe</Link>
              </div>
            </div>
          </div>
        )
      })
    }
    
  }

  render() {
    
    return (
      <section className="food-wrapper">
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

export default MealCategory;
