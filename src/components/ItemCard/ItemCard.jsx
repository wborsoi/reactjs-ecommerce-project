import './ItemCard.css';

export default function ItemCard({ title, text, photoURL, price, children }) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={photoURL} className="card-img-top" alt={title} loading="lazy" />
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{title}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <p className="card-text m-0">
                            <i className="bi bi-tag"></i>
                            <span className="mx-1">{text}</span>
                        </p>
                    </li>
                    <li class="list-group-item">
                        <h6 className='card-item--price'>
                            <i className="bi bi-currency-dollar"></i>
                            <strong>{price}</strong>
                        </h6>
                    </li>
                    <li class="list-group-item">
                        <div className="d-flex flex-column">
                            {children}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}