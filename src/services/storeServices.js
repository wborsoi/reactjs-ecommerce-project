import STORE_ALL_PRODUCTS from './products.json';
import {ROUTES} from '../utils/navbar-routes';

export function getProductByID(productId) {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            const response = STORE_ALL_PRODUCTS.filter((product) => String(product.id) === String(productId))[0];
            resolve(response);
        }, 1500);
    });
}

export function getAllProducts() {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve(STORE_ALL_PRODUCTS);
        }, 1500);
    });
}

export function getAllProductsByCategory(categoryPath) {
    if(categoryPath){
        const categoria = ROUTES.filter((route) => route.id === categoryPath);
        console.log("Categoria encontrada: ", categoria);
    }
}

export function getAllProductsBySubCategory(subCategoryPath) {
    
}