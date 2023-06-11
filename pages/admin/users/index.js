import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { GetUsers } from "@/functions/apiHandlers/users";
import { AXIOS_BASE_URL } from "@/functions/constants";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [users, setUsers] = useState([]);
  const searchFilterRef = useRef();
  const [searchResultList, setSearchResultList] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    GetUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  function handleSearchFilter({ target: { name, value } }) {
    let searchFilter = value;
  }

  function handleSearch({ target: { name, value } }) {
    let search = value;
    let searchFilter = searchFilterRef.current.value;
    if (search == "") {
      setSearch(false);
      return;
    }
    setSearch(true);
    if (searchFilter == "name") {
      setSearchResultList(
        users.filter(
          (user) =>
            user.name && user.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "registration_no") {
      setSearchResultList(
        users.filter(
          (user) =>
            user.registration_no &&
            user.registration_no.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "role") {
      setSearchResultList(
        users.filter(
          (user) =>
            user.role && user.role.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "rank") {
      setSearchResultList(
        users.filter(
          (user) =>
            user.rank && user.rank.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }

  function OpenLink(link) {
    Router.push("/admin/users/" + link);
  }
  return (
    <>
      <AdminLayout title={"All Users"}>
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
                        <th scope="col">Reg No</th>
                        <th scope="col">Job</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
                    <tbody style={{ cursor: "pointer" }}>
                      {!search &&
                        users.map((user, index) => {
                          return (
                            <tr
                              key={index + 1}
                              onClick={() => OpenLink(user._id)}
                            >
                              <td>
                                {user.profile_pic && (
                                  <img
                                    src={
                                      `${AXIOS_BASE_URL}/images/profilepic/` +
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
                              <td>{user.rank}</td>
                              <td>{user.role}</td>
                            </tr>
                          );
                        })}
                      {search &&
                        searchResultList.map((user, index) => {
                          return (
                            <tr
                              key={index + 1}
                              onClick={() => OpenLink(user._id)}
                            >
                              <td>
                                {user.profile_pic && (
                                  <img
                                    src={
                                      `${AXIOS_BASE_URL}/images/profilepic/` +
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
                              <td>{user.rank}</td>
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
              style={{ maxHeight: "50vh" }}
            >
              <div className="row p-3">
                <input
                  onChange={handleSearch}
                  name="search"
                  type="text"
                  className="form-control"
                  placeholder="Search"
                ></input>
              </div>

              <select
                className="form-select text-center"
                ref={searchFilterRef}
                aria-label="Default select example"
                onChange={handleSearchFilter}
                defaultValue={"name"}
              >
                <option value="name">Name of User</option>
                <option value="registration_no">Registration No</option>
                <option value="rank">Rank</option>
                <option value="role">Role</option>
              </select>

              <hr></hr>

              <Link href={"/admin/users/add"}>
                <Button className="w-100 mb-1 btn-light">
                  <i class="bi bi-plus-lg"></i> Add Users
                </Button>
              </Link>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
