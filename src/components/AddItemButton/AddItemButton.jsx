import { useContext, useState } from "react"
import BtnQuantityChange from "../Buttons/FunctionButtons/BtnQuantityChange";
import BtnAddCart from "../Buttons/StyledButtons/BtnAddCart";
import BtnRemoveCart from "../Buttons/StyledButtons/BtnRemoveCart";
import Context from "../Context/Context";
import './AddItemButton.css'

export default function AddItemButton({ children, className, quantity, setQuantity, product }) {
    const { cart, setCart } = useContext(Context);
    const [changeQuantity, setChangeQuantity] = useState(false);

    const removeItemFromCartHandler = () => {
        let allProductsFromCart = cart;
        allProductsFromCart = allProductsFromCart.filter(
            (cartProduct) => String(cartProduct.product.id) !== String(product.id)
        );
        setCart(allProductsFromCart);
        console.log("Carrito sin producto eliminado", allProductsFromCart);
    };

    const addItemToCartHandler = () => {
        setCart([
            ...cart,
            {
                product: product,
                quantity: quantity,
            },
        ]);
    };

    const isProductOnCart = () => {
        let isOnCart = false;
        for (const itemCarrito of cart)
            if (String(itemCarrito.product.id) === String(product.id))
                isOnCart = true;

        return isOnCart;
    };

    const isOnCart = isProductOnCart();

    const changeQuantityHandler = () => {
        setChangeQuantity(!changeQuantity);
        setQuantity(1);
    }

    const addToCartHandler = () => {
        addItemToCartHandler();
        setChangeQuantity(false);
    }

    const removeFromCartHandler = () => {
        removeItemFromCartHandler();
    }

    if (!isOnCart) {
        if (changeQuantity) {
            return (
                <div className="add-item-btn-container">
                    <BtnRemoveCart onClick={changeQuantityHandler} />
                    <BtnQuantityChange quantityState={quantity} setQuantityState={setQuantity} />
                    <BtnAddCart onClick={addToCartHandler} />
                </div>
            )
        }
        else {
            return <button className={className} onClick={changeQuantityHandler}>{children}</button>
        }
    }
    else {
        return <BtnRemoveCart onClick={removeFromCartHandler} />
    }

}