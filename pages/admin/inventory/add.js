import Router from "next/router";
import Link from "next/link";
import { Button, Row, Col } from "react-bootstrap";
import { addNewItem } from "@/functions/apiHandlers/inventory";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  return (
    <>
      <AdminLayout title={`Add New Item`}>
        <main id="main" className="col-lg-10 main mt-0">
          <h1>Add New Item</h1>
          <Row>
            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={addNewItem}>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Name :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Cost :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="Number"
                          name="rate"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Quantity :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="number"
                          name="quantity"
                          className="form-control"
                          placeholder="0"
                          value="0"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-5 col-form-label"
                      >
                        Description :
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="text-center">
                        <button type="submit" className="btn btn-success w-100">
                          Add Item
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 card p-4 m-1"
              style={{ maxHeight: "20vh" }}
            >
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <Link href={"/admin/inventory/storage"}>
                <Button className="w-100 mb-1 btn-disabled">List Items</Button>
              </Link>
              <Link href={"/admin/inventory/history"}>
                <Button className="w-100 mb-1 btn-warning">History</Button>
              </Link>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
