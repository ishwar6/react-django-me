import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getDetailsData,
  getRecentList,
} from "../../Utils/Api/Services/apiServices";
import { BASEURL } from "../../Utils/Api/axiosClient";
import moment from "moment";
import { Parser } from "html-to-react";
import Gist from "react-gist";

function ProjectDetailsPage() {
  const location = useLocation();
  const { params } = useParams();
  const [details, setDetails] = useState(null);
  const [recentList, setRecentListData] = useState([]);
  const urlPrefix = location.pathname.split("/")[1];
  const parser = new Parser();
  useEffect(() => {
    getDetailsData(urlPrefix + "/?" + params, setDetails);
    getRecentList(urlPrefix + "/?recent=true", setRecentListData);
  }, []);
  return (
    <>
      {details && (
        <>
          <div
            className="hero-wrap"
            style={{
              backgroundImage: "url('/src/images/bg_1.jpg')",
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
                  {details?.description !== "" && (
                    <p>{parser.parse(details?.description)}</p>
                  )}
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
                </div>
                <div className="col-lg-4 sidebar ftco-animate">
                  {recentList?.length > 0 && (
                    <div className="sidebar-box ftco-animate">
                      <h3 className="heading-sidebar">Recent Projects</h3>
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
                                  border: "2px solid white",
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectDetailsPage;
