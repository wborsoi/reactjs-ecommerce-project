import { useState } from "react"
import BtnQuantityChange from "../Buttons/FunctionButtons/BtnQuantityChange";
import BtnAddCart from "../Buttons/StyledButtons/BtnAddCart";
import BtnRemoveCart from "../Buttons/StyledButtons/BtnRemoveCart";
import './AddItemButton.css'

export default function AddItemButton({ children, addToCartFunction, removeFromCartFunction, quantity, setQuantity, isAddable }) {
    const [changeQuantity, setChangeQuantity] = useState(false);

    const changeQuantityHandler = () => {
        setChangeQuantity(!changeQuantity);
        setQuantity(1);
    }

    const addToCartHandler = () => {
        addToCartFunction();
        setChangeQuantity(false);
    }

    const removeFromCartHandler = () => {
        removeFromCartFunction();
    }

    if (isAddable) {
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
            return <button className="btn btn-secondary" onClick={changeQuantityHandler}>{children}</button>
        }
    }
    else {
        return <BtnRemoveCart onClick={removeFromCartHandler} />
    }

}