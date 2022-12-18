import STORE_ALL_PRODUCTS from './products.json';
import STORE_ALL_PRODUCTS_DUMMY from '../database/productosDummy.json'
import {ROUTES} from '../utils/navbar-routes';

const productNotFound = {
    name: "Producto no encontrado.",
    brand: {
        brandName: ""
    }
}

export function getProductByID(productId) {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            const response = STORE_ALL_PRODUCTS_DUMMY.filter((product) => String(product.id) === String(productId))[0];
            if(response)
                resolve(response);
            else
                resolve(productNotFound);
        }, 1500);
    });
}

export function getAllProducts() {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve(STORE_ALL_PRODUCTS_DUMMY);
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

export function searchProductsByText(text) {
    text = text.toUpperCase();
    return new Promise((resolve)=> {
        setTimeout(()=> {
            const response = STORE_ALL_PRODUCTS_DUMMY.filter((product) => (
                    String(product.name).toUpperCase().includes(text) 
                || String(product.brand.brandName).toUpperCase().includes(text) 
                || String(product.category).toUpperCase().includes(text)));
            resolve(response);
        }, 1500);
    });
}