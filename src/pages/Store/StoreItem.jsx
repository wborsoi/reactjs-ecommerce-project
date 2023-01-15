import { Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import Context from "../../components/Context/Context";
import { useContext } from "react";
import { useState } from "react";
import "./Store.css";
import AddItemButton from "../../components/AddItemButton/AddItemButton";

export default function StoreItem({ product }) {
  const { cart, setCart } = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  //console.log("CartContext", cart)

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

  return (
    <div className="store-item-container">
      <ItemCard
        title={product?.name}
        text={product?.brand?.brandName}
        photoURL={product?.imageURL}
        price={product?.price}
      >
        <Link to={`/item/${product?.id}`} className="btn btn-primary my-2">
          Ver mas
        </Link>
        <AddItemButton
          className="btn btn-secondary"
          addToCartFunction={addItemToCartHandler}
          removeFromCartFunction={removeItemFromCartHandler}
          quantity={quantity}
          setQuantity={setQuantity}
          isAddable={!isOnCart}
        >
          Añadir al carrito
        </AddItemButton>
      </ItemCard>
    </div>
  );
}
