import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CartWidget from "../../components/CartWidget/CartWidget";
import StoreFilters from "../../components/StoreFilters/StoreFilters";
import { getAllProductsByFilters } from "../../services/storeServices";
import LoadingScreen from "../LoadingScreen";
import StoreItemList from "./StoreItemList";

export default function Store(props) {
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const textParam = searchParams.get("search");
        const priceFrom = searchParams.get("priceFrom");
        const priceTo = searchParams.get("priceTo");
        getAllProductsByFilters(category, subcategory, textParam, priceFrom, priceTo).then((productsList) => { setProducts(productsList) });
    }, [searchParams, category, subcategory]);

    return (
        <div className="w-100 h-100 p-3">
            <CartWidget />
            <h2>Tienda</h2>
            <h3>Categoria: <strong>{category ? category : "Todas"}</strong></h3>
            <h3>Subcategoria: <strong>{subcategory ? subcategory : "Todas"}</strong></h3>
            {products ? <Fragment>
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <StoreFilters />
                    </div>
                    <div className="col-12 col-lg-9">
                        <StoreItemList products={products} />
                    </div>
                </div>
            </Fragment> 
            : <LoadingScreen />}
        </div>
    );
}