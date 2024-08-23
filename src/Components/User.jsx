import { Link } from "react-router-dom";
import useAuth from "../providers/AuthProvider";
import styles from "./User.module.css";
import { ACCOUNT_PATH } from "../Constants/RoutingConstants";

function User() {
  const { username } = useAuth();
  return (
    <Link to={ACCOUNT_PATH}>
      <div className={`${styles.user}`}>Hello {username}!</div>
    </Link>
  );
}

export default User;
