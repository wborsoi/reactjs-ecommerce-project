import { Link } from 'react-router-dom';
import ItemCard from '../../components/ItemCard/ItemCard';

export default function StoreItem({ product }) {
    return (
        <div className="d-flex m-5">
            <ItemCard
                title={product?.name}
                text={product?.brand}
                photoURL={product?.photoURL}
            >
                <Link to={`/item/${product?.id}`} className="btn btn-primary my-2">Ver mas</Link>
                <button className="btn btn-secondary">Añadir al carrito</button>
            </ItemCard>
        </div>
    );
}