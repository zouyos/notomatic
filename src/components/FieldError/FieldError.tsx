import style from './style.module.css';

type FieldErrorProps = {
  msg: string;
};

export function FieldError({ msg }: FieldErrorProps) {
  return <span className={style.container}>{msg}</span>;
}
