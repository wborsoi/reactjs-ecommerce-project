import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Context from '../Context/Context';
import './CartWidget.css'

export default function CartWidget(props) {
    const {cart, setCart} = useContext(Context);
    const [contador, setContador] = useState(cart.length);

    useEffect(()=>{
        setContador(cart.length)
    })

    console.log("CartLength", cart)

    return (
        <button type="button" className="btn btn-success mx-2 cart-widget-btn">
            <div className='cart-widget-count-indicator bg-danger'>
                <span><strong>{cart.length > 9 ? "9+" : cart.length}</strong></span>
            </div>
            <i className="bi bi-cart"></i>
        </button>
    );
}