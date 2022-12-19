import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CartWidget from "../../components/CartWidget/CartWidget";
import { getAllProducts, searchProductsByText, getAllProductsByFilters } from "../../services/storeServices";
import LoadingScreen from "../LoadingScreen";
import StoreItemList from "./StoreItemList";

export default function Store(props) {
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getAllProductsByFilters(category, subcategory, searchParams.get("search")).then((productsList) => { setProducts(productsList) })

    }, [searchParams, category, subcategory]);

    useEffect(() => {
        setProducts(null);
    }, [category, subcategory]);

    return (
        <div className="w-100 h-100">
            <CartWidget />
            <h2>Tienda</h2>
            <h3>Categoria: <strong>{category ? category : "Todas"}</strong></h3>
            <h3>Subcategoria: <strong>{subcategory ? subcategory : "Todas"}</strong></h3>
            {products ? <StoreItemList products={products} /> : <LoadingScreen />}
        </div>
    );
}