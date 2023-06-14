import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import { GetProfile } from "@/functions/apiHandlers/profile";
import dateFormat from "dateformat";
import axios from "axios";

export default function Community() {
  const [data, setData] = useState("");
  const [postid, setPostId] = useState(null);
  const [user, setUser] = useState(null);
  const [showImageInput, setImageInput] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // [image1, image2, image3
  const [images, setImages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const [repostForID, setRepostForID] = useState(null);
  const [title, setTitle] = useState("");

  async function postToCommunity() {
    let imageUrls = data
      .match(/!\[.*?\]\([^)]+\)/g)
      .map((match) => match.match(/\/([^/]+)\)$/)[1]);

    let imageNames = [];
    if (imageUrls.length != 0) {
      imageNames = imageUrls.map((image) => {
        return image.split("_")[1];
      });
    }

    const res = await axios({
      method: "post",
      url: "http://localhost:3000/community/posts/post",
      withCredentials: true,
      data: {
        postid: postid,
        images: imageNames,
      },
    });
    // if (res.data.status === 200) {
    console.log(res.data);
    // Router.push("/admin/community");
    // }
  }

  function uploadImage() {
    setImageInput(!showImageInput);
  }

  async function saveChanges() {
    const res = await axios({
      method: "post",
      url: "http://localhost:3000/community/posts/temp_post/save_changes",
      withCredentials: true,
      data: {
        postid: postid,
        data: data,
      },
    });
    if (res.data.status === 200) {
      setDisabled(true);
    }
  }

  async function copyImageToClipboard(image) {
    try {
      setSelectedImage(image);
      let text = `![Alt Text](http://localhost:3000/images/temp_post_images/${postid}_${image})`;
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.log(error);
    }
  }

  async function onImageChange(event) {
    const res = await axios({
      method: "post",
      url: "http://localhost:3000/community/posts/temp_post/upload_image",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        image: event.target.files[0],
        postid: postid,
      },
    });
    setImages([...images, res.data.image]);
    setImageInput(false);
  }

  async function createNewTempPost() {
    const res = await axios({
      method: "post",
      url: "http://localhost:3000/community/posts/new_temp_post",
      withCredentials: true,
    });
    return res.data;
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setRepostForID(id);
    GetProfile().then((res) => {
      setUser(res.user);
    });
    createNewTempPost().then((res) => {
      if (res.content) {
        setData(res.content);
      }
      const imgs = res.images.map((image) => {
        return image.name;
      });
      setImages(imgs);
      setPostId(res._id);
    });
  }, [router.isReady]);

  return (
    <>
      <AdminLayout title={"Community"}>
        <main
          id="main"
          className="main col-11"
          style={{
            marginTop: "-2rem",
          }}
        >
          <div className="row">
            <div className="col-6">
              <div>
                <div className="d-flex">
                  <Button
                    onClick={() => {
                      Router.back();
                    }}
                    className="btn btn-dark w-25 m-1"
                  >
                    BACK
                  </Button>
                  {showImageInput && (
                    <>
                      <div className="form-group">
                        <input
                          type="file"
                          className="form-control-file"
                          id="exampleFormControlFile1"
                          style={{ width: "100%", padding: "0.5rem" }}
                          onChange={onImageChange}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                      </div>
                    </>
                  )}
                  {!showImageInput && (
                    <Button
                      onClick={uploadImage}
                      className="btn btn-light w-25"
                      style={{ margin: "0.2rem" }}
                    >
                      Upload Image
                    </Button>
                  )}

                  <Button
                    onClick={saveChanges}
                    className="btn btn-success w-25"
                    style={{ margin: "0.2rem" }}
                    {...(disabled && { disabled: true })}
                  >
                    Save Changes
                  </Button>

                  {disabled && (
                    <Button
                      onClick={postToCommunity}
                      className="btn btn-success w-25"
                      style={{ margin: "0.2rem" }}
                    >
                      POST
                    </Button>
                  )}
                </div>
                <div className="card mb-0 mt-2 p-1">
                  Repost For : {repostForID}
                </div>
                <div className="card mb-0  p-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    style={{ border: "none" }}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setDisabled(false);
                    }}
                  ></input>
                </div>
                <div className="card ">
                  <textarea
                    rows={2}
                    cols={6}
                    placeholder="Write Your Post Body Here"
                    style={{
                      padding: "1rem",
                      height: "50vh",
                      overflowY: "scroll",
                      border: "none",
                    }}
                    onChange={(e) => {
                      setData(e.target.value);
                      setDisabled(false);
                    }}
                    defaultValue={data}
                  ></textarea>
                </div>
                <div className="row p-3">
                  {images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="col-3 card"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          padding: "1rem",
                          position: "relative",
                        }}
                        onClick={() => {
                          copyImageToClipboard(image);
                        }}
                      >
                        <img
                          src={
                            "http://localhost:3000/images/temp_post_images/" +
                            postid +
                            "_" +
                            image
                          }
                          width="100%"
                        />
                        {selectedImage === image && (
                          <div
                            className="text-overlay"
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "#ffffffb0",
                              padding: " 10px",
                              color: "black",
                            }}
                          >
                            <p>Copied Image</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {user && (
              <>
                <div
                  className="col-6 card p-3"
                  style={{
                    maxHeight: "80vh",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <div style={{ maxWidth: "100%" }} id="markdown_preview">
                    <div>
                      <span style={{ color: "#000056bd", fontSize: "1.3rem" }}>
                        {user.name}
                      </span>
                      ,{" "}
                      <span style={{ color: "#884444b5", fontSize: "1rem" }}>
                        {user.rank}
                      </span>
                      <span style={{ color: "green", float: "right" }}>
                        {dateFormat(new Date(), "DDDD")}
                      </span>
                    </div>
                    <ReactMarkdown
                      children={data}
                      remarkPlugins={[remarkGfm]}
                    ></ReactMarkdown>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
