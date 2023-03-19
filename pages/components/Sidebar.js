import Link from "next/link"
import {useEffect} from "react"

export default function SideBar(props) {
    return (
        <>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <Link className="nav-link collapsed"
                            href={'/admin/'}
                            id="dashboard-sidebar">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {/* 

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-layout-text-window-reverse"></i>
                            <span>Users</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/admin/users/">
                                    <i className="bi bi-circle"></i>
                                    <span>List Vehicles</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/users/add">
                                    <i className="bi bi-circle"></i>
                                    <span>Add Vehicles</span>
                                </Link>
                            </li>
                        </ul>
                    </li> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-text"></i>
                            <span>Duties</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/admin/duties/">
                                    <i className="bi bi-circle"></i>
                                    <span>List Duties</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/duties/add">
                                    <i className="bi bi-circle"></i>
                                    <span>Add Duties</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/duties/update">
                                    <i className="bi bi-circle"></i>
                                    <span>Update Duties</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-layout-text-window-reverse"></i>
                            <span>Drivers</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/admin/drivers/">
                                    <i className="bi bi-circle"></i>
                                    <span>List Drivers</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/drivers/add">
                                    <i className="bi bi-circle"></i>
                                    <span>Add Driver</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-bar-chart"></i>
                            <span>Vehicles</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/admin/vehicles/">
                                    <i className="bi bi-circle"></i>
                                    <span>List Vehicles</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/vehicles/add">
                                    <i className="bi bi-circle"></i>
                                    <span>Add Vehicles</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-gem"></i>
                            <span>Users</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                                <Link href="/admin/users/">
                                    <i className="bi bi-circle"></i>
                                    <span>List Users</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/users/add">
                                    <i className="bi bi-circle"></i>
                                    <span>Add Users</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-heading">Pages</li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" id="profile-sidebar"
                            href={"/admin/profile"}>
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </Link>
                    </li>


                </ul>

            </aside>
        </>
    )
}
