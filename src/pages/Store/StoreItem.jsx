import { Link } from 'react-router-dom';
import ItemCard from '../../components/ItemCard/ItemCard';
import Context from '../../components/Context/Context';
import { useContext } from 'react';
import { useState } from 'react';
import './Store.css';

export default function StoreItem({ product }) {
    const {cart, setCart} = useContext(Context);
    const [quantity, setQuantity] = useState(0);

    //console.log("CartContext", cart)

    const removeItemFromCartHandler = () => {
        let allProductsFromCart = cart;
        allProductsFromCart.filter((cartProduct) => cartProduct.id !== product.id);
    }

    const addItemToCartHandler = () => {
        let newCart = cart;
        newCart.push({
            product: product,
            quantity: quantity
        });
        setCart(newCart);
    };

    const RemoveButton = () => {
        <button className="btn btn-danger">-</button>
    }

    const CountButton = () => {
        return (
            <div className="btn d-flex justify-content-between">
                <button className="btn btn-secondary">-</button>
                <button className="btn btn-secondary">+</button>
            </div>
        );
    }

    return (
        <div className="store-item-container">
            <ItemCard
                title={product?.name}
                text={product?.brand?.brandName}
                photoURL={product?.imageURL}
                price={product?.price}
            >
                <Link to={`/item/${product?.id}`} className="btn btn-primary my-2">Ver mas</Link>
                <button className="btn btn-secondary" onClick={addItemToCartHandler}>Añadir al carrito</button>
            </ItemCard>
        </div>
    );
}