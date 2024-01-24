import ScoreBoard from "./ScoreBoard";
import styles from "./Header.module.css";
import Login from "./Login";
import useAuth from "../providers/AuthProvider";
import User from "./User";
import Logout from "./Logout";

function Header() {
  const { isLoggedIn } = useAuth();
  return (
    <div className={`${styles.header} flex`}>
      <ScoreBoard className={`flex ${styles["scoreboard-sec"]}`} />
      <div className={`flex ${styles["profile-sec"]}`}>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <User />}
        {isLoggedIn && <Logout />}
      </div>
    </div>
  );
}

export default Header;
