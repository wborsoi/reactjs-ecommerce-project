import facebookIcon from '../../assets/facebook logo_icon.png';
import googleIcon from '../../assets/google_logo_icon.png'
import * as DBSignin from '../../services/loginServices';

export default function SignInModal(props) {

    const signinHandler = async (e) => {
        e.preventDefault();
        const email = e.target.inputEmailSignin.value;
        const password1 = e.target.inputPasswordSignin.value;
        const password2 = e.target.inputPasswordConfirmSignin.value;
        if(String(password1) === String(password2)){
            const response = await DBSignin.signinUser(email, password1);
            if(response.success){
                DBSignin.loginUser(email, password1);
                alert(response.msg);
            }
            else{
                alert(response.msg);
            }
        }
        else {
            alert("Las contraseñas no coinciden")
        }
    }

    return (
        <div className="modal fade" id="signInModal" tabIndex="-1" aria-labelledby="signInModal" aria-hidden="true">
            <div className="modal-dialog" >
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Registrarte gratis!</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form onSubmit={signinHandler}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-3" id="inputEmailSignin" placeholder="nombre@gmail.com" />
                                <label htmlFor="inputEmailSignin">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control rounded-3" id="inputPasswordSignin" placeholder="Contraseña" />
                                <label htmlFor="inputPasswordSignin">Contraseña</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control rounded-3" id="inputPasswordConfirmSignin" placeholder="Contraseña" />
                                <label htmlFor="inputPasswordConfirmSignin">Confirmar Contraseña</label>
                            </div>

                            <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Registrarme</button>
                            <small className="text-muted">Al hacer clic en Registrarse, acepta los términos de uso.</small>
                            <hr className="my-4" />
                            <h2 className="fs-5 fw-bold mb-3">O tambien podes registrarte con:</h2>
                            <button className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" type="submit">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img src={googleIcon} alt="Google Icon" height={20} />
                                    <span className='mx-1'>Registrarme con Google</span>
                                </div>
                            </button>
                            <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img src={facebookIcon} alt="Facebook Icon" height={20} />
                                    <span className='mx-1'>Registrarme con Facebook</span>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}