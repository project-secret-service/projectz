import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import dateFormat from "dateformat";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Link from "next/link";
import { getOilBalanceLog, getOil } from "@/functions/apiHandlers/fuel";
import AdminLayout from "@/components/admin/AdminLayout";

const Post = () => {
  const router = useRouter();
  const [oilbalances, setOilBalances] = useState([]);
  const [oil, setOil] = useState({});
  const searchFilterRef = useRef();
  const [searchResultList, setSearchResultList] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    getOilBalanceLog(id).then((data) => {
      data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setOilBalances(data);
    });
    getOil(id).then((data) => {
      setOil(data);
    });
  }, [router.isReady]);

  function handleSearchFilter({ target: { name, value } }) {
    let searchFilter = value;
    if (searchFilter != "issued" && searchFilter != "recieved") {
      setSearch(false);
      return;
    }
    setSearch(true);
    if (searchFilter == "issued") {
      setSearchResultList(
        oilbalances.filter((oilbalance) => oilbalance.issued)
      );
    }
    if (searchFilter == "recieved") {
      setSearchResultList(
        oilbalances.filter((oilbalance) => oilbalance.recieved)
      );
    }
  }

  function handleSearch({ target: { name, value } }) {
    let search = value;
    let searchFilter = searchFilterRef.current.value;
    if (search == "") {
      setSearch(false);
      return;
    }
    setSearch(true);
    if (searchFilter == "voucher_no") {
      setSearchResultList(
        oilbalances.filter(
          (oilbalance) =>
            (oilbalance.recieve_voucher_no &&
              oilbalance.recieve_voucher_no
                .toLowerCase()
                .includes(search.toLowerCase())) ||
            (oilbalance.issue_voucher_no &&
              oilbalance.issue_voucher_no
                .toLowerCase()
                .includes(search.toLowerCase()))
        )
      );
    }
    if (searchFilter == "type") {
      setSearchResultList(
        oilbalances.filter(
          (oilbalance) =>
            oilbalance.type.type &&
            oilbalance.type.type.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchFilter == "date") {
      setSearchResultList(
        oilbalances.filter(
          (oilbalance) =>
            oilbalance.date &&
            dateFormat(oilbalance.date, "dS mmmm, yyyy - dddd").includes(search)
        )
      );
    }
  }

  return (
    <>
      <AdminLayout title={`${oil.type} Balance Log`}>
        <main id="main" className="col-11 mt-n2 row opac-80">
          <Row>
            <div className="col-8 m-1 card p-4">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Voucher (IV/RV)</th>
                    <th scope="col">Date</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Difference</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Iss / Rec
                    </th>
                  </tr>
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                  {!search &&
                    oilbalances.map((oilbalance, index) => {
                      return (
                        <tr
                          key={index + 1}
                          onClick={() => {
                            router.push(
                              "/admin/fuel/voucher/" + oilbalance._id
                            );
                          }}
                        >
                          {oilbalance.recieved && (
                            <>
                              <th>{oilbalance.recieve_voucher_no}</th>
                              <td>
                                {oilbalance.date &&
                                  dateFormat(
                                    oilbalance.date,
                                    " dS mmmm, yyyy - dddd"
                                  )}
                              </td>
                              <td>{oilbalance.current_balance} L</td>

                              <td>
                                <span style={{ color: "green" }}>
                                  +{oilbalance.recieved_amount} L
                                </span>
                              </td>
                              <td className="text-center">
                                <span style={{ color: "green" }}>
                                  <i className="bi bi-box-arrow-in-down"></i>
                                </span>
                              </td>
                            </>
                          )}
                          {oilbalance.issued && (
                            <>
                              <th>{oilbalance.issue_voucher_no}</th>
                              <td>
                                {oilbalance.date &&
                                  dateFormat(
                                    oilbalance.date,
                                    " dS mmmm, yyyy - dddd"
                                  )}
                              </td>
                              <td>{oilbalance.current_balance} L</td>
                              <td>
                                <span style={{ color: "red" }}>
                                  - {oilbalance.issued_amount} L
                                </span>
                              </td>

                              <td className="text-center">
                                <span style={{ color: "red" }}>
                                  <i className="bi bi-box-arrow-up"></i>
                                </span>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  {search &&
                    searchResultList.map((oilbalance, index) => {
                      return (
                        <tr
                          key={index + 1}
                          onClick={() => {
                            router.push(
                              "/admin/fuel/voucher/" + oilbalance._id
                            );
                          }}
                        >
                          {oilbalance.recieved && (
                            <>
                              <th>{oilbalance.recieve_voucher_no}</th>
                              <td>{oilbalance.current_balance}</td>
                              <td>
                                <span style={{ color: "green" }}>
                                  +{oilbalance.recieved_amount}
                                </span>
                              </td>
                              <td>
                                {oilbalance.date &&
                                  dateFormat(
                                    oilbalance.date,
                                    " dS mmmm, yyyy - dddd"
                                  )}
                              </td>
                              <td className="text-center">
                                <span style={{ color: "green" }}>RECIEVED</span>
                              </td>
                            </>
                          )}
                          {oilbalance.issued && (
                            <>
                              <th>{oilbalance.issue_voucher_no}</th>
                              <td>{oilbalance.current_balance}</td>
                              <td>
                                <span style={{ color: "red" }}>
                                  - {oilbalance.issued_amount}
                                </span>
                              </td>
                              <td>
                                {oilbalance.date &&
                                  dateFormat(
                                    oilbalance.date,
                                    " dS mmmm, yyyy - dddd"
                                  )}
                              </td>
                              <td>
                                <span style={{ color: "red" }}>ISSUED</span>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="col-3 m-1 card p-3">
              <div style={{ justifyContent: "center", textAlign: "center" }}>
                <h1>
                  Current Balance <br />
                  <span className="josefin-sans">
                    {oil ? oil.balance : "0"} L
                  </span>
                </h1>
              </div>

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
                defaultValue={"voucher"}
              >
                <option value="voucher_no">Voucher</option>
                <option value="date">Date</option>
                <option value="issued">Issued</option>
                <option value="recieved">Recieved</option>
              </select>

              <hr></hr>
              <Link href={"/admin/fuel/add"}>
                <Button
                  onClick={() => {
                    router.back();
                  }}
                  className="w-100 mb-1 btn-dark"
                >
                  BACK
                </Button>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-pencil-square"></i> Update Balance
                </Button>
              </Link>
              <Link href={"/admin/fuel/allot"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-fuel-pump-fill"></i> Allot Fuel
                </Button>
              </Link>

              <Link href={"/admin/fuel/addtype"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-alexa"></i> Add Oil Type
                </Button>
              </Link>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
};
export default Post;
