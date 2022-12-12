export default function LoadingScreen(props) {
    return (
        <div className="w-100 h-100">
            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}