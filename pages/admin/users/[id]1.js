import { useRouter } from 'next/router'
import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Header from "../../components/Header"
import SideBar from '../../components/Sidebar'
import axios from "axios"
import { useEffect, useState } from 'react'

async function GetUserDetails(id) {
  const res = await axios({
    url: "http://localhost:3000/users/" + id,
    withCredentials: true,
    method: "GET"
  });
  return res.data;
}

const Post = () => {
  const [user, setUsers] = useState({});
  const router = useRouter();
  const { id } = router.query
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query
    GetUserDetails(id).then((data) => {
    
      setUsers(data);
      console.data
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

        <div style={{ marginTop: "1rem ", marginLeft: 10, marginRight: 10, height: '80%' }}>
          <div style={{ fontSize: "4rem", marginTop: "1rem", marginBottom: "2rem" }}>
            <span>USER DETAILS</span>
            <hr style={{
              color: '#000000',
              backgroundColor: '#000000',
              height: 2.5,
            }} />
          </div>
          <div style={{ width: '3rem', padding: '4rem', margin: '1.8rem' }}>
            <div class="card" style={{ width: "12rem", float: 'left' }}>
              <img src={"http://localhost:3000/images/profilepic/" + user.profile_pic} style={{ width: '100%' }}
                alt="Avatar" />
            </div>
          </div>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">1.</th>
                <td>User registration no:</td>
                <td>{user.user_registration_no}</td>
              </tr>
              <tr>
                <th scope="row">2.</th>
                <td>Name:</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th scope="row">3.</th>
                <td>Rank:</td>
                <td>{user.rank}</td>
              </tr>
              <tr>
                <th scope="row">4.</th>
                <td>Contact No:</td>
                <td>{user.contact_no}</td>
              </tr>
              <tr>
                <th scope="row">5.</th>
                <td>Email Id:</td>
                <td>{user.email_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
export default Post