import StoreItem from "../../pages/Store/StoreItem";

export default function ItemListContainer({ products }) {
    return(
        <div className="d-flex ">
            {products?.map((product) => <StoreItem key={product.id} product={product} />)}
        </div>
    );
}