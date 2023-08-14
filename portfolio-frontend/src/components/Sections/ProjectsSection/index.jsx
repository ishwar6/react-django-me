import React from "react";
import { BASEURL } from "../../../Utils/Api/axiosClient";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import moment from "moment/moment";

function ProjectsSection({ projectsData }) {
  const navigate = useNavigate();
  return (
    <>
      {projectsData?.projects?.length > 0 && (
        <div className="ftco_section ftco-project" id="projects_section">
          <div className="container">
            <div className="row justify-content-center pb-5">
              <div className="col-md-12 heading_section text-center ftco-animate">
                <h1 className="big big-2">Projects</h1>
                <h2 className="mb-4">My Projects</h2>
                {projectsData?.description !== "" && (
                  <p>{parse(projectsData?.description)}</p>
                )}
              </div>
            </div>
            <div className="row">
              {projectsData?.projects?.map((project, index) => {
                return (
                  <div
                    className="col-md-6 col-lg-4"
                    key={index}
                    onClick={() => {
                      let url;
                      url = `/projects/${project.slug}`;
                      navigate(url);
                    }}
                  >
                    <div
                      className="blog-entry justify-content-end"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="project img ftco-animate d-flex justify-content-center align-items-center"
                        style={{
                          backgroundImage: project?.file
                            ? `url(${BASEURL + project?.file})`
                            : "url(/images/projectDummy.jpg)",
                        }}
                      >
                        <div className="overlay"></div>
                        <div className="text text-center p-4">
                          <h3>
                            <a href="">{project?.name}</a>
                          </h3>
                          <span>{project?.service}</span>
                        </div>
                      </div>
                      <div className="text mt-3 d-block">
                        <div className="d-flex align-items-center mb-3 meta">
                          <p className="mb-0">
                            <span className="mr-2">
                              {moment(project.created_at).format(
                                "MMMM DD, YYYY"
                              )}
                            </span>
                          </p>
                        </div>
                        <h3 className="heading">
                          <a>{project?.name}</a>
                        </h3>
                        <p className="description">{parse(project?.description)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <a
              onClick={() => {
                navigate("/projects/");
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >{`View More >>`}</a>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsSection;
