import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Users from '../Users';

inject("ProductStore");

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct(id){
    console.log(id);
    this.props.productStore.deleteProduct(id)
  }

  renderProducts() {

    return this.props.productStore.products.map((product, productID) => {
      console.log(product);
      return (
        <tr key={productID}>
          <td className="">{product.productId}</td>
          <td className="">{product.productName}</td>
          <td className="">{product.productPrice} <span className="link-label"  onClick={(e) => this.deleteProduct(productID)}>Delete</span></td>
        </tr>
      )
    })
  }

  render() {
    const {productStore} = this.props;

    if (productStore.products.length <= 0) {
      return (
        <Users />
      )
    }

    return (

      <section className="product-list-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.renderProducts()}
            <tr>
              <td className=""></td>
              <td className="text-right"><strong>Total:</strong></td>
              <td className="">{productStore.totalPrice}</td>
            </tr>
          </tbody>
        </table>

      </section>
    )
  }
}
ProductList = observer(ProductList);

export default ProductList;
