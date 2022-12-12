import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../services/storeServices";
import LoadingScreen from "../LoadingScreen";
import StoreItemList from "./StoreItemList";

export default function Store(props) {
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState();

    useEffect(()=> {
        getAllProducts().then((productsList)=> {setProducts(productsList)});
    }, [products]);

    useEffect(()=> {
        setProducts(null);
    }, [category, subcategory]);

    return (
        <div className="w-100 h-100">
            <h2>Tienda</h2>
            <h3>Categoria: <strong>{category ? category : "Todas"}</strong></h3>
            <h3>Subcategoria: <strong>{subcategory ? subcategory : "Todas"}</strong></h3>
            {products ? <StoreItemList products={products} /> : <LoadingScreen />}
        </div>
    );
}