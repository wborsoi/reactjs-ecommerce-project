import StoreItem from "./StoreItem";

export default function StoreItemList({ products } ) {
    return (
        <div className="store-item-list-container">
            {products?.map((product) => <StoreItem key={product.id} product={product} />)}
        </div>
    );
}