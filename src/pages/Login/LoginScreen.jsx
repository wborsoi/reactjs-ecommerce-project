import './LoginScreen.css'
import SignInModal from './SignInModal';
import * as DBService from '../../services/loginServices';
import { useContext } from 'react';
import Context from '../../components/Context/Context';
import { Navigate } from 'react-router-dom';

export default function LoginScreen(props) {

    const {userSession, setUserSession} = useContext(Context);

    const loginHandler = async (e) => {
        e.preventDefault()
        const email = e.target.inputEmail.value
        const password = e.target.inputPassword.value
        console.log("Email", email, "Password", password);
        const response = await DBService.loginUser(email, password);
        if(response.success){
            setUserSession({...response.user});
        }
        else {
            alert(response.msg);
        }
    }

    if(!userSession){
        return (
            <div className="container py-5">
                <div className="form-signin w-100 m-auto px-5">
                    <form onSubmit={loginHandler}>
                        <h2 className="checkout-cart-title">Cheap Buy</h2>

                        <div className="form-floating">
                            <input type="email" className="form-control" id="inputEmail" placeholder="nombre@gmail.com" />
                            <label htmlFor="inputEmail">Email</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" />
                            <label htmlFor="inputPassword">Contraseña</label>
                        </div>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Recordar credenciales
                            </label>
                        </div>
                        <hr />
                        <button className="w-100 btn btn-lg btn-warning my-2" type="submit">Iniciar Sesion</button>
                        <button className="w-100 btn btn-lg btn-secondary my-2" type="button" data-bs-toggle="modal" data-bs-target="#signInModal">Registrarme</button>
                    </form>
                </div>
                <SignInModal />
            </div>
        );
    }
    else{
        return <Navigate replace to={'/tienda'} />
    }

    }
