import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BtnAddCart from "../../components/Buttons/StyledButtons/BtnAddCart";
import Context from "../../components/Context/Context";
import './CheckoutScreen.css'
import countries from '../../database/countries.json'
import states from '../../database/states.json'
import { useEffect } from "react";

export default function CheckoutScreen(props) {
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectableStates, setSelectableStates] = useState();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const { cart } = useContext(Context);
    const sumaTotal = cart.reduce(
        (accumulator, currentValue) =>
            accumulator + currentValue.product.price * currentValue.quantity,
        0
    );

    useEffect(()=> {
        if(selectedCountry){
            const filteredStates = states.filter((state) => String(state.id_country) === String(selectedCountry.id));
            console.log("Provincias actualizadas", filteredStates)
            setSelectableStates([...filteredStates]);
        }
    }, [selectedCountry]);

    const selectCountryHandler = (event) => {
        const country = countries.filter((country) => String(country.id) === String(event.target.value))[0];
        setSelectedCountry({...country});
    }

    const changePaymentMethodHandler = (event) => {
        setPaymentMethod(event.target.id)
    }


    const CartItemRow = ({ name, brand, price, imgSrc, quantity }) => {
        return (
            <li className="list-group-item d-flex justify-content-between lh-sm">
                <div className="d-flex flex-start">
                    <img src={imgSrc} alt={name} className="checkout-cart-img-row" />
                    <div className="text-start">
                        <h6 className="my-0">{name}</h6>
                        <small className="text-muted">{brand}</small>
                        <br />
                        <small className="text-muted">{quantity} {quantity === 1 ? "Unidad" : "Unidades"}</small>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-between">
                    <strong>
                        <span className="text-muted">${(price * quantity).toFixed(2)}</span>
                    </strong>
                    <small className="text-muted">${(price).toFixed(2)} c/u</small>
                </div>
            </li>
        );
    }

    if (cart.length > 0) {
        return (
            <section className="container">
                <div className="py-5 text-center">
                    <h2 className="brand-logo-text fs-1">Finalizar compra</h2>
                </div>

                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Carrito</span>
                            <span className="badge bg-primary rounded-pill">{cart.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {cart.map((cartItem) => <CartItemRow name={cartItem.product.name} brand={cartItem.product.brand.brandName} price={cartItem.product.price} imgSrc={cartItem.product.imageURL} quantity={cartItem.quantity} />)}

                            <li className="list-group-item d-flex justify-content-between">
                                <strong>Total:</strong>
                                <strong>${sumaTotal.toFixed(2)}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-7 col-lg-8 text-start">
                        <h4 className="mb-3">Direccion de facturacion</h4>
                        <form className="needs-validation" novalidate="" onSubmit={(e) => { e.preventDefault() }}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label for="firstName" className="form-label">Nombre/s</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required="" />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label for="lastName" className="form-label">Apellido/s</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required="" />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label for="address" className="form-label">Direccion</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label for="address2" className="form-label">Direccion 2 <span className="text-muted">(Optional)</span></label>
                                    <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                                </div>

                                <div className="col-md-5">
                                    <label for="country" className="form-label">Pais</label>
                                    <select className="form-select" id="country" required="" onChange={selectCountryHandler}>
                                        <option value="">Elegir...</option>
                                        {countries?.map((country) => <option key={country.id} value={country.id}>{country.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label for="state" className="form-label">Ciudad</label>
                                    <select className="form-select" id="state" required="">
                                        <option value="">Elegir...</option>
                                        {selectableStates?.map((state) => <option key={state?.id} value={state?.id} >{state?.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label for="zip" className="form-label">Codigo Postal</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required="" />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>
                            </div>  

                            <hr className="my-4" />

                            <h4 className="mb-3">Informacion de Pago</h4>

                            <div className="my-3" onChange={changePaymentMethodHandler}>
                                <div className="form-check">
                                    <input id="card" name="paymentMethod" type="radio" className="form-check-input" defaultChecked required="" />
                                    <label className="form-check-label" for="card">Tarjeta de Debito / Credito</label>
                                </div>
                                <div className="form-check">
                                    <input id="transfer" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                    <label className="form-check-label" for="transfer">Transferencia</label>
                                </div>
                                <div className="form-check">
                                    <input id="mercadopago" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                    <label className="form-check-label" for="mercadopago">Mercado Pago</label>
                                </div>
                            </div>

                            <div className={paymentMethod === "card" ? "row gy-3" : "d-none"} >

                                <div className="col-md-6">
                                    <label for="cc-number" className="form-label">Numero de tarjeta</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label for="cc-name" className="form-label">Nombre en tarjeta</label>
                                    <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                                    <small className="text-muted">Nombre completo que se muestra en la tarjeta</small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>


                                <div className="col-md-3">
                                    <label for="cc-expiration" className="form-label">Fecha de vencimiento</label>
                                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                                    <div className="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label for="cc-cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                                    <div className="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
    else {
        return (
            <section className="m-5">
                <h2>
                    <span>Aun no añadiste productos a tu carrito. Visita la tienda y agrega los productos que desea comprar presionando en </span>
                    <button type="button" className="btn btn-secondary">Añadir al carrito</button>
                    <span> y luego presionando el boton </span>
                    <BtnAddCart />
                </h2>
                <Link to="/tienda">
                    <button className="btn btn-primary m-3">Ir a la tienda</button>
                </Link>
            </section>
        );
    }
}