export default function BtnSave({ children, onClick, className, type }) {
  return (
    <button type={type} className={"btn btn-success " + (className ? className : "")} onClick={onClick}>
      <i class="bi bi-check-square"></i>
      {children}
    </button>
  );
}
