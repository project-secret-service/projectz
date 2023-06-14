import Link from "next/link";
import { LogOut } from "@/functions/loginAPI";
import { AXIOS_BASE_URL } from "@/functions/constants";
import { useContext, useEffect } from "react";
import AuthContext from "@/functions/auth/AuthContext";
import Router from "next/router";

export default function Header({ user, title }) {
  const { logout } = useContext(AuthContext);

  function ChangeSidebar() {
    document.body.classList.toggle("toggle-sidebar");
  }

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center opac-90"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link
            href="/admin/duties/"
            className="logo d-flex align-items-center"
            style={{ textDecoration: "none" }}
          >
            {/* <img
              style={{
                WebkitFilter: "drop-shadow(1px 1px 1px #222)",
                filter: "drop-shadow(1px 1px 5px #222)",
              }}
              src="/assets/img/logo.png"
              alt=""
            /> */}
            <span
              className="d-none d-lg-block josefin-sans"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              <span
                style={{
                  color: "red",
                }}
              >
                FLEET
              </span>
              MS
            </span>
          </Link>
          <i
            onClick={ChangeSidebar}
            className="bi bi-list toggle-sidebar-btn"
            id="sidebar-toggle"
          ></i>
          <div
            style={{
              marginLeft: "2rem",
              fontSize: "1.5rem",
              marginTop: "0.5rem",
            }}
            className="josefin-sans"
          >
            {title}
          </div>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            {/* <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>
              </ul>
            </li> */}

            {/* <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="/assets/img/messages-1.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="/assets/img/messages-2.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="/assets/img/messages-3.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>
              </ul>
            </li> */}
            <div className="search-bar" id="search_bar">
              <form
                className="search-form d-flex align-items-center"
                method="POST"
                action="#"
              >
                <input
                  type="text"
                  name="query"
                  placeholder="Search"
                  title="Enter search keyword"
                />
                <button type="submit" title="Search">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
            {user && (
              <>
                <li className="nav-item dropdown pe-3">
                  <a
                    className="nav-link nav-profile d-flex align-items-center pe-0"
                    href="/"
                    data-bs-toggle="dropdown"
                  >
                    {user.profile_pic && (
                      <img
                        src={
                          `${AXIOS_BASE_URL}/images/profilepic/` +
                          user.profile_pic
                        }
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          WebkitFilter: "drop-shadow(1px 1px 1px #222)",
                          filter: "drop-shadow(1px 1px 5px #222)",
                        }}
                        alt="Profile"
                      />
                    )}

                    {!user.profile_pic && (
                      <img
                        src="/assets/img/profile1.png"
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          borderRadius: "50%",
                          WebkitFilter: "drop-shadow(1px 1px 1px #222)",
                          filter: "drop-shadow(1px 1px 5px #222)",
                        }}
                      />
                    )}

                    <span
                      className="d-none d-md-block dropdown-toggle ps-2"
                      style={{
                        textShadow: "0.5px 0.5px 0.5px #222",
                        fontSize: "1.1rem",
                      }}
                    >
                      {user.name}
                    </span>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li className="dropdown-header">
                      <h6>{user.username}</h6>
                      <span>{user.role}</span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center"
                        href="/admin/profile"
                      >
                        <i className="bi bi-person"></i>
                        <span>My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center"
                        href="/admin/profile"
                      >
                        <i className="bi bi-gear"></i>
                        <span>Account Settings</span>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <Link
                        href={"/admin/lawbook"}
                        className="dropdown-item d-flex align-items-center"
                      >
                        <i className="bi bi-question-circle"></i>

                        <span>Law Book</span>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li style={{ cursor: "pointer" }}>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => {
                          LogOut().then((res) => {
                            if (res === 200) {
                              logout();
                              Router.push("/login");
                            }
                          });
                        }}
                      >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
