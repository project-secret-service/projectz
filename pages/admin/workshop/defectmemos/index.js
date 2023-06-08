import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import HeadAndSideBar from "@/pages/components/admin/HeadAndSideBar";
import Scripts from "@/pages/components/Scripts";
import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import { Button, Row } from "react-bootstrap";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import { GetMemos } from "@/functions/apiHandlers/workshop";

export default function Home() {
  const [memos, setMemos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetMemos().then((data) => {
      setMemos(data);
      console.log(data);
    });
  }, [router.isReady]);

  return (
    <>
      <main className={styles.main}>
        <HeadAndSideBar title={"Defect Memo"} />
        <main id="main" className="col-lg-10 main mt-0 opac-80">
          <h1>Defect Memos</h1>
          <Row>
            <div className="col-lg-8">
              <div className="card p-3">
                <table class="table">
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
                      console.log(memo);
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
              <Button
                className="mb-1 btn-success"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/add");
                }}
              >
                Add Memos
              </Button>
            </div>
          </Row>
        </main>
      </main>
      <Scripts />
      <Script src="/assets/js/main.js"></Script>
    </>
  );
}
