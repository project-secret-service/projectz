import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { addNewDriver } from "@/functions/apiHandlers/drivers";
import Router from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [driver, setDrivers] = useState({});
  const [imageSource, setImageSource] = useState("");

  const handleInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSource(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  function setD({ target: { name, value } }) {
    console.log(driver);
    setDrivers((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    setDrivers((prev) => ({ ...prev, role: "driver" }));
  }, []);

  return (
    <>
      <AdminLayout title="Add New Driver">
        <main id="main" className="col-11 main mt-n2 opac-80">
          <div className="row">
            <div className="card col-8 m-1">
              <div className="card-body">
                <form
                  onSubmit={(event) => {
                    addNewDriver(event, driver);
                  }}
                >
                  <div className="row mb-3">
                    <label
                      htmlFor="profileImage"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-file-image"></i> Profile Image
                    </label>
                    <div className="col-sm-7">
                      {imageSource && (
                        <>
                          <img
                            src={imageSource}
                            alt="Preview Image"
                            width="30%"
                          />
                          <br />
                          <br />
                        </>
                      )}
                      <div>
                        <input
                          onChange={handleInputChange}
                          name="profile_pic"
                          type="file"
                          id="image_input"
                          accept="image/png,image/jpg,image/jpeg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Name :
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Full Name"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Designation:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="text"
                        name="designation"
                        className="form-control"
                        placeholder="Enter Designation"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Rank:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="text"
                        name="rank"
                        className="form-control"
                        placeholder="Enter Rank"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Role:
                    </label>
                    <div className="col-sm-7">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="role"
                        onChange={setD}
                      >
                        <option value="driver" selected>
                          Driver
                        </option>
                        <option value="officer">Officer</option>
                        <option value="viewer">Viewer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Username:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter Username"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Password:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      License No:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="string"
                        name="license_no"
                        className="form-control"
                        placeholder="Enter License No"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Date From:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="date"
                        name="date_from"
                        className="form-control"
                        placeholder="Enter Date From"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Date To:
                    </label>
                    <div className="col-sm-7">
                      <input
                        onChange={setD}
                        type="date"
                        name="date_to"
                        className="form-control"
                        placeholder="Enter Date To"
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
                        + Add Driver
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-3 card m-1 p-5">
              <Button
                onClick={() => {
                  Router.back();
                }}
                className="w-100 mb-1 btn-dark"
              >
                BACK
              </Button>
              <hr />
              <Link href={"/admin/drivers/"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-list-task"></i> List Drivers
                </Button>
              </Link>
              <Link href={"/admin/drivers/available"}>
                <Button className="w-100 mb-1 btn-light">
                  <i className="bi bi-list-task"></i> Available Drivers
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
