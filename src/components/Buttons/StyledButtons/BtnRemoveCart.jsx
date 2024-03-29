export default function BtnRemoveCart({ children, onClick, className, type }) {
  return (
    <button type={type} className={"btn btn-danger " + (className ? className : "")} onClick={onClick}>
      <i className="bi bi-bag-x"></i>
      {children}
    </button>
  );
}
