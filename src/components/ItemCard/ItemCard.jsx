export default function ItemCard({ title, text, photoURL, children }) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={photoURL} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <div className="d-flex flex-column">
                    {children}
                </div>
            </div>
        </div>
    );
}