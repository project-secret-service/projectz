import AdminLayout from "@/components/admin/AdminLayout";
import Router from "next/router";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

async function GetWorkshopDetails() {
  const res = await axios({
    method: "get",
    url: "http://localhost:3000/workshop",
    withCredentials: true,
  });
  return res.data;
}

const Post = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    GetWorkshopDetails().then((data) => {
      let defectmemos = data;
      let jobs = [];
      defectmemos.forEach((defectmemo) => {
        defectmemo.job_works?.forEach((job_work) => {
          jobs.push({
            job: job_work.name,
            completed: job_work.completed,
            vehicle: `CRP-(${defectmemo.vehicle.vehicle_crp_no}) ${defectmemo.vehicle.registration_no} (${defectmemo.vehicle.name})`,
          });
        });
      });
      console.log(jobs);
      setJobs(jobs);
    });
  }, []);

  return (
    <>
      <AdminLayout title={`Workshop Page`}>
        <main
          id="main"
          className="main col-11 opac-90"
          style={{
            marginTop: "-2rem",
          }}
        >
          <div className="row">
            <div className="col-8 card p-3">
              <div>
                <div className="col-6" style={{ border: "0px" }}>
                  <div className="">
                    <div class="list-group">
                      {jobs.map((job, index) => (
                        <a
                          href="#"
                          class="list-group-item list-group-item-action"
                        >
                          <i class="bi bi-tools"></i> <b>{job.job}</b> <br />{" "}
                          {job.vehicle}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
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
                  Router.push("/admin/workshop/defectmemos/");
                }}
              >
                <i className="bi bi-card-list"></i> Defect Memos
              </Button>
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
          </div>
        </main>
      </AdminLayout>
    </>
  );
};
export default Post;
