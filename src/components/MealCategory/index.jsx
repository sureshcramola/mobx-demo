import React, { Component } from 'react';

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product:{}
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.id);

    fetch(`https://reqres.in/api/unknown/`+params.id) 
      .then(response => response.json()
        
      )
      .then( product=> {
          this.setState({ product: product.data},()=> console.log(this.state.product) );
      }).catch(error => console.log(error));
  }

  renderData(){
    const { product } = this.state;
    console.log(Object.keys(product).length,this.state.product);
    
    if(Object.keys(product).length > 0) {
      return (
        <div style={{margin: "0 auto",width:300}}>
          <p>Product ID: {product.id}</p>
          <p>Product Name: {product.name}</p>
          <p>year: {product.year}</p>
          <p>Product Color: {product.color}</p>
        </div>
      )
    }
    
  }

  render() {
    
    return (
      <section className="product-wrapper">
        <div className="d-flex flex-row-wrap-center">
          About US
        </div>
        {this.renderData()}
      </section>
    )
  }
}

export default About;
