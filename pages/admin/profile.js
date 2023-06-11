import { AXIOS_BASE_URL } from "@/functions/constants";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import vehicle_styles from "@/styles/Vehicles.module.css";
import { Button } from "react-bootstrap";
import Router from "next/router";

import {
  GetProfile,
  updateProfileDetails,
} from "@/functions/apiHandlers/profile";

import AdminLayout from "@/components/admin/AdminLayout";

export default function Home() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const profile_pic = useRef(null);
  const profile_pic_edit = useRef(null);
  const [newUserDetails, setNewUserDetails] = useState({});
  const [imageSource, setImageSource] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSource(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  function setProfile() {
    profile_pic.current.src = "/assets/img/profile1.png";
    profile_pic_edit.current.src = "/assets/img/profile1.png";
  }

  function setU({ target: { name, value } }) {
    setNewUserDetails({
      ...newUserDetails,
      [name]: value,
    });
  }

  useEffect(() => {
    GetProfile().then((data) => {
      if (data.status != 401) setUser(data.user);
    });
  }, []);

  return (
    <>
      <AdminLayout title={"Profile"}>
        <main id="main" className="main col-10 mt-0">
          <h1>Profile</h1>
          <section>
            <div className="row opac-80">
              <div className="col-4">
                <div className="card">
                  <div className="card-body p-4 text-center">
                    {user.profile_pic && (
                      <img
                        src={
                          `${AXIOS_BASE_URL}/images/profilepic/` +
                          user.profile_pic
                        }
                        style={{
                          WebkitFilter: "drop-shadow(1px 1px 1px #222)",
                          filter: "drop-shadow(1px 1px 5px #222)",
                        }}
                        onError={setProfile}
                        ref={profile_pic}
                        width="100%"
                        alt="Profile"
                        className="mb-3"
                      />
                    )}
                    <h1 className={vehicle_styles.vehicle_name}>
                      {newUserDetails.name ? newUserDetails.name : user.name}
                    </h1>
                    <h4>
                      {newUserDetails.role ? newUserDetails.role : user.role}
                    </h4>
                    <h4>
                      Rank -
                      <b>
                        {newUserDetails.rank ? newUserDetails.rank : user.rank}
                      </b>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-8">
                <div className="card">
                  <div className="card-body pt-3">
                    <ul className="nav nav-tabs nav-tabs-bordered">
                      <li className="nav-item">
                        <button
                          className="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-overview"
                        >
                          <i className="bi bi-info-square"></i> About
                        </button>
                      </li>

                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-edit"
                        >
                          <i className="bi bi-pencil-square"></i> Edit Profile
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content pt-2">
                      <div
                        className="tab-pane fade show active profile-overview"
                        id="profile-overview"
                      >
                        <h5 className="card-title">Profile Details</h5>
                        <div style={{ fontSize: "1.2rem" }}>
                          <div className="row mb-3">
                            <div className="col-lg-3 col-md-4 label">
                              <i className="bi bi-person-check"></i> Name
                            </div>
                            <div className="col-lg-9 col-md-8">
                              : <b> {user.name}</b>
                            </div>
                          </div>
                          <div id="image-preview"></div>
                          <div className="row mb-3">
                            <div className="col-lg-3 col-md-4 label ">
                              <i className="bi bi-person-lines-fill"></i>{" "}
                              Registration No
                            </div>
                            <div className="col-lg-9 col-md-8">
                              : <b>{user.user_registration_no}</b>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-lg-3 col-md-4 label">
                              <i className="bi bi-person-workspace"></i> Role
                            </div>
                            <div className="col-lg-9 col-md-8">
                              : <b>{user.role}</b>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-lg-3 col-md-4 label">
                              <i className="bi bi-arrow-up-circle-fill"></i>{" "}
                              Rank
                            </div>
                            <div className="col-lg-9 col-md-8">
                              : <b>{user.rank}</b>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-lg-3 col-md-4 label">
                              <i className="bi bi-phone"></i> Phone
                            </div>
                            <div className="col-lg-9 col-md-8">
                              : <b>{user.phone}</b>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-lg-3 col-md-4 label">
                              <i className="bi bi-envelope-at"></i> Email
                            </div>
                            <div className="col-lg-9 col-md-8">
                              : <b> {user.email}</b>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade profile-edit pt-3"
                        id="profile-edit"
                      >
                        <form
                          onSubmit={(e) => {
                            updateProfileDetails(e, setLoading, user);
                          }}
                        >
                          <div className="row mb-3">
                            <label
                              htmlFor="profileImage"
                              className="col-md-4 col-lg-3 col-form-label"
                            >
                              <i className="bi bi-file-image"></i> Profile Image
                            </label>
                            <div className="col-md-8 col-lg-9">
                              {!imageSource && user.profile_pic && (
                                <img
                                  src={
                                    `${AXIOS_BASE_URL}/images/profilepic/` +
                                    user.profile_pic
                                  }
                                  onError={setProfile}
                                  ref={profile_pic_edit}
                                  width="30%"
                                  alt="Profile"
                                />
                              )}

                              {imageSource && (
                                <img
                                  src={imageSource}
                                  alt="Preview Image"
                                  width="30%"
                                />
                              )}

                              <br />
                              <br />

                              <div>
                                <input
                                  onChange={handleInputChange}
                                  name="profile_pic"
                                  type="file"
                                  id="image_input"
                                  accept="image/png , image/jpg, image/jpeg,image/webp"
                                />
                                <div id="display_image"></div>
                              </div>
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
                                defaultValue={user.name}
                                placeholder="Enter your name"
                              />
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
                                id="company"
                                defaultValue={user.role}
                                placeholder="Enter your role"
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label
                              htmlFor="Job"
                              className="col-md-4 col-lg-3 col-form-label"
                            >
                              <i className="bi bi-arrow-up-circle-fill"></i>{" "}
                              Rank
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                onChange={setU}
                                name="rank"
                                type="text"
                                className="form-control"
                                id="Job"
                                defaultValue={user.rank}
                                placeholder="Enter your rank"
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
                                defaultValue={user.phone}
                                placeholder="Enter Your Contact No "
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label
                              htmlFor="Email"
                              className="col-md-4 col-lg-3 col-form-label"
                            >
                              <i className="bi bi-envelope-at"></i> Email |
                              Username
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <input
                                onChange={setU}
                                name="email"
                                type="email"
                                className="form-control"
                                id="Email"
                                defaultValue={user.email}
                                placeholder="Enter your email id"
                              />
                            </div>
                          </div>
                          <hr />
                          <div className="text-center">
                            {!loading && (
                              <Button
                                variant="primary"
                                type="submit"
                                className="w-50"
                              >
                                Update Profile
                              </Button>
                            )}
                            {loading && (
                              <>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  disabled
                                >
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Updating...
                                </button>
                              </>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </AdminLayout>
    </>
  );
}
