import React, { Component } from 'react';

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe:[]
    }
  }

  componentDidMount() {
    const { mealId } = this.props.location;
    console.log(mealId);

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=`+mealId) 
      .then(response => response.json())
      .then( recipe=> {
          localStorage.setItem('token', 'rec54534534');

          this.setState({ recipe: recipe.meals},()=> console.log(this.state.recipe) );
      }).catch(error => console.log(error));
  }

  renderData(){
    const { recipe } = this.state;
    if(recipe != null){
      return recipe.map((mealItem, itemID) => {
        console.log("token",localStorage.length);
        return (
          <div className="col-lg-12 mt-30">
            <div key={itemID} className="card h-100">
              <img className="card-img-top" src={mealItem.strMealThumb}/>
              <div className="card-body">
                <h5 className="card-title">{mealItem.strCategory}</h5>
                <p>{mealItem.strInstructions}</p>
                <a href="#">{mealItem.strYoutube}</a>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    
    return (
      <section className="recipe-wrapper">
        <div className="container">
          {/* <div className="d-flex flex-row-wrap-center">
            Available Meals
          </div> */}
          <div className="row">
            {this.renderData()}
          </div>
        </div>
      </section>
    )
  }
}

export default Recipe;
