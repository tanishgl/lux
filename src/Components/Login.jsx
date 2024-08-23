import useAuth from "../providers/AuthProvider";
import styles from "./Login.module.css";

function Login() {
  const { login } = useAuth();
  return (
    <div>
      <button className={`${styles["google-login-btn"]}`} onClick={login}>
        <img src="/lux/public/google.png" />
      </button>
    </div>
  );
}

export default Login;
