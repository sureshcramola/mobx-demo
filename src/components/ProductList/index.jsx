import React, { Component } from 'react';
import { inject, observer} from 'mobx-react';

class ProductList extends Component {

  renderProducts() {

    return this.props.ProductStore.products.map((product, productID) => {
      console.log(product);
      return (
        <tr key={productID}>
          <td className="">{product.productId}</td>
          <td className="">{product.productName}</td>
          <td className="">{product.productPrice}</td>
        </tr>
      )
    })
  }

  render() {
    const {ProductStore} = this.props;

    if (ProductStore.products.length <= 0) {
      return (
        <div></div>
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
          </tbody>
        </table>

      </section>
    )
  }
}
ProductList = observer(ProductList);

export default ProductList;
