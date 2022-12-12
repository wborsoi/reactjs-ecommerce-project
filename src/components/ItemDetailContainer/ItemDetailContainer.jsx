import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../pages/LoadingScreen";
import { getProductByID } from "../../services/storeServices";

export default function ItemDetailContainer(props) {
    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(()=> {
        getProductByID(id).then((product)=> {setProduct(product)});
    }, [id]);

    if(product){
        return (
            <div className="row">
                <div className="col-6">
                    <img className="img-fluid" src={product?.photoURL} alt={product?.name} />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                    <h2>{product?.name}</h2>
                    <h3>Marca: {product?.brand}</h3>
                    <p><strong>$ {product?.price}</strong></p>
                    <button className="btn btn-success">Comprar</button>
                </div>
            </div>
        );
    }
    else {
        return <LoadingScreen />
    }
}