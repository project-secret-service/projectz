import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import { GetMemos } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [memos, setMemos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetMemos().then((data) => {
      if (data.length == 0) {
        return;
      }
      setMemos(data);
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title="Defect Memos">
        <main
          id="main"
          className="col-lg-11 main  opac-80"
          style={{
            marginTop: "-2rem",
          }}
        >
          <Row>
            <div className="col-lg-8">
              <div className="card p-3">
                {memos.length != 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">Defects</th>
                        <th scope="col">Jobs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memos.map((memo, index) => {
                        let no_of_defects = memo.defects?.length || 0;
                        let no_of_jobs = memo.job_works?.length || 0;
                        return (
                          <tr
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              Router.push(
                                "/admin/workshop/defectmemos/" + memo._id
                              );
                            }}
                          >
                            <th scope="row">{index + 1}</th>
                            <td>
                              {dateFormat(memo.date, "dS mmmm, yyyy - DDDD")}
                            </td>
                            <td>{memo.vehicle.name}</td>
                            <td>{no_of_defects}</td>
                            <td>{no_of_jobs}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <b>
                    No Defect Memos Found. <br />
                    Please Add a new Memo to view it here.
                  </b>
                )}
              </div>
            </div>
            <div className="col-3 card p-3">
              <Button
                className="mb-1"
                variant="dark"
                onClick={() => {
                  Router.back();
                }}
              >
                BACK
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections");
                }}
              >
                <i className="bi bi-card-checklist"></i> Inspections
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections/add");
                }}
              >
                <i className="bi bi-plus-circle"></i> Add Inspection Report
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/add");
                }}
              >
                <i className="bi bi-plus-circle"></i> Add Memo
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards");
                }}
              >
                <i className="bi bi-credit-card-2-front"></i> Job Cards
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards/add");
                }}
              >
                <i className="bi bi-plus-circle"></i> Add Job Card
              </Button>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
