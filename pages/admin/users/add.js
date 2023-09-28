import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import Link from "next/link";
import { AddNewUser } from "@/functions/apiHandlers/users";
import Router from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [imageSource, setImageSource] = useState("");
  const [newUserDetails, setNewUserDetails] = useState({});
  const [error, setError] = useState({
    emailRequired: "",
    duplicateEmail: "",
    passwordRequired: "",
    nameRequired: "",
  });

  function setU({ target: { name, value } }) {
    setNewUserDetails({
      ...newUserDetails,
      [name]: value,
    });
  }

  function setEmail({ target: { name, value } }) {
    setError({
      emailRequired: "",
      duplicateEmail: "",
    });
    setNewUserDetails({
      ...newUserDetails,
      [name]: value,
    });
  }

  function setName({ target: { name, value } }) {
    setError({
      nameRequired: "",
    });
    setNewUserDetails({
      ...newUserDetails,
      [name]: value,
    });
  }

  function setPassword({ target: { name, value } }) {
    setError({
      passwordRequired: "",
    });
    setNewUserDetails({
      ...newUserDetails,
      [name]: value,
    });
  }

  async function addUser(event) {
    event.preventDefault();
    const res = await AddNewUser(newUserDetails);
    if (res.data.status == 409) {
      setError({
        ...error,
        duplicateEmail: res.data.message,
      });
    }
    if (res.data.status == 406 && res.data.check == "name") {
      setError({
        ...error,
        nameRequired: res.data.message,
      });
    }
    if (res.data.status == 406 && res.data.check == "email") {
      setError({
        ...error,
        emailRequired: res.data.message,
      });
    }
    if (res.data.status == 406 && res.data.check == "password") {
      setError({
        ...error,
        passwordRequired: res.data.message,
      });
    }
    if (res.data.status == 200) {
      Router.push("/admin/users");
    }
  }

  const handleInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSource(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    setNewUserDetails({
      ...newUserDetails,
      photo: event.target.files[0],
    });
  };

  return (
    <>
      <AdminLayout title={`Add User`}>
        <main id="main" className="col-lg-11 main mt-n2">
          <Row>
            <div className="col-lg-8">
              <div className="card p-3 m-1">
                <form onSubmit={addUser}>
                  <div className="row mb-3">
                    <label
                      htmlFor="profileImage"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-file-image"></i> Profile Image
                    </label>
                    <div className="col-md-8 col-lg-9">
                      {imageSource && (
                        <img
                          src={imageSource}
                          alt="Preview Image"
                          width="30%"
                        />
                      )}
                      <div>
                        <input
                          onChange={handleInputChange}
                          name="profile_pic"
                          type="file"
                          accept="image/png,image/jpg,image/jpeg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="Phone"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-phone"></i> User Registration No
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        onChange={setU}
                        name="registration_no"
                        type="text"
                        className="form-control"
                        placeholder="Enter Registration Number"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="fullName"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-person-check"></i> Name
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        onChange={setU}
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                      <span style={{ color: "red" }}>{error.nameRequired}</span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="company"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-person-workspace"></i> Role
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        onChange={setU}
                        name="role"
                        type="text"
                        className="form-control"
                        placeholder="Enter Role"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="Job"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-arrow-up-circle-fill"></i> Rank
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        onChange={setU}
                        name="rank"
                        type="text"
                        className="form-control"
                        placeholder="Enter Rank"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="Phone"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-phone"></i> Phone No
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        onChange={setU}
                        name="phone"
                        type="number"
                        className="form-control"
                        placeholder="Enter Contact No"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="Email"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-envelope-at"></i> Email
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        onChange={setEmail}
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter Email Id"
                        autoComplete="off"
                      />
                      <span style={{ color: "red" }}>
                        {error.duplicateEmail}
                      </span>
                      <span style={{ color: "red" }}>
                        {error.emailRequired}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="Phone"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      <i className="bi bi-phone"></i> Set Password
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        onChange={setPassword}
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        autoComplete="off"
                      />
                      <span style={{ color: "red" }}>
                        {error.passwordRequired}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-success w-50">
                      + Add User
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-3 card p-4 m-1" style={{ maxHeight: "10vh" }}>
              <Link href={"/admin/users"}>
                <Button className="w-100 mb-1 btn btn-light">
                  <i className="bi bi-list-ul"></i> Users List
                </Button>
              </Link>
            </div>
          </Row>
        </main>
      </AdminLayout>
    </>
  );
}
