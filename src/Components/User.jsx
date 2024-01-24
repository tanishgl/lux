import useAuth from "../providers/AuthProvider";
import styles from "./User.module.css";

function User() {
  const { username } = useAuth();
  return <div className={`${styles.user}`}>Hello {username}!</div>;
}

export default User;
