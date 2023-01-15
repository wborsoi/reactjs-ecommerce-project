
export default function StoreFilters() {
    return (
        <div className="card w-100">
            <div class="card">
                <div class="card-header">
                    <h3>Filtros:</h3>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <h5><strong>Rango de precios:</strong></h5>
                        <div class="input-group">
                            <input type="number" min="0.00" aria-label="First name" class="form-control" placeholder="Desde" />
                            <input type="number" min="0.00" aria-label="Last name" class="form-control" placeholder="Hasta" />
                        </div>
                    </li>
                    <li class="list-group-item">
                        <h5><strong>Marca:</strong></h5>

                    </li>
                    <li class="list-group-item">
                        <h5><strong>Categoria:</strong></h5>

                    </li>
                    <li class="list-group-item">
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-search"></i>
                            <span className="mx-2">Buscar</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}