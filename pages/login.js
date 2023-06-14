import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { checkLogin, UserLogin } from "@/functions/loginAPI";
import AuthContext from "@/functions/auth/AuthContext";
import Router from "next/router";

export default function Login() {
  const { login, setUser, setIsLoggedIn } = useContext(AuthContext);
  const [loginSpinner, setLoginSpinner] = useState(false);
  useEffect(() => {
    checkLogin().then((res) => {
      // if (res.status === 200) {
      //   setUser(res.user);
      //   login();
      //   console.log(res.status);
      // }
      console.log(res);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          height: "100vh",
          width: "100vw",
        }}
        className="opac-80"
      >
        <div className={styles.navbar}>
          <span
            className={styles.navbar_title}
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Fleet
            <span style={{ color: "red" }}>Management</span>
            System
          </span>
          <span className={styles.navbar_title_phone}>
            F<span style={{ color: "red" }}>M</span>S
          </span>
        </div>

        <div className={`${styles.middle} login_main`}>
          <div
            className={styles.form}
            style={{ opacity: 1, backgroundColor: "white", opacity: 0.8 }}
          >
            <form
              onSubmit={async () => {
                let res = await UserLogin(event);
                if (res && res.data && res.data.status === 200) {
                  setLoginSpinner(true);
                  setUser(res.data.user);
                  login();
                  Router.push("/admin/duties/");
                }
              }}
            >
              <div className={styles.form_inputs}>
                <div className="text-center">
                  <h1
                    className="josefin-sans"
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    CRPF Login
                  </h1>
                  <hr />
                  <br />
                </div>
                <div>
                  <span className={styles.input_label}>Email / Username</span>
                  <br></br>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className={styles.input_field}
                  ></input>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <span className={styles.input_label}>Password</span>
                  <br></br>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className={styles.input_field}
                  ></input>
                  <span
                    style={{
                      float: "right",
                      color: "blue",
                      marginTop: "1rem",
                    }}
                  >
                    <u>Forgot Password ?</u>
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "4rem" }}>
                {!loginSpinner ? (
                  <button className={styles.login_button} type="submit">
                    LOGIN
                  </button>
                ) : (
                  <button
                    className={styles.login_button}
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div
          className={`${styles.footer} opac-80`}
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Copyright 2023
        </div>
      </main>
    </>
  );
}
