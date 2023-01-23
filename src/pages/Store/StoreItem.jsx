import { Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import { useState } from "react";
import "./Store.css";
import AddItemButton from "../../components/AddItemButton/AddItemButton";

export default function StoreItem({ product }) {
  const [quantity, setQuantity] = useState(1);

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
          quantity={quantity}
          setQuantity={setQuantity}
          product={product}
        >
          Añadir al carrito
        </AddItemButton>
      </ItemCard>
    </div>
  );
}
