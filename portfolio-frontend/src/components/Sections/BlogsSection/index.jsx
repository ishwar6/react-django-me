import React from "react";
import { BASEURL } from "../../../Utils/Api/axiosClient";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

function BlogsSection({ blogsData }) {
  const navigate = useNavigate();
  return (
    <>
      {blogsData?.my_blog?.length > 0 && (
        <>
          <div className="ftco_section" id="my_blog_section">
            <div className="container">
              <div className="row justify-content-center mb-5 pb-5">
                <div className="col-md-7 heading_section text-center ftco-animate">
                  <h1 className="big big-2">Blogs</h1>
                  <h2 className="mb-4">My Blogs</h2>
                  {blogsData?.description !== "" && (
                    <p>{parse(blogsData?.description)}</p>
                  )}
                </div>
              </div>
              <div className="row d-flex">
                {blogsData?.my_blog?.map((blog, index) => {
                  return (
                    <div
                      className="col-md-6 col-lg-4 d-flex ftco-animate"
                      key={index}
                      onClick={() => {
                        let url;
                        url = `/blogs/${blog.slug}`;
                        navigate(url);
                      }}
                    >
                      <div
                        className="blog-entry justify-content-end"
                        style={{ width: "100%" }}
                      >
                        <a
                          className="block-20"
                          style={{
                            backgroundImage: blog?.file
                              ? `url(${BASEURL + blog?.file})`
                              : "url(/images/image_1.jpg)",
                          }}
                        ></a>
                        <div className="text mt-3 d-block">
                          <div className="d-flex align-items-center mb-3 meta">
                            <p className="mb-0">
                              <span className="mr-2">
                                {moment(blog.created_at).format(
                                  "MMMM DD, YYYY"
                                )}
                              </span>
                              {blog?.comment_count > 0 && (
                                <a href="" className="meta-chat">
                                  <span className="icon-chat"></span>
                                  {blog?.comment_count}
                                </a>
                              )}
                            </p>
                          </div>
                          <h3 className="heading">
                            <a>{blog?.name}</a>
                          </h3>
                          <p className="description">{parse(blog?.description)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a
                onClick={() => {
                  navigate("/blogs/");
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >{`View More >>`}</a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BlogsSection;
