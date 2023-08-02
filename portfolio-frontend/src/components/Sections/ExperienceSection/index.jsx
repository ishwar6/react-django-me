import React from "react";

function ExperienceSection({ experienceData }) {
  return (
    <>
      {experienceData.length > 0 && (
        <div className="ftco_section ftco-no-pb" id="experience_section">
          <div className="container">
            <div className="row justify-content-center pb-5 mb-5">
              <div className="col-md-10 heading_section text-center ftco-animate">
                <h1 className="big big-2">Experience</h1>
                <h2 className="mb-4">Experience</h2>
              </div>
            </div>
            <div className="row">
              {experienceData?.map((experience, index) => {
                return (
                  <div className="p-3 col-md-6" key={index}>
                    <div className="resume-wrap">
                      <span className="date">{experience?.duration}</span>
                      <h2>{experience?.position}</h2>
                      <span className="position">{experience?.company}</span>
                      <p className="mt-4">{experience?.description}</p>
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

export default ExperienceSection;
