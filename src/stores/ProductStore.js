import { decorate, observable, configure, action, computed } from "mobx";

configure({ enforceActions: true });

class ProductStore {
    products = [];

    addProduct = (product) => {
        this.products.push(product);
    }

    deleteProduct = (productId) => {
        let updatedProduct = this.products.slice() //copy array from prevState
        updatedProduct.splice(productId, 1) // remove element
        this.products.replace(updatedProduct);
    }

    get totalPrice() {
        // let total = 0
        // this.employeesList.map(e => total = sum + e.salary)
        // return sum
    }

}

decorate(ProductStore, {
    products: observable,
    deleteProduct: action,
    addProduct: action,
    totalPrice: computed
})

const store = new ProductStore();
export default store;