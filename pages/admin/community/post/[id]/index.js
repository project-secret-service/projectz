import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dateFormat from "dateformat";
import Router, { useRouter } from "next/router";

export default function Community() {
  const [post, setPost] = useState({});
  const [fullImage, setFullImage] = useState("");
  const [viewFullImage, setViewFullImage] = useState(false);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const commentRef = useRef(null);

  async function commentOnPost() {
    const { id } = Router.query;
    const res = await axios({
      method: "post",
      url: "http://localhost:3000/community/posts/post/comment/" + id,
      withCredentials: true,
      data: {
        comment: commentRef.current.value,
      },
    });
    if (res.data.status === 200) {
      commentRef.current.value = "";
      console.log(res.data);
      setPost(res.data.post);
      let sortedcomments = res.data.post.comments.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setComments(sortedcomments);
    }
  }

  async function getPost(id) {
    console.log(id);
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/community/posts/post/" + id,
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  }

  useEffect(() => {
    //Add Event handler To Images
    const images = document.querySelectorAll("#markdown_preview p img");
    images.forEach((image) => {
      image.addEventListener("click", () => {
        setFullImage(image.src);
        setViewFullImage(true);
      });
      image.addEventListener("mouseover", () => {
        image.style.cursor = "pointer";
      });
    });
  }, [post]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = Router.query;
    getPost(id).then((res) => {
      if (res.status === 200) {
        setPost(res.post);
        let sortedcomments = res.post.comments.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setComments(sortedcomments);
      }
    });
  }, [router.isReady]);

  return (
    <>
      {viewFullImage && (
        <div
          className="d-flex"
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999",
            backgroundColor: "white",
          }}
        >
          <img
            src={fullImage}
            alt="Full Image"
            style={{
              maxHeight: "100%",
              height: "100%",
              maxWidth: "100%",
              alignSelf: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onClick={() => {
              setViewFullImage(false);
            }}
          />
        </div>
      )}
      <AdminLayout
        title={"Community"}
        style={{
          backgroundColor: "white",
        }}
      >
        <main
          id="main"
          className="main col-11"
          style={{
            marginTop: "-2rem",
          }}
        >
          <div className="row">
            <div
              className="col-9 p-3 card"
              style={{
                maxHeight: "93vh",
                overflowY: "scroll",
              }}
            >
              <div
                style={{
                  maxWidth: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {post && (
                  <div
                    className="col-9 p-3"
                  >
                    <div
                      style={{ maxWidth: "100%", marginBottom: "5rem" }}
                      id="markdown_preview"
                    >
                      <div style={{ marginBottom: "2rem" }}>
                        <span
                          style={{ color: "#000056bd", fontSize: "1.5rem" }}
                        >
                          {post.createdBy && post.createdBy.name}
                        </span>
                        ,{" "}
                        <span
                          style={{ color: "#884444b5", fontSize: "1.3rem" }}
                        >
                          {post.createdBy && post.createdBy.rank}
                        </span>
                        <span
                          style={{
                            color: "green",
                            float: "right",
                            fontSize: "1.2rem",
                          }}
                        >
                          {dateFormat(post.date, "DDDD")}
                        </span>
                      </div>
                      <ReactMarkdown
                        children={post.content}
                        remarkPlugins={[remarkGfm]}
                      ></ReactMarkdown>
                    </div>
                    <hr />
                    <h3 className="josefin-sans">Comments</h3>
                    <div style={{ fontSize: "0.8rem" }}>
                      {comments.map((comment, index) => (
                        <div key={index}>
                          {comment && (
                            <div className="row">
                              <div className="col-1">
                                {comment.createdBy.profile_pic && (
                                  <img
                                    src={
                                      "http://localhost:3000/images/profilepic/" +
                                      comment.createdBy.profile_pic
                                    }
                                    alt="Profile Pic"
                                    style={{
                                      width: "2rem",
                                      height: "2rem",
                                      borderRadius: "50%",
                                    }}
                                  />
                                )}
                              </div>
                              <div className="col">
                                <b>{comment.createdBy.name}</b>
                                <span
                                  style={{ float: "right", color: "#00000073" }}
                                >
                                  {dateFormat(comment.date, "hh:MM tt DDDD")}
                                </span>
                                <br /> {comment.comment} <br />
                                <br />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <br />
            </div>
            <div className="col-3  p-3" style={{ maxHeight: "93vh" }}>
              <div
                style={{
                  maxHeight: "30%",
                }}
                className="card p-3"
              >
                <Button
                  className="btn btn-dark mb-1 w-100"
                  onClick={() => {
                    Router.back();
                  }}
                >
                  BACK
                </Button>
                <Link href={"/admin/community/new"}>
                  <Button className="btn btn-success w-100">
                    + New Community Post
                  </Button>
                </Link>
              </div>

              <div
                style={{
                  height: "70%",
                }}
                className="card p-3"
              >
                <Button className="btn btn-light mb-1 w-100">Like </Button>
                <br />
                <br />
                <textarea
                  className="form-control mb-1"
                  placeholder="Write Comment Here"
                  style={{
                    height: "40%",
                  }}
                  ref={commentRef}
                ></textarea>
                <Button
                  className="btn btn-success w-100 mb-1"
                  onClick={commentOnPost}
                >
                  Comment
                </Button>
                <Button className="btn btn-primary w-100">Show Comments</Button>
              </div>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
