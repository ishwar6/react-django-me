import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  PostComment,
  getCommentsData,
  getDetailsData,
  getRecentList,
} from "../../Utils/Api/Services/apiServices";
import { BASEURL } from "../../Utils/Api/axiosClient";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import Gist from 'super-react-gist'
import parse, { attributesToProps } from 'html-react-parser';
import RecentSection from "../../components/Sections/RecentSection";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";

export const descriptionStyles = {
  fontFamily: "source-serif-pro, Georgia, Cambria, 'Times New Roman', Times, serif",
  fontSize: "1.3rem"
}

function BlogDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const pageLoading = useSelector((state) => state?.pageLoading?.pageLoading);
  const { params } = useParams();
  const [details, setDetails] = useState(null);
  const [comments, setCommentsData] = useState(null);
  const [recentList, setRecentListData] = useState([]);
  const [commentsLoader, setCommentsLoader] = useState(false);
  const urlPrefix = location.pathname.split("/")[1];
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
  });
  const formik = useFormik({});
  const options = {
    replace: ({ attribs }) => attribs && attribs.class === 'gist' && <Gist {...attributesToProps(attribs)} />
  }

  useEffect(() => {
    getDetailsData(dispatch, navigate, urlPrefix + "/?" + params, setDetails);
    getCommentsData(
      `/blog-comments/?my_blog=${params.split("=")[1]}`,
      comments,
      setCommentsData,
      setCommentsLoader
    );
    getRecentList(urlPrefix + "/?recent=true", setRecentListData);
  }, []);
  return (
    <>
      {pageLoading ? <Loader /> :
        <Layout>
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
                    <div className="col-md-12 ftco-animate mb-3 text-center">
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
                  <div className="row justify-content-center">
                    <div className="col-lg-8 ftco-animate pt-3">
                      {details?.description !== "" && <p style={descriptionStyles} className="my-3">{parse(details?.description, options)}</p>}
                      {details?.file && (
                        <p className="d-flex justify-content-center p-5">
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
                                <h2 className="my-3">{subheading?.tittle}</h2>
                                {subheading?.file && (
                                  <p className="d-flex justify-content-center p-5">
                                    <img
                                      src={BASEURL + subheading?.file}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </p>
                                )}
                                {subheading?.description !== "" && (
                                  <p style={descriptionStyles} className="my-3">{parse(subheading?.description, options)}</p>
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
                                <a href=""
                                  onClick={() => {
                                    navigate(`/blogs/?tag=${tag}`)
                                  }}
                                  key={index}
                                  className="tag-cloud-link">
                                  {tag}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div className="row sidebar ftco-animate">
                        <div className="col-md-6">
                          {recentList?.length > 0 && (
                            <div className="sidebar-box ftco-animate">
                              <h3 className="heading-sidebar">Recent Blog</h3>
                              {recentList?.map((recentItem, index) => {
                                return (
                                  <RecentSection recentItem={recentItem} key={index} />
                                );
                              })}
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
                          )}
                        </div>

                        {details?.all_tags?.length > 0 && (
                          <div className="sidebar-box ftco-animate col-md-6">
                            <h3 className="heading-sidebar">Tags</h3>
                            <div className="tagcloud">
                              {details?.all_tags?.map((tag, index) => {
                                return (
                                  <a href=""
                                    onClick={() => {
                                      navigate(`/blogs/?tag=${tag}`)
                                    }}
                                    key={index}
                                    className="tag-cloud-link">
                                    {tag}
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      {details?.about && (
                        <div className="about-author d-flex flex-column flex-md-row p-4 bg-dark">
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
                              {comments?.count} Comments
                            </h3>
                            {comments?.data?.length > 0 && (
                              <ul className="comment-list">
                                {comments?.data?.map((comment, index) => {
                                  return (
                                    <li className="comment" key={index}>
                                      <div className="comment-body">
                                        <h3>{comment?.name}</h3>
                                        <div className="meta">
                                          {moment(comment.created_at).format(
                                            "MMMM DD, YYYY hh:mm A z "
                                          )}IST
                                        </div>
                                        <p>{parse(comment?.message)}</p>
                                      </div>
                                    </li>
                                  );
                                })}
                                {comments?.next_link &&
                                  <a
                                    onClick={() => {
                                      getCommentsData(
                                        comments.next_link.split(BASEURL)[1],
                                        comments,
                                        setCommentsData,
                                        setCommentsLoader,
                                        true
                                      );
                                    }}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      width: "100%",
                                    }}
                                  >{commentsLoader ? "Loadind..." : `View More >>`}</a>}
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
                              if (!formik.isSubmitting) {
                                setTimeout(() => {
                                  getCommentsData(
                                    `/blog-comments/?my_blog=${params.split("=")[1]}`,
                                    comments,
                                    setCommentsData,
                                    setCommentsLoader,
                                    false
                                  );
                                }, 1000)
                              }
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
                                  <label htmlFor="name">Name *</label>
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
                                  <label htmlFor="email">Email *</label>
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
                                  <label htmlFor="email">Message *</label>
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
                  </div>
                </div>
              </div>
            </>
          )}
        </Layout>
      }
    </>
  );
}

export default BlogDetailsPage;
