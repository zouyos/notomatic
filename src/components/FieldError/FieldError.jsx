import style from "./style.module.css";

export function FieldError({ msg }) {
  return <span className={style.container}>{msg}</span>;
}
