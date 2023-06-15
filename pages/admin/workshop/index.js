import AdminLayout from "@/components/admin/AdminLayout";
import Router from "next/router";
import { Button } from "react-bootstrap";

const Post = () => {
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
              <div></div>
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
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/");
                }}
              >
                Defect Memos
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/defectmemos/add");
                }}
              >
                Add Memos
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards");
                }}
              >
                Job Cards
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/jobcards/add");
                }}
              >
                Add Job Cards
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections");
                }}
              >
                Inspections
              </Button>
              <Button
                className="mb-1 btn-light"
                onClick={() => {
                  Router.push("/admin/workshop/inspections/add");
                }}
              >
                + Add Inspection
              </Button>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
};
export default Post;
