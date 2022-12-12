import StoreItem from "./StoreItem";

export default function StoreItemList({ products } ) {
    return (
        <div className="d-flex ">
            {products?.map((product) => <StoreItem key={product.id} product={product} />)}
        </div>
    );
}