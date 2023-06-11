import HeadAndSideBar from "./HeadAndSideBar";
import Scripts from "../Scripts";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import { use, useContext, useEffect, useState } from "react";
import AuthContext from "@/functions/auth/AuthContext";
import Router from "next/router";
import { LogOut, checkLoggedIn } from "@/functions/loginAPI";
import { useRouter } from "next/router";
import LoginError from "./LoginError";

const AdminLayout = ({ children, title }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const router = useRouter();

  if (!isLoggedIn || user.role !== "admin") {
    return <LoginError />;
  } else {
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
  }
};

export default AdminLayout;
