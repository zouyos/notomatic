import style from './style.module.css';
import { Search as SearchIcon } from 'react-bootstrap-icons';

type SearchBarProps = {
  placeholder: string;
  onTextChange: (e: string) => void;
};

export function SearchBar({ placeholder, onTextChange }: SearchBarProps) {
  return (
    <>
      <SearchIcon size={25} className={style.icon} />
      <input
        type='text'
        className={style.input}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
}
