import { ReactNode } from 'react';
import style from './style.module.css';

type ButtonPrimaryProps = {
  children: ReactNode;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export function ButtonPrimary({
  children,
  onClick,
  disabled,
}: ButtonPrimaryProps) {
  return (
    <button
      type='button'
      className={`btn btn-primary ${style.button}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
