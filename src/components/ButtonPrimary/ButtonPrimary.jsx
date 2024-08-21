import style from "./style.module.css";

export function ButtonPrimary({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      className={`btn btn-primary ${style.button}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
