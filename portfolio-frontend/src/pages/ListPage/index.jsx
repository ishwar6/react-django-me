import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListsData } from "../../Utils/Api/Services/apiServices";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../Utils/Api/axiosClient";
import { handleDetailPageNavigation } from "../../Utils/Functions.js/functions";
import MultiSelectDropdown from "../../components/MultiselectDropdown";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet";

function ListPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageLoading = useSelector((state) => state?.pageLoading?.pageLoading);
  const [listData, setListData] = useState(null);
  const pathPrefix = location.pathname.split("/")[1];
  const searchParams = location.search;
  const tagParams = searchParams?.split('?tag=')[1]?.split("%20")?.join(" ")?.split(',')?.filter((tag) => tag !== "");

  useEffect(() => {
    getListsData(dispatch, navigate, location, listData, setListData);
  }, []);
  return (
    <>
      {pageLoading ?
        <Loader /> :
        <Layout>
          {listData?.meta &&
            <Helmet>
              <title>{listData?.meta?.title}</title>
              <meta name="description" content={listData?.meta?.description} />
            </Helmet>}
          {listData?.results?.data?.length > 0 && (
            <>
              <div className="ftco_section" id="my_blog_section">
                <div className="container">
                  <div className="row justify-content-center mb-5 pb-5">
                    <div className="col-md-7 heading_section text-center ftco-animate">
                      <h1 className="big big-2">{pathPrefix}</h1>
                      <h2 className="mb-4">{`My ${pathPrefix}`}</h2>
                    </div>
                  </div>
                  {
                    listData?.results?.all_tags?.length > 0 &&
                    <div style={{
                      justifyContent: searchParams === "" ? "flex-start" : "center"
                    }} className="row mb-4 px-4 py-1 d-flex align-items-center">
                      {searchParams !== "" && <h4 className="col-lg-6" style={{ textAlign: "center" }}>{`Filtered by tags: ${tagParams.join(', ')}`}</h4>}
                      <MultiSelectDropdown tags={listData?.results?.all_tags} selected={searchParams === "" ? [] : tagParams} />
                    </div>
                  }
                  <div className="row d-flex">
                    {listData?.results?.data?.map((listItem, index) => {
                      return (
                        <div
                          className="col-md-4 d-flex ftco-animate"
                          key={index}
                          onClick={() => handleDetailPageNavigation(navigate, pathPrefix, listItem)}
                        >
                          <div
                            className="blog-entry justify-content-end"
                            style={{ width: "100%" }}
                          >
                            <a
                              className="block-20"
                              style={{
                                backgroundImage: listItem?.file
                                  ? `url(${BASEURL + listItem?.file})`
                                  : "url(/images/image_1.jpg)",
                              }}
                            ></a>
                            <div className="text mt-3 ml-5 float-right d-block">
                              <div className="d-flex align-items-center mb-3 meta">
                                <p className="mb-0">
                                  <span className="mr-2">
                                    {pathPrefix === "projects"
                                      ? listItem?.service
                                      : moment(listItem.created_at).format(
                                        "MMMM DD, YYYY"
                                      )}
                                  </span>
                                  {listItem?.comment_count > 0 && (
                                    <a href="" className="meta-chat">
                                      <span className="icon-chat"></span>
                                      {listItem?.comment_count}
                                    </a>
                                  )}
                                </p>
                              </div>
                              <h3 className="heading">
                                <a>{listItem?.name}</a>
                              </h3>
                              <p className="description">{listItem?.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {listData?.results?.next_link && (
                    <a
                      href=""
                      onClick={() => {
                        getListsData(location.pathname, listData, setListData);
                      }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >{`View More >>`}</a>
                  )}
                </div>
              </div>
            </>
          )}
        </Layout>
      }
    </>
  );
}

export default ListPage;
