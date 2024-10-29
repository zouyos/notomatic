import { Power } from 'react-bootstrap-icons';

type LogoutButtonProps = {
  onClick: () => void;
};

export function LogoutButton({ onClick }: LogoutButtonProps) {
  return (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      <Power size={30} color='red' />
    </div>
  );
}
