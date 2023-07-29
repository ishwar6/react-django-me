import React from "react";

function EducationSection({ educationData }) {
  return (
    <>
      {educationData?.length > 0 && (
        <div className="ftco_section ftco-no-pb" id="education_section">
          <div className="container">
            <div className="row justify-content-center pb-5 mb-5">
              <div className="col-md-10 heading_section text-center ">
                <h1 className="big big-2">Education</h1>
                <h2 className="mb-4">Education</h2>
              </div>
            </div>
            <div className="row">
              {educationData?.map((education, index) => {
                return (
                  <div className="p-4 col-md-6" key={index}>
                    <div className="resume-wrap">
                      <span className="date">{education?.duration}</span>
                      <h2>{education?.degree}</h2>
                      <span className="position">{education?.institution}</span>
                      <p className="mt-4">
                      {education?.description}
                      </p>
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

export default EducationSection;
