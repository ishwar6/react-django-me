import React from "react";

function SkillsSection({ skillsData }) {
  return (
    <>
      {skillsData?.skills?.length > 0 && (
        <div className="ftco_section" id="skills_section">
          <div className="container">
            <div className="row justify-content-center pb-5">
              <div className="col-md-12 heading_section text-center ftco-animate">
                <h1 className="big big-2">Skills</h1>
                <h2 className="mb-4">My Skills</h2>
                {skillsData?.description !== "" && (
                  <p>{skillsData?.description}</p>
                )}
              </div>
            </div>
            <div className="row">
              {skillsData?.skills?.map((skill, index) => {
                return (
                  <div className="col-md-6 animate-box" key={index}>
                    <div className="progress-wrap ftco-animate">
                      <h3>{skill?.skill}</h3>
                      <div className="progress">
                        <div
                          className="progress-bar color-1"
                          role="progressbar"
                          aria-valuenow="90"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${skill?.percentage}%`,
                          }}
                        >
                          <span>{`${skill?.percentage}%`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SkillsSection;
