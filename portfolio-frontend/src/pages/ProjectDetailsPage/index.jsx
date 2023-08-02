import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getDetailsData,
  getRecentList,
} from "../../Utils/Api/Services/apiServices";
import { BASEURL } from "../../Utils/Api/axiosClient";
import Gist from 'super-react-gist'
import parse, { attributesToProps } from 'html-react-parser';
import RecentSection from "../../components/Sections/RecentSection";
import { descriptionStyles } from "../BlogDetailsPage";

function ProjectDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { params } = useParams();
  const [details, setDetails] = useState(null);
  const [recentList, setRecentListData] = useState([]);
  const urlPrefix = location.pathname.split("/")[1];
  const options = {
    replace: ({ attribs }) => attribs && attribs.class === 'gist' && <Gist {...attributesToProps(attribs)} />
  }
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
              <div className="row flex-column align-items-center">
                <div className="col-lg-8 ftco-animate pt-3">
                  {details?.description !== "" && (
                    <p style={descriptionStyles}>{parse(details?.description, options)}</p>
                  )}
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
                            <h2 className="mb-3">{subheading?.tittle}</h2>
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
                              <p style={descriptionStyles}>{parse(subheading?.description, options)}</p>
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
                <div className="col-lg-8 sidebar ftco-animate">
                  {recentList?.length > 0 && (
                    <div className="sidebar-box ftco-animate">
                      <h3 className="heading-sidebar">Recent Projects</h3>
                      {recentList?.map((recentItem, index) => {
                        return (
                          <RecentSection recentItem={recentItem} key={index} />
                        );
                      })}
                      <a
                        onClick={() => {
                          navigate("/projects/");
                        }}
                      >{`View More >>`}</a>
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
