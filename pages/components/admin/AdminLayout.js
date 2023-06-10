import HeadAndSideBar from "./HeadAndSideBar";
import Scripts from "../Scripts";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import { useContext, useEffect } from "react";
import AuthContext from "@/functions/auth/AuthContext";
import Router from "next/router";
import { LogOut } from "@/functions/loginAPI";

const AdminLayout = ({ children, title }) => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
    if (!isLoggedIn || user.role != "admin") {
      logout();
      LogOut();
      Router.push("/login");
    }
  }, [isLoggedIn]);

  if (isLoggedIn && user.role === "admin") {
    return (
      <>
        <main className={styles.main}>
          <HeadAndSideBar title={title} user={user} />
          {children}
        </main>
        <Scripts />
        <Script src="/assets/js/main.js"></Script>
      </>
    );
  } else {
    return null;
  }
};

export default AdminLayout;
