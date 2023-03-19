import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Header from '../../components/Header'
import SideBar from '../../components/Sidebar'
import Scripts from '../../components/Scripts'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Router from 'next/router'

async function GetUsers() {
    const res = await axios({url: "http://localhost:3000/users/", method: "GET", withCredentials: true});
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
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

            </Head>
            <main className={
                styles.main
            }>
                <Header/>
                <SideBar/>

                <main id="main" className=" col-lg-9 main">
                    <h1>
                        All Users
                    </h1>
                                <hr  style={{
                                    color: '#000000',
                                    backgroundColor: '#000000',
                                    height: 2.5,
                                    borderColor : '#000000'
                                    }}/>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Contact No</th>
                                <th scope="col">Rank</th>
                                <th scope="col">Available</th>
                            </tr>
                        </thead>
                        <tbody style={
                            {cursor: "pointer"}
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
                                            <i className="bi bi-truck"
                                                style={
                                                    {
                                                        color: "red",
                                                        fontSize: "1rem"
                                                    }
                                            }></i>
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
                </main>

            </main>
            <Scripts/>
            <Script src="/assets/js/main.js"></Script>
        </>
    )
}
