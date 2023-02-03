export default function BtnAddCart({ children, onClick, className, type }) {
  return (
    <button type={type} className={"btn btn-success " + className} onClick={onClick}>
      <i className="bi bi-bag-plus"></i>
      {children}
    </button>
  );
}
