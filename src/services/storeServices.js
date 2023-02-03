import STORE_ALL_PRODUCTS_DUMMY from '../database/productosDummy.json'
import { ROUTES } from '../utils/navbar-routes';
import { database } from '../firebase/config'; 
import * as firestore  from 'firebase/firestore'

const productNotFound = {
    name: "Producto no encontrado.",
    brand: {
        brandName: ""
    }
}

export function getProductByID(productId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = STORE_ALL_PRODUCTS_DUMMY.filter((product) => String(product.id) === String(productId))[0];
            if (response)
                resolve(response);
            else
                resolve(productNotFound);
        }, 1500);
    });
}

export function getAllProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(STORE_ALL_PRODUCTS_DUMMY);
        }, 1500);
    });
}

export function getAllProductsByCategory(categoryPath) {
    if (categoryPath) {
        const categoria = ROUTES.filter((route) => route.id === categoryPath);
        console.log("Categoria encontrada: ", categoria);
    }
}

// export function getAllProductsByFilters(category, subcategory, text, priceFrom, priceTo) {
//     text = (text ? text.toUpperCase() : "");
//     category = (category ? category.toUpperCase() : "");
//     subcategory = (subcategory ? subcategory.toUpperCase() : "");
//     priceFrom = (priceFrom ? Number(priceFrom) : 0);
//     priceTo = (priceTo ? Number(priceTo) : Number.MAX_SAFE_INTEGER);

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             let response = STORE_ALL_PRODUCTS_DUMMY.filter((product) => String(product.category).normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase().includes(category));
//             response = response.filter((product) => String(product.category).normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase().includes(subcategory));
//             response = response.filter((product) => (String(product.name).normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase().includes(text) || String(product.brand.brandName).normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase().includes(text)));
//             response = response.filter((product) => (product.price >= priceFrom && product.price <= priceTo));

//             resolve(response);
//         }, 1500);
//     });
// }

export async function getAllProductsByFilters(category, subcategory, text, priceFrom, priceTo) {
    text = (text ? text.toUpperCase() : "");
    category = (category ? category.toUpperCase() : "");
    subcategory = (subcategory ? subcategory.toUpperCase() : "");
    priceFrom = (priceFrom ? Number(priceFrom) : 0);
    priceTo = (priceTo ? Number(priceTo) : Number.MAX_SAFE_INTEGER);

    const collection = firestore.collection(database, "/products");
    const productsDocs = await firestore.getDocs(collection);
    let result = [];
    productsDocs?.forEach((product) => {
        result = [...result, {
            id: product.id,
            ...product.data()
        }];
    });

    return result;
}

export function searchProductsByText(text) {
    text = text.toUpperCase();
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = STORE_ALL_PRODUCTS_DUMMY.filter((product) => (
                String(product.name).toUpperCase().includes(text)
                || String(product.brand.brandName).toUpperCase().includes(text)
                || String(product.category).toUpperCase().includes(text)));
            resolve(response);
        }, 1500);
    });
}

async function testDatabase() {
    const docRef = firestore.doc(database, '/products', "TulEZXGX1hgZLZip3lNp");
    const document = await firestore.getDoc(docRef);
    const products = document.data();
    console.log("productsDatabase", products, "id", document.id)

    getAllProductsFromDatabase();
    // addNewProduct({
    //     brand: "Test brand",
    //     category_id: "TEST ID CATEGORY",
    //     name: "Producto de test",
    //     photoURL: "HTTEST",
    //     price: 259.99
    // })
}

async function getAllProductsFromDatabase (){
    const getProductDataFormatted = (product) => {
        //const {brand, categoryId, name, photoURL, price, subcategoryId} = product.date()
        //const id = product.id;
        return {
            id: product.id,
            ...product.data()
        }
    };

    const productsCollection = firestore.collection(database, '/products')
    const documents = await firestore.getDocs(productsCollection);
    let allProducts = [];
    documents.forEach((product) => {allProducts = [...allProducts, getProductDataFormatted(product)]});
    console.log("allProductsDatabase", allProducts);
}

async function addNewProduct(product) {
    const collection = firestore.collection(database, "/products");
    firestore.addDoc(collection, product).then(()=> {getAllProductsFromDatabase()})
}