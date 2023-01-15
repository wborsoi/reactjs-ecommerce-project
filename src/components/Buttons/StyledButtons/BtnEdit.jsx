export default function BtnEdit({ children, onClick, className, type }) {
  return (
    <button type={type} className={"btn btn-primary " + (className ? className : "")} onClick={onClick}>
      <i class="bi bi-pencil"></i>
      {children}
    </button>
  );
}
