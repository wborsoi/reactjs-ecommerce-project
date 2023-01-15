import { Fragment } from "react";
import "./BtnQuantityChange.css";

export default function BtnQuantityChange({
  quantityState,
  setQuantityState,
  className,
}) {
  const increaseQuantityHandler = () => {
    setQuantityState(quantityState + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantityState > 1) setQuantityState(quantityState - 1);
  };

  return (
    <Fragment>
      <button
        className="btn btn-secondary add-item-btn-decrease"
        onClick={decreaseQuantityHandler}
      >
        <span>-</span>
      </button>
      <div className="add-item-btn-indicator">
        <p>{quantityState}</p>
      </div>
      <button
        className="btn btn-secondary add-item-btn-increase"
        onClick={increaseQuantityHandler}
      >
        <span>+</span>
      </button>
    </Fragment>
  );
}
