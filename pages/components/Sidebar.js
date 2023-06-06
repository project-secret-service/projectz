import Link from "next/link";
import { useEffect } from "react";

export default function SideBar(props) {
  return (
    <>
      <aside id="sidebar" className="sidebar opac-90">
        <ul className="sidebar-nav" id="sidebar-nav">
          {/* <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href={"/admin/"}
              id="dashboard-sidebar"
            >
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-layout-text-window-reverse"></i>
              <span>Duties</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="forms-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
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
            <a
              className="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-person-fill-gear"></i>
              <span>Drivers</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="tables-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
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
            <a
              className="nav-link collapsed"
              data-bs-target="#charts-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-truck"></i>
              <span>Vehicles</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="charts-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
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
            <a
              className="nav-link collapsed"
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-people"></i>
              <span>Users</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
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

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#fuel-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-fuel-pump"></i>
              <span>Fuel</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="fuel-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="/admin/fuel/balance">
                  <i className="bi bi-circle"></i>
                  <span>Balance</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/fuel/balance/log">
                  <i className="bi bi-circle"></i>
                  <span>Balance Log</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/fuel/add">
                  <i className="bi bi-circle"></i>
                  <span>Add Fuel</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/fuel/allot">
                  <i className="bi bi-circle"></i>
                  <span>Allot Fuel</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#workshop-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-tools"></i>
              <span>Workshop</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="workshop-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="/admin/workshop/receive">
                  <i className="bi bi-circle"></i>
                  <span>Recieve Voucher</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/workshop/issue">
                  <i className="bi bi-circle"></i>
                  <span>Issue Voucher</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/workshop/defectmemos/">
                  <i className="bi bi-circle"></i>
                  <span>Defect Memo</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/workshop/jobcards/">
                  <i className="bi bi-circle"></i>
                  <span>Job Card</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#inspection-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-list-check"></i>
              <span>Inspection</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="inspection-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="/admin/inspection/inspect/">
                  <i className="bi bi-circle"></i>
                  <span>Inspect Vehicle</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/inspection/">
                  <i className="bi bi-circle"></i>
                  <span>Inspection History</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#inventory-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-box-seam"></i>
              <span>Inventory</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="inventory-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="/admin/inventory/orders/order">
                  <i className="bi bi-circle"></i>
                  <span>Order an Item</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/inventory/issues/issue">
                  <i className="bi bi-circle"></i>
                  <span>Issue an item</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/inventory/add/">
                  <i className="bi bi-circle"></i>
                  <span>Add an item</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/inventory/storage">
                  <i className="bi bi-circle"></i>
                  <span>Storage</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/inventory/history">
                  <i className="bi bi-circle"></i>
                  <span>Inventory History</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/track"}
            >
              <i className="bi bi-compass"></i>
              <span>Track Vehicles</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/profile"}
            >
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
