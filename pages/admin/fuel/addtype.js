import { Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { addOilType } from "@/functions/apiHandlers/fuel";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <AdminLayout title={`Add Oil Type`}>
        <main id="main" className="col-lg-10 main mt-0 opac-80">
          <div className="d-flex">
            <div className="col-12">
              <h1>Add Oil Type</h1>
              <Row>
                <div className="card col-8 m-1 p-5">
                  <div className="card-body">
                    <form onSubmit={addOilType}>
                      <ToastContainer />
                      <div className="row mb-3">
                        <label
                          htmlFor="inputText"
                          className="col-sm-5 col-form-label"
                        >
                          Name Of Oil
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="text"
                            name="type"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-sm-10">
                          <button
                            type="submit"
                            className="btn btn-success"
                            style={{ float: "right", width: "50%" }}
                          >
                            + Add Oil Type
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-3 card m-1 p-3">
                  <Button
                    className="w-100 mb-1 btn-dark"
                    onClick={() => {
                      Router.back();
                    }}
                  >
                    BACK
                  </Button>
                  <hr />

                  <Link href={"/admin/fuel/balance/log"}>
                    <Button className="w-100 mb-1 btn-light">
                      <i className="bi bi-list-task"></i> Oil Balance Log
                    </Button>
                  </Link>

                  <Link href={"/admin/fuel/balance"}>
                    <Button className="w-100 mb-1 btn-light">
                      <i className="bi bi-box-seam"></i> Show Balance
                    </Button>
                  </Link>

                  <Link href={"/admin/fuel/add"}>
                    <Button className="w-100 mb-1 btn-light">
                      <i className="bi bi-pencil-square"></i> Update Balance
                    </Button>
                  </Link>
                  <Link href={"/admin/fuel/allot"}>
                    <Button className="w-100 mb-1 btn-light">
                      <i className="bi bi-fuel-pump-fill"></i> Allot Fuel
                    </Button>
                  </Link>
                </div>
              </Row>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
