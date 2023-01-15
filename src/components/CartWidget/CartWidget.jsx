import { memo } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Context from "../Context/Context";
import "./CartWidget.css";

function CartWidget(props) {
  const { cart, setCart } = useContext(Context);
  const [contador, setContador] = useState(cart.length);

  useEffect(() => {
    setContador(cart.length);
  }, [cart]);

  return (
    <Link to={'/carrito'}>
      <button type="button" className="btn btn-success mx-2 cart-widget-btn" on>
        <div className="cart-widget-count-indicator bg-danger">
          <span>
            <strong>{contador > 9 ? "9+" : contador}</strong>
          </span>
        </div>
        <i className="bi bi-cart"></i>
      </button>
    </Link>
  );
}

export default CartWidget;
