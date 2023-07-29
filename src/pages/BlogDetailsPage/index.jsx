import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  PostComment,
  getCommentsData,
  getDetailsData,
  getRecentList,
} from "../../Utils/Api/Services/apiServices";
import { BASEURL } from "../../Utils/Api/axiosClient";
import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { Parser } from "html-to-react";

function BlogDetailsPage() {
  const location = useLocation();
  const { params } = useParams();
  const [details, setDetails] = useState(null);
  const [comments, setCommentsData] = useState([]);
  const [recentList, setRecentListData] = useState([]);
  const urlPrefix = location.pathname.split("/")[1];
  const parser = new Parser();
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
  });
  useEffect(() => {
    getDetailsData(urlPrefix + "/?" + params, setDetails);
    getCommentsData(
      `/blog-comments/?my_blog=${params.split("=")[1]}`,
      setCommentsData
    );
    getRecentList(urlPrefix + "/?recent=true", setRecentListData);
  }, []);
  return (
    <>
      {details && (
        <>
          <div
            className="hero-wrap"
            style={{
              backgroundImage: "url('/images/bg_1.jpg')",
              height: "600px",
              display: "flex",
              alignItems: "center",
            }}
            data-stellar-background-ratio="0.5"
          >
            <div className="overlay"></div>
            <div className="container">
              <div className="row no-gutters slider-text align-items-end justify-content-center">
                <div className="col-md-12 ftco-animate pb-5 mb-3 text-center">
                  <h1 className="mb-3 bread">{details?.name}</h1>
                  <p className="breadcrumbs">
                    <span className="mr-2">
                      <a href="index.html">
                        Home <i className="ion-ios-arrow-forward"></i>
                      </a>
                    </span>
                    <span className="mr-2">
                      <a href="blog.html">
                        {urlPrefix} <i className="ion-ios-arrow-forward"></i>
                      </a>
                    </span>
                    <span>{details?.name}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ftco-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 ftco-animate pt-3">
                  {details?.description !== "" && <p>{parser.parse(details?.description)}</p>}
                  {details?.file && (
                    <p>
                      <img
                        src={BASEURL + details?.file}
                        alt=""
                        className="img-fluid"
                      />
                    </p>
                  )}
                  {details?.subheadings?.length > 0 && (
                    <>
                      {details?.subheadings.map((subheading, index) => {
                        return (
                          <div key={index}>
                            <h2 className="mb-3">{subheading?.tittle}</h2>
                            {subheading?.file && (
                              <p>
                                <img
                                  src={BASEURL + subheading?.file}
                                  alt=""
                                  className="img-fluid"
                                />
                              </p>
                            )}
                            {subheading?.description !== "" && (
                              <p>{parser.parse(subheading?.description)}</p>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                  {details?.tags?.length > 0 && (
                    <div className="tag-widget post-tag-container mb-5 mt-5">
                      <div className="tagcloud">
                        {details?.tags?.map((tag, index) => {
                          return (
                            <a href="#" key={index} className="tag-cloud-link">
                              {tag}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {details?.about && (
                    <div className="about-author d-flex p-4 bg-dark">
                      {details?.about?.file && (
                        <div className="bio mr-5">
                          <img
                            src={BASEURL + details?.about?.file}
                            alt="Image placeholder"
                            className="img-fluid mb-4"
                          />
                        </div>
                      )}
                      <div className="desc">
                        {details?.about?.name !== "" && (
                          <h3>{details?.about?.name}</h3>
                        )}
                        {details?.about?.description !== "" && (
                          <p>{details?.about?.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="pt-5 mt-5">
                    {details?.comment_count > 0 && (
                      <>
                        <h3 className="mb-5">
                          {details?.comment_count} Comments
                        </h3>
                        {comments?.length > 0 && (
                          <ul className="comment-list">
                            {comments?.map((comment, index) => {
                              return (
                                <li className="comment" key={index}>
                                  <div className="comment-body">
                                    <h3>{comment?.name}</h3>
                                    <div className="meta">
                                      {moment(comment.created_at).format(
                                        "MMMM DD, YYYY"
                                      )}
                                    </div>
                                    <p>{comment?.message}</p>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </>
                    )}
                    <div className="comment-form-wrap pt-5">
                      <h3 className="mb-5">Leave a comment</h3>
                      <Formik
                        initialValues={{
                          id: details?.id,
                          name: "",
                          email: "",
                          message: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          PostComment(values, setSubmitting, resetForm);
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                        }) => (
                          <form
                            onSubmit={handleSubmit}
                            className="p-5 bg-dark rounded"
                            style={{ width: "100%" }}
                          >
                            <div className="form-group">
                              <label for="name">Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.name && errors.name && (
                                <div className="text-danger">{errors.name}</div>
                              )}
                            </div>
                            <div className="form-group">
                              <label for="email">Email *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.email && errors.email && (
                                <div className="text-danger">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                            <div className="form-group">
                              <label for="email">Message *</label>
                              <textarea
                                name="message"
                                cols="30"
                                rows="7"
                                className="form-control"
                                placeholder="Message"
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></textarea>
                              {touched.message && errors.message && (
                                <div className="text-danger">
                                  {errors.message}
                                </div>
                              )}
                            </div>
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-primary py-3 px-5"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Posting..." : "Post Comment"}
                              </button>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 sidebar ftco-animate">
                  {recentList?.length > 0 && (
                    <div className="sidebar-box ftco-animate">
                      <h3 className="heading-sidebar">Recent Blog</h3>
                      {recentList?.map((recentItem, index) => {
                        return (
                          <div className="block-21 mb-4 d-flex" key={index}>
                            {recentItem?.file && (
                              <a
                                className="blog-img mr-4"
                                style={{
                                  backgroundImage: `url(${
                                    BASEURL + recentItem?.file
                                  })`,
                                  border:"2px solid white"
                                }}
                              ></a>
                            )}
                            <div className="text">
                              {recentItem?.name !== "" && (
                                <h3 className="heading">
                                  <a href="#">{recentItem?.name}</a>
                                </h3>
                              )}
                              <div className="meta">
                                <div>
                                  <a href="#">
                                    <span className="icon-calendar"></span>
                                    {moment(recentItem.created_at).format(
                                      "MMMM DD, YYYY"
                                    )}
                                  </a>
                                </div>
                                {recentItem?.comment_count > 0 && (
                                  <div>
                                    <a href="#">
                                      <span className="icon-chat"></span>
                                      {recentItem?.comment_count}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {details?.all_tags?.length > 0 && (
                    <div className="sidebar-box ftco-animate">
                      <h3 className="heading-sidebar">Tag Cloud</h3>
                      <div className="tagcloud">
                        {details?.all_tags?.map((tag, index) => {
                          return (
                            <a href="#" key={index} className="tag-cloud-link">
                              {tag}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BlogDetailsPage;
