
export default function StoreFilters() {
    return (
        <div className="card w-100">
            <div className="card">
                <div className="card-header">
                    <h3>Filtros:</h3>
                </div>

                <form className="d-flex" role="search">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <input className="form-control me-2" type="search" name="search" placeholder="Buscar" aria-label="Search" />
                        </li>
                        <li className="list-group-item">
                            <h5><strong>Rango de precios:</strong></h5>
                            <div className="input-group">
                                <input type="number" min="0.00" aria-label="First name" className="form-control" placeholder="Desde" />
                                <input type="number" min="0.00" aria-label="Last name" className="form-control" placeholder="Hasta" />
                            </div>
                        </li>
                        <li className="list-group-item">
                            <h5><strong>Marca:</strong></h5>

                        </li>
                        <li className="list-group-item">
                            <h5><strong>Categoria:</strong></h5>

                        </li>
                        <li className="list-group-item">
                            <button type="submit" className="btn btn-success" >
                                <i className="bi bi-search"></i>
                                <span className="mx-2">Buscar</span>
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}