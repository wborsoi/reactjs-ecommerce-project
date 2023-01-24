import { useSearchParams } from "react-router-dom";

export default function StoreFilters() {
    const [searchParams] = useSearchParams();
    const textParam = searchParams.get("search");
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");
    
    return (
        <div className="card w-100">
            <div className="card">
                <div className="card-header">
                    <h3>Filtros:</h3>
                </div>

                <form className="d-flex" role="search">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <input className="form-control me-2" type="search" name="search" placeholder="Buscar" aria-label="Search" defaultValue={textParam} />
                        </li>
                        <li className="list-group-item">
                            <h5><strong>Rango de precios:</strong></h5>
                            <div className="input-group">
                                <input type="search" name="priceFrom" min="0.00" aria-label="Price From" className="form-control" placeholder="Desde" defaultValue={priceFrom}/>
                                <input type="search" name="priceTo" min="0.00" aria-label="Price To" className="form-control" placeholder="Hasta" defaultValue={priceTo} />
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