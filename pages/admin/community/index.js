import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dateFormat from "dateformat";
import Router from "next/router";
import { GetUserDetails } from "@/functions/apiHandlers/users";
import { GetUser } from "@/functions/loginAPI";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [userID, setUserID] = useState({});

  async function getPosts() {
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/community/posts",
      withCredentials: true,
    });
    return res.data;
  }

  async function likePost(e, id) {
    const res = await axios({
      method: "post",
      url: "http://localhost:3000/community/posts/like/" + id,
      withCredentials: true,
    });
    if (res.data.status === 200) {
      setPosts(
        posts.map((post) => {
          if (post._id === id) {
            post.liked = !post.liked;
          }
          return post;
        })
      );
    }
  }

  async function unlikePost(e, id) {
    const res = await axios({
      method: "post",
      url: "http://localhost:3000/community/posts/unlike/" + id,
      withCredentials: true,
    });
    if (res.data.status === 200) {
      setPosts(
        posts.map((post) => {
          if (post._id === id) {
            post.liked = !post.liked;
          }
          return post;
        })
      );
    }
  }

  useEffect(() => {
    GetUser().then((user) => {
      let userID = user.user._id;
      getPosts().then((res) => {
        console.log(res);
        res.forEach((post) => {
          if (post.likes.includes(userID)) {
            post.liked = true;
          } else {
            post.liked = false;
          }
        });
        setPosts(res);
      });
    });
  }, []);

  return (
    <>
      <AdminLayout title={"Community"}>
        <main
          id="main"
          className="main col-11 "
          style={{
            marginTop: "-2rem",
          }}
        >
          <div className="row">
            <div
              className="col-8 p-3 m-1 card"
              style={{
                maxHeight: "90vh",
                overflowY: "scroll",
              }}
            >
              <div
                id="markdown_preview"
                style={{
                  display: "flex",
                  maxWidth: "90%",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                {posts &&
                  posts.map((post, index) => {
                    let color;
                    let repostColor;
                    switch (post.type) {
                      case "issue":
                        color = "red";
                        break;
                      case "bug":
                        color = "orange";
                        break;
                      case "feature":
                        color = "blue";
                        break;
                      case "fixes":
                        color = "green";
                        break;
                      default:
                        color = "black";
                    }
                    if (post.repostFrom) {
                      switch (post.repostFrom.type) {
                        case "issue":
                          repostColor = "red";
                          break;
                        case "bug":
                          repostColor = "orange";
                          break;
                        case "feature":
                          repostColor = "blue";
                          break;
                        case "fixes":
                          repostColor = "green";
                          break;
                        default:
                          repostColor = "black";
                      }
                    }
                    return (
                      <div
                        key={index}
                        style={{
                          marginBottom: "2rem",
                          cursor: "pointer",
                          border: "0px",
                        }}
                        className=" p-4"
                      >
                        <div style={{}}>
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
                        <div
                          style={{
                            maxHeight: "80vh",
                            overflow: "hidden",
                            marginBottom: "3rem",
                          }}
                          onClick={() => {
                            Router.push("/admin/community/post/" + post._id);
                          }}
                        >
                          <div className="josefin-sans">
                            <Button
                              style={{
                                backgroundColor: color,
                                padding: "0rem 0.3rem",
                                borderRadius: "0.5rem",
                                border: "0px",
                              }}
                            >
                              {post.type}
                            </Button>{" "}
                            {post.title}
                          </div>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            children={post.content}
                          />
                          {post.repostFrom && (
                            <div
                              style={{
                                maxWidth: "50%",
                                border: "1px solid black",
                                padding: "1rem",
                                marginTop: "1rem",
                              }}
                            >
                              {post.repostFrom.createdBy.name},{" "}
                              {post.repostFrom.createdBy.rank}
                              <span style={{ float: "right" }}>
                                {dateFormat(
                                  post.repostFrom.date,
                                  "mmmm dS, yyyy"
                                )}
                              </span>
                              <div className="josefin-sans">
                                <Button
                                  style={{
                                    backgroundColor: repostColor,
                                    padding: "0rem 0.3rem",
                                    borderRadius: "0.5rem",
                                    border: "0px",
                                  }}
                                >
                                  {post.repostFrom.type}
                                </Button>{" "}
                                {post.repostFrom.title}
                              </div>
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                children={post.repostFrom.content}
                              />
                            </div>
                          )}
                        </div>

                        <div
                          className="row text-center"
                          style={{
                            borderTop: "1px solid #000056bd",
                            borderBottom: "1px solid #000056bd",
                          }}
                        >
                          {post.liked ? (
                            <div
                              className="col p-1"
                              style={{
                                backgroundColor: "white",
                                color: "rgb(164 103 228)",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor =
                                  "rgb(164 103 228)";
                                e.target.style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "white";
                                e.target.style.color = "rgb(164 103 228)";
                              }}
                              onClick={(e) => {
                                unlikePost(e, post._id);
                              }}
                            >
                              <i className="bi bi-check2-circle"></i> Liked
                            </div>
                          ) : (
                            <div
                              className="col p-1"
                              style={{
                                backgroundColor: "white",
                                color: "#470888",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#470888";
                                e.target.style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "white";
                                e.target.style.color = "#470888";
                              }}
                              onClick={(e) => {
                                likePost(e, post._id);
                              }}
                            >
                              <i className="bi bi-hand-thumbs-up-fill"></i> Like
                            </div>
                          )}

                          <div
                            className="col p-1"
                            style={{
                              backgroundColor: "white",
                              color: "#470888",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#470888";
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "#470888";
                            }}
                          >
                            <i className="bi bi-chat-text-fill"></i> Comment
                          </div>
                          <div
                            className="col p-1"
                            style={{
                              backgroundColor: "white",
                              color: "#470888",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#470888";
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "#470888";
                            }}
                            onClick={(e) => {
                              Router.push(
                                "/admin/community/post/" + post._id + "/repost"
                              );
                            }}
                          >
                            <i className="bi bi-at"></i> Repost
                          </div>
                          <div
                            className="col p-1"
                            style={{
                              backgroundColor: "white",
                              color: "#470888",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#470888";
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "#470888";
                            }}
                          >
                            <i className="bi bi-bookmark-check-fill"></i> Mark
                            as Read
                          </div>
                          <div
                            className="col p-1"
                            style={{
                              backgroundColor: "white",
                              color: "#470888",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#470888";
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "#470888";
                            }}
                          >
                            <i className="bi bi-save2"></i> Save
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <br />
            </div>
            <div
              className="col-3 card p-3 m-1"
              style={{
                maxHeight: "50vh",
              }}
            >
              <Button
                className="btn btn-dark w-100 mb-1"
                onClick={() => {
                  Router.back();
                }}
              >
                Back
              </Button>
              <Link href={"/admin/community/new"}>
                <Button className="btn btn-success w-100">
                  + New Community Post
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}
