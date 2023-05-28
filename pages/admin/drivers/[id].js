import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Link from "next/link";
import { Button, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import Scripts from "@/pages/components/Scripts";

async function GetDriverDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/drivers/" + id,
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

const Post = () => {
  const [driver, setDrivers] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetDriverDetails(id).then((data) => {
      setDrivers(data);
      console.data;
    });
  }, [router.isReady]);

  return (
    <>
      <Header />
      <SideBar />
      <main className={styles.main}>
        <main id="main" className="col-11 main mt-0 opac-80">
          <h1 className="josefin-sans">Driver Details</h1>
          <Row>
            <div className="card">
              <div className="row">
                <div className="col-4">
                  <div
                    className="d-flex p-5"
                    style={{
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      style={{ maxWidth: "20vw", maxHeight: "20vw" }}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div className="col-8 p-5">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">1.</th>
                        <td>Name:</td>
                        <td>{driver.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">2.</th>
                        <td>Rank:</td>
                        <td>{driver.rank}</td>
                      </tr>
                      <tr>
                        <th scope="row">3.</th>
                        <td>License No:</td>
                        <td>{driver.license_no}</td>
                      </tr>
                      <tr>
                        <th scope="row">4.</th>
                        <td>Date from:</td>
                        <td>{driver.date_from}</td>
                      </tr>
                      <tr>
                        <th scope="row">5.</th>
                        <td>Date to:</td>
                        <td>{driver.date_to}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
    </>
  );
};
export default Post;
