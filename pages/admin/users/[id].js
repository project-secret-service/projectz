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

async function GetUserDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/users/" + id,
    withCredentials: true,
    method: "GET",
  });
  return res.data;
}

const Post = () => {
  const [user, setUsers] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetUserDetails(id).then((data) => {
      setUsers(data);
      console.data;
    });
  }, [router.isReady]);

  return (
    <>
      <Header />
      <SideBar />
      <main className={styles.main}>
        <main id="main" className="col-11 main mt-0 opac-80">
          <h1 className="josefin-sans">{user.name}</h1>
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
                    {user.profile_pic && (
                      <img
                        src={
                          "http://localhost:3000/images/profilepic/" +
                          user.profile_pic
                        }
                        style={{ maxWidth: "15vw", maxHeight: "15vw" }}
                        alt="Avatar"
                      />
                    )}
                    {!user.profile_pic && (
                      <img
                        src={"/assets/img/profile1.png"}
                        style={{ maxWidth: "15vw", maxHeight: "15vw" }}
                        alt="Avatar"
                      />
                    )}
                  </div>
                </div>
                <div className="col-6 p-5">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>
                          USER DETAILS
                          <br />
                          <br />
                        </th>
                      </tr>
                      <tr>
                        <td>
                          Registration No : <b>{user.registration_no}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Name : <b>{user.name}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Role : <b>{user.role}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Rank : <b>{user.rank}</b>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          Contact No : <b>{user.phone}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Email Id : <b>{user.email}</b>
                        </td>
                      </tr>
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

              <Link href={"/admin/users/"}>
                <Button className="w-100 mb-1 btn-dark">List Users</Button>
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
