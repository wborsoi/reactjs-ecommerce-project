import { useState } from "react"
import './AddItemButton.css'

export default function AddItemButton({ children, addToCartFunction, removeFromCartFunction, quantity, setQuantity, isEnable }) {
    const [changeQuantity, setChangeQuantity] = useState(false);

    const changeQuantityHandler = () => {
        setChangeQuantity(!changeQuantity);
    }

    const increaseQuantityHandler = () => {
        setQuantity(quantity + 1);
    }

    const decreaseQuantityHandler = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }

    const addToCartHandler = () => {
        addToCartFunction();
        setChangeQuantity(false);
    }

    const removeFromCartHandler = () => {
        removeFromCartFunction();
    }

    if (isEnable) {
        if (changeQuantity) {
            return (
                <div className="add-item-btn-container">
                    <button className="btn btn-danger" onClick={changeQuantityHandler}>
                        <i class="bi bi-bag-x"></i>
                    </button>
                    <button className="btn btn-secondary add-item-btn-decrease" onClick={decreaseQuantityHandler}>-</button>
                    <div className="add-item-btn-indicator">
                        <p>{quantity}</p>
                    </div>
                    <button className="btn btn-secondary add-item-btn-increase" onClick={increaseQuantityHandler}>+</button>
                    <button className="btn btn-success" onClick={addToCartHandler}>
                        <i class="bi bi-bag-plus"></i>
                    </button>
                </div>
            )
        }
        else {
            return <button className="btn btn-secondary" onClick={changeQuantityHandler}>{children}</button>
        }
    }
    else {
        return (
            <button className="btn btn-danger" onClick={removeFromCartHandler}>
                <i class="bi bi-bag-x"></i>
            </button>
        );
    }

}