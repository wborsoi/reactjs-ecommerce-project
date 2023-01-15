import { Link } from 'react-router-dom';
import ItemCard from '../../components/ItemCard/ItemCard';
import Context from '../../components/Context/Context';
import { useContext } from 'react';
import { useState } from 'react';
import './Store.css';
import AddItemButton from '../../components/AddItemButton/AddItemButton';

export default function StoreItem({ product }) {
    const {cart, setCart} = useContext(Context);
    const [quantity, setQuantity] = useState(1);
    //console.log("CartContext", cart)

    const removeItemFromCartHandler = () => {
        let allProductsFromCart = cart;
        allProductsFromCart.filter((cartProduct) => cartProduct.id !== product.id);
    }

    const addItemToCartHandler = () => {
        setCart([...cart, {
            product: product,
            quantity: quantity
        }]);
    };

    const isProductOnCart = () => {
        const resultado = cart.indexOf(product);
        console.log("Resultado", resultado)
        return resultado;
    }

    const isOnCart = isProductOnCart();


    return (
        <div className="store-item-container">
            <ItemCard
                title={product?.name}
                text={product?.brand?.brandName}
                photoURL={product?.imageURL}
                price={product?.price}
            >
                <Link to={`/item/${product?.id}`} className="btn btn-primary my-2">Ver mas</Link>
                <AddItemButton className="btn btn-secondary" addToCartFunction={addItemToCartHandler} removeFromCartFunction={isProductOnCart} quantity={quantity} setQuantity={setQuantity} isEnable={isOnCart}>Añadir al carrito</AddItemButton>
                <button onClick={isProductOnCart}>Test</button>
            </ItemCard>
        </div>
    );
}