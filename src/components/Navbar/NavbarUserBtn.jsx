import { useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/loginServices";
import Context from "../Context/Context";

export function NavbarUserBtn(params) {
    const { userSession, setUserSession } = useContext(Context);

    const logoutHandler = () => {
        logout();
        setUserSession(null);
    }

    if (userSession) {
        return (
            <div className="dropdown dropstart">
                <Link className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{userSession?.firstName}</strong>
                </Link>
                <ul className="dropdown-menu text-small shadow">
                    <li><Link className="dropdown-item">Mis compras</Link></li>
                    <li><Link className="dropdown-item">Favoritos</Link></li>
                    <li><Link className="dropdown-item">Configuracion</Link></li>
                    {userSession.isAdmin ? <li><Link to="/backoffice" className="dropdown-item">Backoffice</Link></li> : null}                    
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <a className="dropdown-item " href="/#" onClick={logoutHandler}>
                           Cerrar Sesion
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
    else {
        return (
            <Link to="/login">
                <button type="button" className="btn btn-warning">
                    <i className="bi bi-person-fill"></i>
                    <span className="ms-1">Ingresar</span>
                </button>
            </Link>
        );
    }
}