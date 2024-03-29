import "./Navbar.css";
import { ROUTES } from '../../utils/navbar-routes';
import { Link, NavLink } from 'react-router-dom';
import { NavbarUserBtn } from "./NavbarUserBtn";
import { getAllCategories } from "../../services/backofficeServices";
import { useState } from "react";
import { useEffect } from "react";
function Navbar(props) {
    const [categoriesList, setCategoriesList] = useState();
    const mainCategoriesList = categoriesList ? categoriesList.filter((category) => !category.subcategoryCategoryId) : [];

    useEffect(() => {
        if (!categoriesList) {
            getAllCategories().then((response) => { setCategoriesList(response) });
        }
    });

    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-light">
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
                                    <li key={item.id} className="nav-item dropdown">
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
                                );
                            }
                            else {
                                return (
                                    <li key={item?.id} className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to={item?.path}>{item?.name}</NavLink>
                                    </li>
                                );
                            }
                        })}
                        {mainCategoriesList?.map((category) => {
                            const subcategories = categoriesList?.filter((item) => String(item.subcategoryCategoryId) === String(category.id));
                            return (
                                <li key={category.id} className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {category?.name}
                                    </a>
                                    <ul className="dropdown-menu">
                                        {subcategories?.map((dropdownItem) => {
                                            return <li key={dropdownItem?.id}><NavLink className="dropdown-item" to={`/tienda/${dropdownItem?.urlReference}`}>{dropdownItem?.name}</NavLink></li>
                                        })}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to={`/tienda/${category?.urlReference}`}>Ver todo</Link></li>
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>

                    <NavbarUserBtn />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


