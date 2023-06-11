import Scripts from "../Scripts";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import { useContext } from "react";
import AuthContext from "@/functions/auth/AuthContext";
import LoginError from "./LoginError";
import Header from "./Header";
import SideBar from "./Sidebar";
import Head from "next/head";

const AdminLayout = ({ children, title }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  if (!isLoggedIn || (user && user.role !== "admin")) {
    return <LoginError />;
  }
  return (
    <>
      <main className={styles.main}>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        </Head>
        <Header user={user} />
        <SideBar />
        {children}
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
};

export default AdminLayout;
