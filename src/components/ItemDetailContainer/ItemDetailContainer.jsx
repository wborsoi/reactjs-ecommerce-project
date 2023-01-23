import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../pages/LoadingScreen";
import { getProductByID } from "../../services/storeServices";
import AddItemButton from "../AddItemButton/AddItemButton";

export default function ItemDetailContainer(props) {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getProductByID(id).then((product) => { setProduct(product) });
    }, [id]);

    console.log("ItemDetailContainer", product);

    if (product) {
        return (
            <div className="row justify-content-around p-5">
                <div className="col-12 col-lg-5">
                    <img className="img-fluid" src={product?.imageURL} alt={product?.name} />
                </div>
                <div className="col-12 col-lg-5 d-flex flex-column justify-content-center">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h2>{product?.name}</h2>
                        </li>
                        <li class="list-group-item">
                            <p className="card-text m-0">
                                <i className="bi bi-tag"></i>
                                <span className="mx-2">{product?.brand.brandName}</span>
                            </p>
                        </li>
                        <li class="list-group-item">
                            <p className="card-text m-0">
                                <i class="bi bi-box2"></i>
                                <span className="mx-2">{product?.unit}</span>
                            </p>
                        </li>
                        <li class="list-group-item">
                            <h6 className='card-item--price'>
                                <i className="bi bi-currency-dollar"></i>
                                <strong>{product?.price}</strong>
                            </h6>
                        </li>
                    </ul>
                    <AddItemButton
                        className="btn btn-success"
                        quantity={quantity}
                        setQuantity={setQuantity}
                        product={product}
                    >
                        Comprar
                    </AddItemButton>
                </div>
            </div>
        );
    }
    else {
        return <LoadingScreen />
    }
}