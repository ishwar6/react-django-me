import React from "react";
import { BASEURL } from "../../../Utils/Api/axiosClient";
import { useNavigate } from "react-router-dom";

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
                <h2 className="mb-4">Our Projects</h2>
                {projectsData?.description !== "" && (
                  <p>{projectsData?.description}</p>
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
                      url = `/projects/project_id=${project.id}`;
                      navigate(url);
                    }}
                  >
                    <div
                      className="project img ftco-animate d-flex justify-content-center align-items-center"
                      style={{
                        backgroundImage: `url(${BASEURL + project?.file})`,
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
