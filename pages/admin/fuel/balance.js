import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import dateFormat from "dateformat";
import { Row, Button } from "react-bootstrap";
import Link from "next/link";
import { getOilBalance } from "@/functions/apiHandlers/fuel";

export default function Home() {
  const [oilbalances, setOilBalances] = useState([]);
  useEffect(() => {
    getOilBalance().then((data) => {
      setOilBalances(data);
    });
  }, []);

  function OpenLink(link) {
    Router.push("/admin/fuel/recieve/" + link);
  }

  return (
    <>
      <Head>
        <title>List Drivers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />

        <main id="main" className="col-lg-10 main opac-80 mt-0">
          <h1>Oil Balance</h1>
          <Row>
            <div className="col-8 m-1 card p-5">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                  {oilbalances.map((oilbalance, index) => {
                    return (
                      <tr
                        key={index + 1}
                        onClick={() => {
                          Router.push("/admin/fuel/balance/" + oilbalance._id);
                        }}
                      >
                        <th>{oilbalance.type}</th>
                        <td>{oilbalance.balance}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-3 m-1 card p-3">
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <Link href={"/admin/fuel/balance/log"}>
                <Button className="w-100 mb-1 btn-primary">
                  Oil Balance Log
                </Button>
              </Link>
              <Link href={"/admin/fuel/add"}>
                <Button className="w-100 mb-1 btn-warning">
                  Update Balance
                </Button>
              </Link>

              <Link href={"/admin/fuel/allot"}>
                <Button className="w-100 mb-1 btn-success">Allot Oil</Button>
              </Link>

              <Link href={"/admin/fuel/addtype"}>
                <Button className="w-100 mb-1 btn-info">Add Oil Type</Button>
              </Link>
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
