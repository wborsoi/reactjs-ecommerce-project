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
            accumulator + Number(currentValue.product.price) * currentValue.quantity,
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


    const CartItemRow = ({ id, name, brand, price, imgSrc, quantity }) => {
        return (
            <li key={id} className="list-group-item d-flex justify-content-between lh-sm">
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
                        <span className="text-muted">${(Number(price * quantity)).toFixed(2)}</span>
                    </strong>
                    <small className="text-muted">${(Number(price)).toFixed(2)} c/u</small>
                </div>
            </li>
        );
    }

    if (cart.length > 0) {
        return (
            <section className="container py-5">
                <div className="py-5 text-center">
                    <h2 className="checkout-cart-title">Finalizar compra</h2>
                </div>

                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Carrito</span>
                            <span className="badge bg-primary rounded-pill">{cart.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {cart.map((cartItem) => <CartItemRow key={cartItem?.product?.id} name={cartItem?.product?.name} brand={cartItem?.product?.brand} price={Number(cartItem?.product?.price)} imgSrc={cartItem?.product?.imageURL} quantity={cartItem?.quantity} />)}

                            <li className="list-group-item d-flex justify-content-between">
                                <strong>Total:</strong>
                                <strong>${sumaTotal.toFixed(2)}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-7 col-lg-8 text-start">
                        <h4 className="mb-3">Direccion de facturacion</h4>
                        <form className="needs-validation" onSubmit={(e) => { e.preventDefault() }}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">Nombre/s</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" required="" />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Apellido/s</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Direccion</label>
                                    <input type="text" className="form-control" id="address" placeholder="Lima 1234" required />
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Pais</label>
                                    <select className="form-select" id="country" required="" onChange={selectCountryHandler}>
                                        <option>Elegir...</option>
                                        {countries?.map((country) => <option key={country.id} value={country.id}>{country.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">Ciudad</label>
                                    <select className="form-select" id="state" required="">
                                        <option >Elegir...</option>
                                        {selectableStates?.map((state) => <option key={state?.id} value={state?.id} >{state?.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">
                                        Este campo es obligatorio.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Codigo Postal</label>
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
                                    <label className="form-check-label" htmlFor="card">Tarjeta de Debito / Credito</label>
                                </div>
                                <div className="form-check">
                                    <input id="transfer" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                    <label className="form-check-label" htmlFor="transfer">Transferencia</label>
                                </div>
                                <div className="form-check">
                                    <input id="mercadopago" name="paymentMethod" type="radio" className="form-check-input" required="" />
                                    <label className="form-check-label" htmlFor="mercadopago">Mercado Pago</label>
                                </div>
                            </div>

                            <div className={paymentMethod === "card" ? "row gy-3" : "d-none"} >

                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Numero de tarjeta</label>
                                    <input type="text" className="form-control" id="cc-number" required={paymentMethod === "card" ? true : false} />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cc-name" className="form-label">Nombre en tarjeta</label>
                                    <input type="text" className="form-control" id="cc-name" required={paymentMethod === "card" ? true : false}  />
                                    <small className="text-muted">Nombre completo que se muestra en la tarjeta</small>
                                </div>


                                <div className="col-md-3">
                                    <label htmlFor="cc-expiration" className="form-label">Fecha de vencimiento</label>
                                    <input type="text" className="form-control" id="cc-expiration" required={paymentMethod === "card" ? true : false}  />
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" required={paymentMethod === "card" ? true : false}  />
                                </div>
                            </div>

                            <div className={paymentMethod === "mercadopago" ? "row gy-3" : "d-none"}>
                                <svg height="250" width="250" viewBox="0 0 49 49">
                                    <path fill="#FFFFFF" d="M0,0 h49v49H0z"></path>
                                    <path fill="#000000" d="M0 0h7v1H0zM9 0h4v1H9zM14 0h2v1H14zM17 0h2v1H17zM20 0h2v1H20zM23 0h1v1H23zM30 0h3v1H30zM34 0h2v1H34zM37 0h1v1H37zM40 0h1v1H40zM42,0 h7v1H42zM0 1h1v1H0zM6 1h1v1H6zM8 1h1v1H8zM12 1h1v1H12zM14 1h2v1H14zM17 1h2v1H17zM20 1h1v1H20zM22 1h2v1H22zM26 1h3v1H26zM32 1h1v1H32zM34 1h2v1H34zM37 1h4v1H37zM42 1h1v1H42zM48,1 h1v1H48zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM9 2h2v1H9zM13 2h1v1H13zM15 2h5v1H15zM21 2h1v1H21zM23 2h1v1H23zM26 2h1v1H26zM29 2h2v1H29zM32 2h1v1H32zM35 2h1v1H35zM37 2h1v1H37zM39 2h2v1H39zM42 2h1v1H42zM44 2h3v1H44zM48,2 h1v1H48zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h1v1H8zM10 3h2v1H10zM13 3h2v1H13zM16 3h1v1H16zM19 3h2v1H19zM22 3h1v1H22zM24 3h1v1H24zM28 3h1v1H28zM30 3h3v1H30zM34 3h3v1H34zM39 3h1v1H39zM42 3h1v1H42zM44 3h3v1H44zM48,3 h1v1H48zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM8 4h2v1H8zM11 4h5v1H11zM17 4h1v1H17zM21 4h6v1H21zM28 4h1v1H28zM30 4h3v1H30zM37 4h1v1H37zM42 4h1v1H42zM44 4h3v1H44zM48,4 h1v1H48zM0 5h1v1H0zM6 5h1v1H6zM9 5h4v1H9zM17 5h4v1H17zM22 5h1v1H22zM26 5h4v1H26zM31 5h1v1H31zM36 5h1v1H36zM38 5h1v1H38zM42 5h1v1H42zM48,5 h1v1H48zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h1v1H22zM24 6h1v1H24zM26 6h1v1H26zM28 6h1v1H28zM30 6h1v1H30zM32 6h1v1H32zM34 6h1v1H34zM36 6h1v1H36zM38 6h1v1H38zM40 6h1v1H40zM42,6 h7v1H42zM8 7h1v1H8zM12 7h4v1H12zM18 7h1v1H18zM21 7h2v1H21zM26 7h2v1H26zM33 7h3v1H33zM37 7h2v1H37zM1 8h1v1H1zM3 8h4v1H3zM8 8h1v1H8zM10 8h1v1H10zM12 8h4v1H12zM17 8h1v1H17zM19 8h2v1H19zM22 8h5v1H22zM28 8h4v1H28zM33 8h1v1H33zM36 8h1v1H36zM39 8h1v1H39zM41 8h2v1H41zM44 8h2v1H44zM47 8h1v1H47zM3 9h1v1H3zM5 9h1v1H5zM7 9h1v1H7zM9 9h1v1H9zM11 9h1v1H11zM13 9h3v1H13zM17 9h1v1H17zM20 9h1v1H20zM22 9h1v1H22zM25 9h1v1H25zM29 9h2v1H29zM32 9h3v1H32zM36 9h8v1H36zM47 9h1v1H47zM0 10h3v1H0zM6 10h1v1H6zM10 10h1v1H10zM13 10h10v1H13zM25 10h1v1H25zM28 10h2v1H28zM31 10h4v1H31zM36 10h1v1H36zM39 10h3v1H39zM43 10h1v1H43zM48,10 h1v1H48zM0 11h2v1H0zM3 11h3v1H3zM7 11h1v1H7zM13 11h1v1H13zM19 11h2v1H19zM27 11h1v1H27zM30 11h1v1H30zM32 11h1v1H32zM37 11h1v1H37zM39 11h1v1H39zM42 11h1v1H42zM44 11h1v1H44zM46 11h1v1H46zM48,11 h1v1H48zM0 12h2v1H0zM4 12h3v1H4zM8 12h3v1H8zM12 12h3v1H12zM17 12h2v1H17zM22 12h1v1H22zM28 12h1v1H28zM30 12h1v1H30zM32 12h5v1H32zM39 12h1v1H39zM41 12h2v1H41zM44 12h1v1H44zM1 13h2v1H1zM4 13h2v1H4zM7 13h1v1H7zM9 13h1v1H9zM11 13h3v1H11zM16 13h1v1H16zM19 13h2v1H19zM22 13h2v1H22zM27 13h2v1H27zM30 13h4v1H30zM35 13h4v1H35zM42 13h1v1H42zM44 13h1v1H44zM46 13h1v1H46zM2 14h2v1H2zM6 14h3v1H6zM11 14h1v1H11zM14 14h1v1H14zM16 14h1v1H16zM19 14h1v1H19zM22 14h3v1H22zM26 14h4v1H26zM33 14h1v1H33zM36 14h4v1H36zM41 14h1v1H41zM44,14 h5v1H44zM0 15h1v1H0zM2 15h1v1H2zM4 15h1v1H4zM7 15h3v1H7zM11 15h4v1H11zM18 15h2v1H18zM22 15h2v1H22zM26 15h2v1H26zM30 15h1v1H30zM34 15h1v1H34zM38 15h1v1H38zM41 15h1v1H41zM46,15 h3v1H46zM0 16h2v1H0zM4 16h5v1H4zM10 16h2v1H10zM14 16h1v1H14zM19 16h1v1H19zM23 16h3v1H23zM27 16h3v1H27zM31 16h4v1H31zM36 16h1v1H36zM39 16h2v1H39zM42 16h3v1H42zM46 16h1v1H46zM0 17h1v1H0zM2 17h1v1H2zM4 17h2v1H4zM11 17h2v1H11zM14 17h5v1H14zM20 17h2v1H20zM23 17h2v1H23zM27 17h2v1H27zM30 17h5v1H30zM36 17h1v1H36zM39 17h5v1H39zM47 17h1v1H47zM0 18h1v1H0zM2 18h1v1H2zM5 18h2v1H5zM9 18h2v1H9zM12 18h1v1H12zM14 18h1v1H14zM16 18h2v1H16zM21 18h1v1H21zM25 18h1v1H25zM28 18h2v1H28zM33 18h1v1H33zM36 18h1v1H36zM39 18h2v1H39zM43 18h4v1H43zM48,18 h1v1H48zM0 19h2v1H0zM3 19h1v1H3zM5 19h1v1H5zM8 19h1v1H8zM14 19h1v1H14zM16 19h1v1H16zM33 19h1v1H33zM42 19h1v1H42zM45 19h1v1H45zM48,19 h1v1H48zM0 20h2v1H0zM3 20h6v1H3zM11 20h2v1H11zM14 20h1v1H14zM16 20h1v1H16zM35 20h2v1H35zM38 20h1v1H38zM42 20h1v1H42zM47,20 h2v1H47zM2 21h2v1H2zM5 21h1v1H5zM7 21h1v1H7zM9 21h1v1H9zM11 21h2v1H11zM14 21h1v1H14zM32 21h1v1H32zM34 21h3v1H34zM38 21h1v1H38zM40 21h3v1H40zM44 21h2v1H44zM2 22h7v1H2zM12 22h1v1H12zM14 22h1v1H14zM32 22h5v1H32zM40 22h5v1H40zM46 22h1v1H46zM48,22 h1v1H48zM0 23h3v1H0zM4 23h1v1H4zM8 23h1v1H8zM11 23h1v1H11zM16 23h1v1H16zM32 23h1v1H32zM34 23h2v1H34zM40 23h1v1H40zM44 23h4v1H44zM1 24h2v1H1zM4 24h1v1H4zM6 24h1v1H6zM8 24h2v1H8zM12 24h1v1H12zM14 24h1v1H14zM32 24h1v1H32zM34 24h3v1H34zM39 24h2v1H39zM42 24h1v1H42zM44 24h1v1H44zM47 24h1v1H47zM0 25h2v1H0zM3 25h2v1H3zM8 25h1v1H8zM11 25h2v1H11zM33 25h1v1H33zM35 25h2v1H35zM38 25h1v1H38zM40 25h1v1H40zM44 25h1v1H44zM46 25h2v1H46zM0 26h1v1H0zM3 26h7v1H3zM11 26h1v1H11zM13 26h1v1H13zM15 26h2v1H15zM32 26h1v1H32zM35 26h1v1H35zM37 26h8v1H37zM46 26h1v1H46zM48,26 h1v1H48zM0 27h5v1H0zM9 27h1v1H9zM13 27h1v1H13zM15 27h1v1H15zM35 27h1v1H35zM37 27h1v1H37zM39 27h1v1H39zM41 27h1v1H41zM43 27h4v1H43zM0 28h1v1H0zM3 28h2v1H3zM6 28h2v1H6zM9 28h2v1H9zM13 28h1v1H13zM15 28h1v1H15zM32 28h1v1H32zM36 28h2v1H36zM39 28h1v1H39zM42 28h1v1H42zM45,28 h4v1H45zM0 29h3v1H0zM4 29h2v1H4zM8 29h2v1H8zM11 29h1v1H11zM13 29h1v1H13zM15 29h2v1H15zM33 29h2v1H33zM37 29h1v1H37zM40 29h1v1H40zM45 29h2v1H45zM1 30h1v1H1zM3 30h1v1H3zM5 30h4v1H5zM10 30h1v1H10zM12 30h1v1H12zM14 30h1v1H14zM18 30h1v1H18zM20 30h2v1H20zM23 30h1v1H23zM29 30h1v1H29zM33 30h1v1H33zM36 30h1v1H36zM42 30h2v1H42zM45 30h1v1H45zM47,30 h2v1H47zM2 31h4v1H2zM8 31h2v1H8zM13 31h1v1H13zM16 31h1v1H16zM19 31h4v1H19zM26 31h1v1H26zM29 31h2v1H29zM33 31h1v1H33zM35 31h1v1H35zM39 31h2v1H39zM43 31h2v1H43zM48,31 h1v1H48zM0 32h2v1H0zM4 32h4v1H4zM11 32h1v1H11zM18 32h2v1H18zM21 32h2v1H21zM26 32h1v1H26zM30 32h2v1H30zM36 32h2v1H36zM39 32h2v1H39zM42 32h1v1H42zM44 32h1v1H44zM1 33h1v1H1zM3 33h1v1H3zM8 33h1v1H8zM11 33h1v1H11zM13 33h1v1H13zM18 33h1v1H18zM21 33h4v1H21zM26 33h1v1H26zM30 33h5v1H30zM37 33h2v1H37zM40 33h3v1H40zM44 33h1v1H44zM0 34h2v1H0zM3 34h1v1H3zM5 34h2v1H5zM9 34h1v1H9zM11 34h1v1H11zM13 34h1v1H13zM16 34h3v1H16zM21 34h1v1H21zM24 34h1v1H24zM28 34h1v1H28zM31 34h4v1H31zM36 34h1v1H36zM39 34h1v1H39zM42 34h1v1H42zM44 34h2v1H44zM47,34 h2v1H47zM3 35h1v1H3zM5 35h1v1H5zM10 35h2v1H10zM14 35h1v1H14zM16 35h3v1H16zM20 35h6v1H20zM29 35h1v1H29zM31 35h5v1H31zM37 35h4v1H37zM44 35h1v1H44zM46 35h2v1H46zM0 36h1v1H0zM6 36h4v1H6zM13 36h3v1H13zM17 36h1v1H17zM19 36h1v1H19zM22 36h3v1H22zM26 36h8v1H26zM36 36h1v1H36zM38 36h2v1H38zM41 36h2v1H41zM0 37h1v1H0zM2 37h2v1H2zM8 37h1v1H8zM10 37h1v1H10zM12 37h1v1H12zM14 37h2v1H14zM18 37h1v1H18zM21 37h1v1H21zM25 37h2v1H25zM30 37h1v1H30zM32 37h1v1H32zM35 37h2v1H35zM38 37h4v1H38zM43 37h2v1H43zM1 38h1v1H1zM5 38h3v1H5zM10 38h2v1H10zM14 38h1v1H14zM16 38h2v1H16zM19 38h11v1H19zM32 38h2v1H32zM36 38h3v1H36zM41 38h6v1H41zM48,38 h1v1H48zM1 39h3v1H1zM9 39h1v1H9zM11 39h1v1H11zM13 39h1v1H13zM16 39h1v1H16zM19 39h1v1H19zM21 39h1v1H21zM23 39h1v1H23zM27 39h1v1H27zM30 39h3v1H30zM34 39h1v1H34zM38 39h3v1H38zM44 39h1v1H44zM46 39h1v1H46zM48,39 h1v1H48zM0 40h3v1H0zM6 40h2v1H6zM9 40h1v1H9zM13 40h1v1H13zM17 40h2v1H17zM21 40h7v1H21zM30 40h5v1H30zM36 40h1v1H36zM39 40h6v1H39zM46,40 h3v1H46zM8 41h2v1H8zM12 41h1v1H12zM14 41h2v1H14zM18 41h2v1H18zM22 41h1v1H22zM26 41h6v1H26zM33 41h5v1H33zM39 41h2v1H39zM44 41h4v1H44zM0 42h7v1H0zM10 42h4v1H10zM18 42h1v1H18zM21 42h2v1H21zM24 42h1v1H24zM26 42h1v1H26zM29 42h2v1H29zM32 42h2v1H32zM37 42h1v1H37zM40 42h1v1H40zM42 42h1v1H42zM44 42h3v1H44zM48,42 h1v1H48zM0 43h1v1H0zM6 43h1v1H6zM8 43h1v1H8zM11 43h1v1H11zM16 43h1v1H16zM19 43h1v1H19zM21 43h2v1H21zM26 43h1v1H26zM28 43h1v1H28zM30 43h2v1H30zM33 43h2v1H33zM40 43h1v1H40zM44 43h2v1H44zM47,43 h2v1H47zM0 44h1v1H0zM2 44h3v1H2zM6 44h1v1H6zM8 44h2v1H8zM12 44h6v1H12zM22 44h5v1H22zM28 44h2v1H28zM33 44h1v1H33zM35 44h2v1H35zM38 44h7v1H38zM48,44 h1v1H48zM0 45h1v1H0zM2 45h3v1H2zM6 45h1v1H6zM8 45h3v1H8zM12 45h1v1H12zM14 45h3v1H14zM19 45h3v1H19zM23 45h2v1H23zM27 45h1v1H27zM29 45h2v1H29zM32 45h3v1H32zM37 45h3v1H37zM42 45h1v1H42zM46 45h1v1H46zM0 46h1v1H0zM2 46h3v1H2zM6 46h1v1H6zM10 46h2v1H10zM14 46h1v1H14zM16 46h2v1H16zM21 46h2v1H21zM24 46h3v1H24zM28 46h2v1H28zM31 46h4v1H31zM36 46h2v1H36zM39 46h1v1H39zM44 46h2v1H44zM48,46 h1v1H48zM0 47h1v1H0zM6 47h1v1H6zM8 47h3v1H8zM14 47h1v1H14zM16 47h1v1H16zM18 47h1v1H18zM21 47h1v1H21zM23 47h1v1H23zM26 47h2v1H26zM30 47h1v1H30zM32 47h1v1H32zM34 47h2v1H34zM37 47h2v1H37zM40 47h1v1H40zM42 47h1v1H42zM44,47 h5v1H44zM0 48h7v1H0zM13 48h4v1H13zM18 48h1v1H18zM22 48h1v1H22zM25 48h1v1H25zM28 48h6v1H28zM36 48h1v1H36zM39 48h1v1H39zM41 48h1v1H41zM45 48h1v1H45zM48,48 h1v1H48z"></path>
                                    <image  xlinkHref="https://www.mercadolibre.com/org-img/mkt/push/thumbnails_MP/logo_mp_3.png" height="9.8" width="14.700000000000001" x="17.15" y="19.6" preserveAspectRatio="none"></image>
                                </svg>
                                <div className="col-12">
                                    <label htmlFor="mercadopagoNroOperacion" className="form-label">Número de operación</label>
                                    <input type="text" className="form-control" id="mercadopagoNroOperacion" required={paymentMethod === "mercadopago" ? true : false} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="mercadopagoCuitCuil" className="form-label">CUIT/CUIL</label>
                                    <input type="text" className="form-control" id="mercadopagoCuitCuil" required={paymentMethod === "mercadopago" ? true : false} />
                                </div>
                            </div>

                            <hr className="my-4" />

                            <button className="w-100 btn btn-success btn-lg" type="submit">Finalizar compra</button>
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