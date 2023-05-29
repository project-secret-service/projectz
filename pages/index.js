import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fleet Management System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        style={{
          position: "fixed",
          zIndex: 2,
          backgroundImage: "url(/assets/img/3.jpg)",
          width: "100vw",
          height: "100vh",
          backgroundSize: "100% 100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "15vw",
            marginBottom: "20vw",
            textAlign: "center",
          }}
        >
          <img
            src="/assets/img/CRPF-1.png"
            style={{
              width: "100%",
              height: "100%",
              filter: "drop-shadow(5px 5px 5px #222)",
            }}
          ></img>
          <br />
          <Link href="/login">
            <button
              id="home-login-button"
              className="mt-3 josefin-sans"
              style={{
                fontSize: "2rem",
                opacity: 0.6,
                fontStyle: "italic",
                paddingRight: "2rem",
                paddingLeft: "2rem",
                backgroundColor: "black",
                color: "white",
              }}
            >
              <span style={{ opacity: 1 }}>Login</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
