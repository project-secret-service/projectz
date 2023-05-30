import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/pages/components/Header";
import SideBar from "@/pages/components/Sidebar";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import dateFormat from "dateformat";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Link from "next/link";

async function getOilBalance() {
  const res = await axios({
    url: "http://localhost:3000/oilstockregister/log",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}
const Post = () => {
  const router = useRouter();
  const [oilbalances, setOilBalance] = useState([]);
  useEffect(() => {
    getOilBalance().then((data) => {
      setOilBalance(data);
      console.log(data);
    });
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>User Details</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SideBar />
      <main className={styles.main}>
        <main id="main" className="col-11 mt-0 row opac-80">
          <h3 className="josefin-sans"> Oil Balance Log</h3>
          <Row>
            <div className="col-8 m-1 card p-5">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Voucher (IV/RV)</th>
                    <th scope="col">Oil</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Difference</th>
                    <th scope="col">Date</th>
                    <th scope="col">(ISS/REC)</th>
                  </tr>
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                  {oilbalances.map((oilbalance, index) => {
                    return (
                      <tr
                        key={index + 1}
                        onClick={() => {
                          router.push(`/admin/fuel/voucher/${oilbalance._id}`);
                        }}
                      >
                        {oilbalance.recieved && (
                          <>
                            <th>{oilbalance.recieve_voucher_no}</th>
                            <td>{oilbalance.type.type}</td>
                            <td>{oilbalance.type.balance}</td>
                            <td>
                              <span style={{ color: "green" }}>
                                +{oilbalance.recieved_amount}
                              </span>
                            </td>
                            <td>
                              {oilbalance.date &&
                                dateFormat(
                                  oilbalance.date,
                                  " dS mmmm, yyyy - dddd"
                                )}
                            </td>
                            <td>
                              <span style={{ color: "green" }}>REC</span>
                            </td>
                          </>
                        )}
                        {oilbalance.issued && (
                          <>
                            <th>{oilbalance.issue_voucher_no}</th>
                            <td>{oilbalance.type.type}</td>
                            <td>{oilbalance.type.balance}</td>
                            <td>
                              <span style={{ color: "red" }}>
                                - {oilbalance.issued_amount}
                              </span>
                            </td>
                            <td>
                              {oilbalance.date &&
                                dateFormat(
                                  oilbalance.date,
                                  " dS mmmm, yyyy - dddd"
                                )}
                            </td>
                            <td>
                              <span style={{ color: "red" }}>ISS</span>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-3 m-1 card p-3">
              <Button
                onClick={() => {
                  router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <Link href={"/admin/fuel/add"}>
                <Button className="w-100 mb-1 btn-warning">
                  Update Balance
                </Button>
              </Link>
              <Link href={"/admin/fuel/allot"}>
                <Button className="w-100 mb-1 btn-success">Allot Fuel</Button>
              </Link>

              <Link href={"/admin/fuel/addtype"}>
                <Button className="w-100 mb-1 btn-primary">Add Oil Type</Button>
              </Link>
            </div>
          </Row>
        </main>
      </main>
    </>
  );
};
export default Post;
