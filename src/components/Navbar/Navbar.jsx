import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand brand-logo-text" href="/#">CHEAP BUY</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/#">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#">Ofertas</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Almacen
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/#">Aceites y vinagres</a></li>
                                <li><a className="dropdown-item" href="/#">Arroz y legumbres</a></li>
                                <li><a className="dropdown-item" href="/#">Caldos, sopas y puré</a></li>
                                <li><a className="dropdown-item" href="/#">Enlatados y Conservas</a></li>
                                <li><a className="dropdown-item" href="/#">Harinas</a></li>
                                <li><a className="dropdown-item" href="/#">Pastas secas</a></li>
                                <li><a className="dropdown-item" href="/#">Repostería y postres</a></li>
                                <li><a className="dropdown-item" href="/#">Sal, aderezos y saborizadores</a></li>
                                <li><a className="dropdown-item" href="/#">Snacks</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/#">Ver todo</a></li>
                            </ul>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Bebidas
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/#">Aguas</a></li>
                                <li><a className="dropdown-item" href="/#">Bebidas blancas</a></li>
                                <li><a className="dropdown-item" href="/#">Bebidas energizantes</a></li>
                                <li><a className="dropdown-item" href="/#">Bebidas isotónicas</a></li>
                                <li><a className="dropdown-item" href="/#">Cervezas</a></li>
                                <li><a className="dropdown-item" href="/#">Espumantes y sidras</a></li>
                                <li><a className="dropdown-item" href="/#">Fernet y aperitivos</a></li>
                                <li><a className="dropdown-item" href="/#">Gaseosas</a></li>
                                <li><a className="dropdown-item" href="/#">Jugos</a></li>
                                <li><a className="dropdown-item" href="/#">Vinos</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/#">Ver todo</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <CartWidget />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;