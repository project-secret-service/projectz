import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Header from '../../components/Header'
import SideBar from '../../components/Sidebar'
import Scripts from '../../components/Scripts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Link from "next/link"
import { Button, Row } from "react-bootstrap";

async function GetUsers() {
    const res = await axios({ url: "https://projectx-production.up.railway.app/users/", method: "GET", withCredentials: true });
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
        console.log(link);
        Router.push('/admin/users/' + link);
    }
    return (
        <>
            <Head>
                <title>List Users</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>
            <main className={
                styles.main
            }>
                <Header />
                <SideBar />

                <main id="main" className="col-lg-11 main mt-0">
                    <Row className="p-1">
                        <h1>All Users</h1>
                    </Row>
                    <div className="col-lg-12 d-flex">
                        <div className="col-lg-8 card m-1 p-4">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Sl No.</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Contact No</th>
                                        <th scope="col">Rank</th>
                                        <th scope="col">Available</th>
                                    </tr>
                                </thead>
                                <tbody style={
                                    { cursor: "pointer" }
                                }>
                                    {
                                        users.map((user, index) => {
                                            return (
                                                <tr key={
                                                    index + 1
                                                }
                                                    onClick={
                                                        () => OpenLink(user._id)
                                                    }>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>{
                                                        user.username
                                                    }</td>
                                                    <td>{
                                                        user.contact_no
                                                    }</td>
                                                    <td>{
                                                        user.rank
                                                    }</td>
                                                    <td>{"Available"}</td>
                                                </tr>
                                            )
                                        })
                                    } </tbody>
                            </table>
                        </div>
                        <div className="col-lg-2 card p-3 m-1" style={{ maxHeight: "10vh" }}>
                            <Link href={"/admin/users/add"}>
                                <Button className="w-100 mb-1 btn btn-info">Add User</Button>
                            </Link>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        style={{ float: "left" }}
                        onClick={() => Router.back()}>Go Back</button>
                </main>
            </main>
            <Scripts />
            <Script src="/assets/js/main.js"></Script>
        </>
    )
}
