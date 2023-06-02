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
          <h1 className="josefin-sans">{driver.name}</h1>
          <Row>
            <div className="card col-8 m-1">
              <div className="row">
                <div className="col-4">
                  <div
                    className="d-flex p-5"
                    style={{
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    {driver.profile_pic && (
                      <img
                        src={
                          "http://localhost:3000/images/profilepic/" +
                          driver.profile_pic
                        }
                        style={{
                          maxWidth: "14vw",
                          maxHeight: "14vw",
                          WebkitFilter: "drop-shadow(1px 1px 1px #222)",
                          filter: "drop-shadow(1px 1px 5px #222)",
                        }}
                        alt="Avatar"
                      />
                    )}
                    {!driver.profile_pic && (
                      <img
                        src={"/assets/img/profile1.png"}
                        style={{
                          maxWidth: "14vw",
                          maxHeight: "14vw",
                          WebkitFilter: "drop-shadow(1px 1px 1px #222)",
                          filter: "drop-shadow(1px 1px 5px #222)",
                        }}
                        alt="Avatar"
                      />
                    )}
                  </div>
                </div>
                <div className="col-8 p-5">
                  <table className="table">
                    <tbody>
                      <th>
                        DRIVER DETAILS <br />
                        <br />
                      </th>
                      <tr>
                        <td>
                          Name: <b>{driver.name}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Rank: <b>{driver.rank}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          License No: <b>{driver.license_no}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Date from: <b>{driver.date_from}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Date to: <b>{driver.date_to}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1 opac-80"
              style={{ maxHeight: "40vh" }}
            >
              <Button
                className="w-100 mb-1 btn-dark"
                onClick={() => {
                  router.back();
                }}
              >
                BACK
              </Button>
              <hr />
              <Link href={"/admin/drivers/add"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-plus-circle"> </i>Add Drivers
                </Button>
              </Link>

              <Link href={"/admin/drivers/"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-list-task"></i> List Drivers
                </Button>
              </Link>
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
    </>
  );
};
export default Post;
