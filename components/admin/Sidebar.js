import Link from "next/link";

export default function SideBar(props) {
  return (
    <>
      <aside id="sidebar" className="sidebar opac-90">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              href={"/admin/"}
              id="dashboard-sidebar"
            >
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/duties"}
            >
              <i className="bi bi-person"></i>
              <span>Duties</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/vehicles"}
            >
              <i className="bi bi-person"></i>
              <span>Vehicles</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/workshop/"}
            >
              <i className="bi bi-person"></i>
              <span>Workshop</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/inventory/"}
            >
              <i className="bi bi-person"></i>
              <span>Inventory</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/fuel/balance"}
            >
              <i className="bi bi-person"></i>
              <span>Oil</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/drivers"}
            >
              <i className="bi bi-person"></i>
              <span>Drivers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              id="profile-sidebar"
              href={"/admin/users"}
            >
              <i className="bi bi-person"></i>
              <span>Users</span>
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
