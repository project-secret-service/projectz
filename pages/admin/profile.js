import Head from 'next/head'
import {Inter} from "next/font/google"
import styles from '@/styles/Home.module.css'
import Script from 'next/script'
import Header from '../components/Header'
import SideBar from '../components/Sidebar'
import Footer from '../components/Footer'

import Scripts from '../components/Scripts'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const inter = Inter({subsets: ['latin']})
async function GetUser() {
    const res=await axios({url:"http://localhost:3000/users/get_user_details",method:"GET",withCredentials:true})
    return res.data
}

var v;
async function updateDetails(event){
    event.preventDefault();
   
    var data={
       
        username:event.target.fullName.value,
        role:event.target.company.value,
        rank:event.target.job.value,
        contact_no:event.target.phone.value,
        email_id:event.target.email.value
    }
    
    const res=await axios({url: "http://localhost:3000/users/update/"+v,method:"PUT",withCredentials:true,data:data})
    console.log(res);
}
const notify = () => toast.success(' Saved Changes!', {
    position: "bottom-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
// function alert(){
    
//         <div class="alert alert-primary" role="alert">
//                 Saved Changes
//         </div>
//     // )
//     // alert("I am an alert box!");
// }
export default function Home() {
    const [user,setUser]=useState([]);
    useEffect(()=>{
        // GetUser();
        GetUser().then((data)=>{
            setUser(data);
            //console.log(data);
        });

    },[])
    
// users.map((user)=>{
    v=user._id;
   
    return (
        <>
            <Head>
                <title>Profile</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <main className={
                styles.main
            }>
                <Header/>
                <SideBar/>
                <main id="main" className="main">

                    <div className="pagetitle">
                        <h1>Profile</h1>
                        {/* <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="breadcrumb-item">Users</li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </nav> */}
                    </div>

                    <section className="section profile">
                       
                        <div className="row">
                            <div className="col-xl-4">

                                <div className="card">
                                    <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                        <img src="/assets/img/profile1.png" alt="Profile" className="rounded-circle"/>
                                        <h2>{user.username}</h2>
                                        <h3>{user.rank}</h3>
                                        {/* <div className="social-links mt-2">
                                            <a href="#" className="twitter">
                                                <i className="bi bi-twitter"></i>
                                            </a>
                                            <a href="#" className="facebook">
                                                <i className="bi bi-facebook"></i>
                                            </a>
                                            <a href="#" className="instagram">
                                                <i className="bi bi-instagram"></i>
                                            </a>
                                            <a href="#" className="linkedin">
                                                <i className="bi bi-linkedin"></i>
                                            </a>
                                        </div> */}
                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-8">

                                <div className="card">
                                    <div className="card-body pt-3">
                                        <ul className="nav nav-tabs nav-tabs-bordered">

                                            <li className="nav-item">
                                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                            </li>

                                            <li className="nav-item">
                                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                            </li>

                                            <li className="nav-item">
                                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                                            </li>

                                            <li className="nav-item">
                                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                            </li>

                                        </ul>
                                        <div className="tab-content pt-2">

                                            <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                {/* <h5 className="card-title">About</h5> */}
                                                {/* <p className="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p> */}

                                                <h5 className="card-title">Profile Details</h5>

                                                

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                                    <div className="col-lg-9 col-md-8">{user.username}</div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label ">Registration_No</div>
                                                    <div className="col-lg-9 col-md-8">{user.user_registration_no}</div>
                                                </div>

                                                

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Role</div>
                                                    <div className="col-lg-9 col-md-8">{user.role}</div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Rank</div>
                                                    <div className="col-lg-9 col-md-8">{user.rank}</div>
                                                </div>
                                               

                                                
                                                

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Phone</div>
                                                    <div className="col-lg-9 col-md-8">{user.contact_no}</div>
                                                </div>
                                                

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Email</div>
                                                    <div className="col-lg-9 col-md-8">{user.email_id}</div>
                                                </div>

                                            </div>

                                            <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                                                <form onSubmit={updateDetails}>
                                                <ToastContainer
                                                position="bottom-center"
                                                autoClose={2500}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                                theme="light"
                                                />
                                                    <div className="row mb-3">
                                                        <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <img src="/assets/img/profile1.png" alt="Profile"/>
                                                            <div>
                                                            <input type="file" id="image_input" accept="image/png , image/jpg" />
                                                            <div id="display_image"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="fullName" type="text" className="form-control" id="fullName" defaultValue={user.username} placeholder="Enter your name"/>
                                                        </div>
                                                    </div>
                                                    {/* <div className="row mb-3">
                                                        <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">User Id</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="userid" type="text" className="form-control" id="fullName" defaultValue={user._id} placeholder="Enter your name"/>
                                                        </div>
                                                    </div> */}

                                                    {/* <div className="row mb-3">
                                                        <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <textarea name="about" className="form-control" id="about"
                                                                style={
                                                                    {height: "100px"}
                                                                }
                                                                defaultValue="Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde."></textarea>
                                                        </div>
                                                    </div> */}

                                                    <div className="row mb-3">
                                                        <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Role</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="company" type="text" className="form-control" id="company" defaultValue={user.role} placeholder="Enter your role"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Rank</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="job" type="text" className="form-control" id="Job" defaultValue={user.rank} placeholder="Enter your rank"/>
                                                        </div>
                                                    </div>
                                                    {/* <div className="row mb-3">
                                                        <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Registration_No</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="job" type="text" className="form-control" id="Job" defaultValue={user.user_registration_no} placeholder="Enter your rank"/>
                                                        </div>
                                                    </div> */}

                                                    

                                                    

                                                    <div className="row mb-3">
                                                        <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone_no</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="phone" type="text" className="form-control" id="Phone" defaultValue={user.contact_no} placeholder="Enter your contact_No"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label" >Email</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="email" type="email" className="form-control" id="Email" defaultValue={user.email_id} placeholder="Enter your email id"/>
                                                        </div>
                                                    </div>

                                                    {/* <div className="row mb-3">
                                                        <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="twitter" type="text" className="form-control" id="Twitter" defaultValue="https://twitter.com/#"/>
                                                        </div>
                                                    </div> */}

                                                    {/* <div className="row mb-3">
                                                        <label htmlFor="Facebook" className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="facebook" type="text" className="form-control" id="Facebook" defaultValue="https://facebook.com/#"/>
                                                        </div>
                                                    </div> */}

                                                    {/* <div className="row mb-3">
                                                        <label htmlFor="Instagram" className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="instagram" type="text" className="form-control" id="Instagram" defaultValue="https://instagram.com/#"/>
                                                        </div>
                                                    </div> */}

                                                    {/* <div className="row mb-3">
                                                        <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="linkedin" type="text" className="form-control" id="Linkedin" defaultValue="https://linkedin.com/#"/>
                                                        </div>
                                                    </div> */}

                                                    <div className="text-center">
                                                        <button onClick={notify} type="submit" className="btn btn-primary">Save Changes</button>
                                                    </div>
                                                </form>

                                            </div>

                                            <div className="tab-pane fade pt-3" id="profile-settings">

                                                <form>

                                                    <div className="row mb-3">
                                                        <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="changesMade" defaultChecked/>
                                                                <label className="form-check-label" htmlFor="changesMade">
                                                                    Changes made to your account
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="newProducts" defaultChecked/>
                                                                <label className="form-check-label" htmlFor="newProducts">
                                                                    Information on new products and services
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="proOffers"/>
                                                                <label className="form-check-label" htmlFor="proOffers">
                                                                    Marketing and promo offers
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="securityNotify" defaultChecked disabled/>
                                                                <label className="form-check-label" htmlFor="securityNotify">
                                                                    Security alerts
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                                    </div>
                                                </form>

                                            </div>

                                            <div className="tab-pane fade pt-3" id="profile-change-password">

                                                <form>

                                                    <div className="row mb-3">
                                                        <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="password" type="password" className="form-control" id="currentPassword"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="newpassword" type="password" className="form-control" id="newPassword"/>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input name="renewpassword" type="password" className="form-control" id="renewPassword"/>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary">Change Password</button>
                                                    </div>
                                                </form>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                </main>

            </main>
            <Scripts/>
            <Script src="/assets/js/main.js"></Script>
        </>
    )

// }
// )
}
    