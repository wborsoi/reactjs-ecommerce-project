import { useContext } from "react";
import Context from "../../components/Context/Context";
import BtnRemoveCart from "../../components/Buttons/StyledButtons/BtnRemoveCart";
import { Link } from "react-router-dom";
import "./CartReview.css";
import BtnEdit from "../../components/Buttons/StyledButtons/BtnEdit";
import { useState } from "react";
import BtnSave from "../../components/Buttons/StyledButtons/BtnSave";
import BtnQuantityChange from "../../components/Buttons/FunctionButtons/BtnQuantityChange";

export default function CartReview(props) {
  const { cart, setCart } = useContext(Context);
  const sumaTotal = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.product.price * currentValue.quantity,
    0
  );

  const CartTableRow = ({ item }) => {
    const { product, quantity } = item;
    const [isEditable, setIsEditable] = useState(false);
    const [editableQuantity, setEditableQuantity] = useState(quantity);

    const editItemRowHandler = () => {
      setIsEditable(true);
    };

    const saveEditItemRowHandler = () => {
      let newCart = cart;
      const indexOfItem = newCart.indexOf(item);
      if (indexOfItem >= 0) {
        newCart[indexOfItem].quantity = editableQuantity;
      }
      setCart([...newCart]);
      setIsEditable(false);
    };

    const EditableButton = () => {
      if (!isEditable) {
        return <BtnEdit className="me-1" onClick={editItemRowHandler} />;
      }
      else {
        return <BtnSave className="me-1" onClick={saveEditItemRowHandler} />
      }
    };

    const removeItemFromCartHandler = () => {
      let allProductsFromCart = cart;
      allProductsFromCart = allProductsFromCart.filter(
        (cartProduct) =>
          String(cartProduct?.product?.id) !== String(product?.id)
      );
      setCart(allProductsFromCart);
    };

    return (
      <tr>
        <td>
          <img
            className="cart-review-img-row"
            src={product?.imageURL}
            alt={product?.name}
          />
        </td>
        <td>{product?.name}</td>
        <td>{product?.brand?.brandName}</td>
        <td>{`$ ${(product?.price).toFixed(2)}`}</td>
        <td>{!isEditable ? quantity : <div className="d-flex justify-content-between">
          <BtnQuantityChange quantityState={editableQuantity} setQuantityState={setEditableQuantity} />
        </div>}</td>
        <td>{`$ ${(product?.price * editableQuantity).toFixed(2)}`}</td>
        <td>
          <EditableButton />
          <BtnRemoveCart onClick={removeItemFromCartHandler} />
        </td>
      </tr>
    );
  };

  if (cart.length > 0) {
    return (
      <section className="p-5">
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th> {/* Imagen del producto */}
                <th scope="col">Producto</th>
                <th scope="col">Marca</th>
                <th scope="col">Precio unitario</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Total</th>
                <th scope="col"></th> {/* Acciones disponibles */}
              </tr>
            </thead>
            <tbody>
              {cart.map((itemCart) => (
                <CartTableRow key={itemCart?.product?.id} item={itemCart} />
              ))}
            </tbody>
            <tfoot>
              <td colSpan="7">
                <p className="cart-review-total-indicator">
                  <strong>Total: ${sumaTotal.toFixed(2)}</strong>
                </p>
              </td>
            </tfoot>
          </table>
        </div>
        <div>
          <Link to="/checkout">
            <BtnSave className="w-100"><span className="ms-2">Ir a pagar</span></BtnSave>
          </Link>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div className="m-5">
          <h2>No se existen productos añadidos al carrito aun</h2>
          <Link to="/tienda">
            <button className="btn btn-primary m-3">Ir a la tienda</button>
          </Link>
        </div>
      </section>
    );
  }
}
