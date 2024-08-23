import styles from "./AppLayout.module.css";
import { Outlet } from "react-router";
import Header from "../Components/Header";

function AppLayout() {
  return (
    <div className={`${styles["grid-app"]}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
