import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import { GetMemos } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [memos, setMemos] = useState([]);
  const [memo, setMemo] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetMemos().then((data) => {
      setMemos(data);
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={`Job Cards`}>
        <main id="main" className="col-lg-11 main mt-n2 opac-80">
          <Row>
            <div className="col-lg-8">
              <div className="card p-3">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Vehicle</th>
                      <th scope="col">Job</th>
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                <i class="bi bi-card-checklist"></i> Inspections
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections/add");
                }}
              >
                <i class="bi bi-plus-circle"></i> Add Inspection Report
              </Button>
              <hr />
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/");
                }}
              >
                <i class="bi bi-card-list"></i> Defect Memos
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/add");
                }}
              >
                <i class="bi bi-plus-circle"></i> Add Memo
              </Button>
              <hr />

              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards/add");
                }}
              >
                <i class="bi bi-plus-circle"></i> Add Job Card
              </Button>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
