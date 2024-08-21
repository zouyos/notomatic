import { Power } from "react-bootstrap-icons";

export function LogoutButton({ onClick }) {
  return (
    <div style={{ cursor: "pointer" }} onClick={onClick}>
      <Power size={30} color="red" />
    </div>
  );
}
