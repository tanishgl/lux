import useAuth from "../providers/AuthProvider";
import styles from "./Logout.module.css";

function Logout() {
  const { logout } = useAuth();
  return (
    <div>
      <button className={`${styles["logout-btn"]}`} onClick={logout}>
        <img src="/lux/public/logout.png" />
      </button>
    </div>
  );
}

export default Logout;
