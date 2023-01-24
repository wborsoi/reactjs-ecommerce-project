import { NavLink } from "react-router-dom";

export default function BackofficeNavbar(props) {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-light" style={{ width: "280px", height: "100%" }}>
            <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4">Menu Backoffice</span>
            </span>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto text-start">
                <li className="nav-item">
                    <NavLink to={"categories"} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-current="page">
                        <i className="bi bi-tags-fill"></i>
                        <span className="mx-2">Categorias</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"products"} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-current="page">
                        <i className="bi bi-box-seam-fill"></i>
                        <span className="mx-2">Productos</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"offers"} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-current="page">
                        <i className="bi bi-piggy-bank-fill"></i>
                        <span className="mx-2">Ofertas</span>
                    </NavLink>
                </li>
            </ul>

        </div>
    );
}