import { useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/loginServices";
import Context from "../Context/Context";

export function NavbarUserBtn(params) {
    const { userSesion, setUserSesion } = useContext(Context);

    const logoutHandler = () => {
        logout();
        setUserSesion(null);
    }

    if (userSesion) {
        return (
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
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