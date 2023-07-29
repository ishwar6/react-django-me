import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListsData } from "../../Utils/Api/Services/apiServices";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../Utils/Api/axiosClient";

function ListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [listData, setListData] = useState(null);
  const Heading = location.pathname.split("/")[1];
  useEffect(() => {
    getListsData(location.pathname, listData, setListData);
  }, []);
  return (
    <>
      {listData?.data?.length > 0 && (
        <>
          <div className="ftco_section" id="my_blog_section">
            <div className="container">
              <div className="row justify-content-center mb-5 pb-5">
                <div className="col-md-7 heading_section text-center ftco-animate">
                  <h1 className="big big-2">{Heading}</h1>
                  <h2 className="mb-4">{`Our ${Heading}`}</h2>
                </div>
              </div>
              <div className="row d-flex">
                {listData?.data?.map((listItem, index) => {
                  return (
                    <div
                      className="col-md-6 d-flex ftco-animate"
                      key={index}
                      onClick={() => {
                        let url;
                        if (Heading === "projects") {
                          url = `/${Heading}/project_id=${listItem.id}`;
                        } else {
                          url = `/${Heading}/my_blog=${listItem.id}`;
                        }
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
                            backgroundImage: listItem?.file
                              ? `url(${BASEURL + listItem?.file})`
                              : "url(/images/image_1.jpg)",
                          }}
                        ></a>
                        <div className="text mt-3 ml-5 float-right d-block">
                          <div className="d-flex align-items-center mb-3 meta">
                            <p className="mb-0">
                              <span className="mr-2">
                                {Heading === "projects"
                                  ? listItem?.service
                                  : moment(listItem.created_at).format(
                                      "MMMM DD, YYYY"
                                    )}
                              </span>
                              {listItem?.comment_count > 0 && (
                                <a href="#" className="meta-chat">
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
              {listData?.next_link && (
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
    </>
  );
}

export default ListPage;
