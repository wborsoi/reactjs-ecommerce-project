import StoreItem from "./StoreItem";

export default function StoreItemList({ products } ) {

    if(products.length > 0){
        return (
            <div className="store-item-list-container">
                {products?.map((product) => <StoreItem key={product.id} product={product} />)}
            </div>
        );
    }
    else{
        return (
            <div className="store-item-list-container">
                <h2>No se encontraron resultados para los parametros de busqueda indicados.</h2>
            </div>
        );
    }
}