import { database } from '../firebase/config';
import * as firestore from 'firebase/firestore'

export async function getAllCategories() {
    const collection = firestore.collection(database, "/category");
    const categoryDocs = await firestore.getDocs(collection);
    let result = [];
    categoryDocs?.forEach((category) => {
        result = [...result, {
            id: category.id,
            ...category.data()
        }];
    });
    return result;
}

export async function removeCategory(category) {
    const collection = firestore.collection(database, "/category");
    const query = firestore.query(collection, firestore.where("subcategoryCategoryId", "==", category.id));
    const categoriesDoc = await firestore.getDocs(query);
    const docRef = firestore.doc(database, "/category", category.id);

    return new Promise((resolve) => {
        if (categoriesDoc.size > 0) {
            resolve({
                success: false,
                msg: "Para borrar una categoria, primero debe borrar las subcategorias relacionadas"
            })
        }
        else {
            firestore.deleteDoc(docRef).then(() => {
                resolve({
                    success: true,
                    msg: "Categoria borrada exitosamente"
                });
            }).catch((err) => {
                console.error(err);
                resolve({
                    success: false,
                    msg: err
                })
            })
        }
    });
}

export async function addCategory(category) {
    const collection = firestore.collection(database, "/category");
    const query = firestore.query(collection, firestore.where("urlReference", "==", category.urlReference));
    const categoriesDoc = await firestore.getDocs(query);

    return new Promise((resolve) => {
        if (categoriesDoc.size <= 0) {
            firestore.addDoc(collection, category).then(() => {
                console.log("Categoria guardada exitosamente")
                resolve({
                    success: true,
                    msg: "Categoria guardada exitosamente"
                })
            }).catch((error) => {
                console.error(error);
                resolve({
                    success: false,
                    msg: error
                })
            });
        }
        else {
            resolve({
                success: false,
                msg: "Ya existe una categoria con la misma ruta de referencia"
            })
        }

    })

}

export async function addProduct(product) {
    const collection = firestore.collection(database, "/products");

    return new Promise((resolve) => {
        firestore.addDoc(collection, product).then(() => {
            console.log("Producto guardada exitosamente")
            resolve({
                success: true,
                msg: "Producto guardado exitosamente"
            })
        }).catch((error) => {
            console.error(error);
            resolve({
                success: false,
                msg: error
            })
        });
    })
}

export async function getAllProducts(text, brand, priceFrom, priceTo) {
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

export async function removeProduct(params) {

}
