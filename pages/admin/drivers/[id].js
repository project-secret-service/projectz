import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetDriverDetails } from "@/functions/apiHandlers/drivers";
import { AXIOS_BASE_URL } from "@/functions/constants";
import AdminLayout from "@/components/admin/AdminLayout";

const Post = () => {
  const [driver, setDrivers] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetDriverDetails(id).then((data) => {
      setDrivers(data);
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title="Driver Details">
        <main id="main" className="col-11 main mt-n2 opac-80">
          <h1 className="josefin-sans mt-2">{driver.name}</h1>
          <Row>
            <div className="card col-8">
              <div className="row">
                <div className="col-4">
                  <div
                    className="d-flex p-5"
                    style={{
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    {driver.profile_pic && (
                      <img
                        src={
                          `${AXIOS_BASE_URL}/images/profilepic/` +
                          driver.profile_pic
                        }
                        style={{
                          maxWidth: "14vw",
                          maxHeight: "14vw",
                          WebkitFilter: "drop-shadow(1px 1px 1px #222)",
                          filter: "drop-shadow(1px 1px 5px #222)",
                        }}
                        alt="Avatar"
                      />
                    )}
                    {!driver.profile_pic && (
                      <img
                        src={"/assets/img/profile1.png"}
                        style={{
                          maxWidth: "14vw",
                          maxHeight: "14vw",
                          WebkitFilter: "drop-shadow(1px 1px 1px #222)",
                          filter: "drop-shadow(1px 1px 5px #222)",
                        }}
                        alt="Avatar"
                      />
                    )}
                  </div>
                </div>
                <div className="col-8 p-5">
                  <Row>
                    <Col>
                      <h3 className="josefin-sans">
                        <b>DRIVER DETAILS</b>
                      </h3>
                      <br />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        Name: <b>{driver.name}</b>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        Rank: <b>{driver.rank}</b>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        License No: <b>{driver.license_no}</b>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        Date from: <b>{driver.date_from}</b>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        Date to: <b>{driver.date_to}</b>
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 opac-80"
              style={{ maxHeight: "40vh" }}
            >
              <Button
                className="w-100 mb-1 btn-dark"
                onClick={() => {
                  router.back();
                }}
              >
                BACK
              </Button>
              <hr />
              <Link href={"/admin/drivers/add"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-plus-circle"> </i>Add Drivers
                </Button>
              </Link>

              <Link href={"/admin/drivers/"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-list-task"></i> List Drivers
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
