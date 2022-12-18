import "./Navbar.css";
import { ROUTES } from '../../utils/navbar-routes';
import { Link, NavLink } from 'react-router-dom'
import { Fragment } from "react";
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
                        {ROUTES?.map((item) => {
                            if (item?.itemList) {
                                return (
                                    <Fragment key={item.id}>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {item?.name}
                                            </a>
                                            <ul className="dropdown-menu">
                                                {item?.itemList?.map((dropdownItem) => {
                                                    return <li key={dropdownItem?.id}><NavLink className="dropdown-item" to={`/tienda/${dropdownItem.path}`}>{dropdownItem?.name}</NavLink></li>
                                                })}
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><Link className="dropdown-item" to={`/tienda/${item.path}`}>Ver todo</Link></li>
                                            </ul>
                                        </li>
                                    </Fragment>
                                );
                            }
                            else {
                                return (
                                    <Fragment key={item?.id}>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" aria-current="page" to={item?.path}>{item?.name}</NavLink>
                                        </li>
                                    </Fragment>
                                );
                            }
                        })}
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" name="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary" type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


