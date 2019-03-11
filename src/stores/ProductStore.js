import { decorate, observable, configure, action, computed } from "mobx";

// configure({ enforceActions: true });

class ProductStore {
    products = [
        // { productId:1, productName:"Shirt", productPrice:1199 },
        // { productId:2, productName:"T-shirt", productPrice:699 },
        // { productId:3, productName:"fdsfs", productPrice:123 },
        // { productId:4, productName:"Shirt", productPrice:1199 },
        // { productId:5, productName:"T-shirt", productPrice:699 },
        // { productId:6, productName:"fdsfs", productPrice:123 },
        // { productId:7, productName:"Shirt", productPrice:1199 },
        // { productId:8, productName:"T-shirt", productPrice:699 },
        // { productId:9, productName:"fdsfs", productPrice:123 },
        // { productId:10, productName:"fdsfs", productPrice:123 },
        // { productId:11, productName:"Shirt", productPrice:1199 },
        // { productId:12, productName:"T-shirt", productPrice:699 },
        // { productId:13, productName:"fdsfs", productPrice:123 },
        // { productId:14, productName:"T-shirt", productPrice:699 },
        // { productId:15, productName:"fdsfs", productPrice:123 },
    ];

    addProduct = (product) => {
        this.products.push(product);
    }

    deleteProduct = (productId) => {
        let updatedProduct = this.products.slice() //copy array from prevState
        updatedProduct.splice(productId, 1) // remove element
        this.products.replace(updatedProduct);
    }

    get totalPrice() {
        let total = 0;
        this.products.map(product => total = total + product.productPrice);
        console.log(total);
        return total
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