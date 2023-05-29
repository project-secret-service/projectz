import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import Scripts from "../../components/Scripts";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";

async function GetUsers() {
  const res = await axios({
    url: "http://localhost:3000/users/",
    method: "GET",
    withCredentials: true,
  });
  return res.data;
}

export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    GetUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  function OpenLink(link) {
    Router.push("/admin/users/" + link);
  }
  return (
    <>
      <Head>
        <title>List Users</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Header />
        <SideBar />
        <main id="main" className=" col-lg-11 main mt-0">
          <h1>All Users</h1>
          <Row>
            <div className="col-lg-8">
              <div className="card opac-90">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">User</th>
                        <th scope="col">Name</th>
                        <th scope="col">License No</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {users&&users.map((user, index) => {
                        return (
                          <tr
                            key={index + 1}
                            onClick={() => OpenLink(user._id)}
                          >
                            <td>
                              {user.profile_pic && (
                                <img
                                  src={
                                    "http://localhost:3000/images/profilepic/" +
                                    user.profile_pic
                                  }
                                  style={{
                                    width: "4rem",
                                  }}
                                  alt="Avatar"
                                />
                              )}
                              {!user.profile_pic && (
                                <img
                                  src={"/assets/img/profile1.png"}
                                  style={{
                                    width: "4rem",
                                  }}
                                  alt="Avatar"
                                />
                              )}
                            </td>
                            <th>{user.name}</th>
                            <td>{user.registration_no}</td>
                            <td>{user.role}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1 opac-80"
              style={{ maxHeight: "20vh" }}
            >
              <Link href={"/admin/users/add"}>
                <Button className="w-100 mb-1 btn-warning">Add Users</Button>
              </Link>

              {/* <Link href={"/admin/users/available"}>
                <Button className="w-100 mb-1 btn-dark">Available Users</Button>
              </Link> */}
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
