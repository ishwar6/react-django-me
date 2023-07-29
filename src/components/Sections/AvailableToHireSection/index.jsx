import { Parser } from "html-to-react";
import React from "react";

function AvailableToHireSection({ hireMeData }) {
  const parser = new Parser();
  return (
    <div
      className="ftco_section ftco-hireme img margin-top"
      id="available_hire"
      style={{
        backgroundImage: hireMeData?.file
          ? `url(${BASEURL + hireMeData?.file})`
          : "url(/src/images/bg_1.jpg)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 ftco-animate text-center">
            {hireMeData?.main_text !== "" && (
              <h2>{parser.parse(hireMeData?.main_text)}</h2>
            )}
            {hireMeData?.description !== "" && <p>{hireMeData?.description}</p>}
            {hireMeData?.is_button_available && (
              <p className="mb-0">
                <a href="#" className="btn btn-primary py-3 px-5">
                  {hireMeData?.button_text
                    ? hireMeData?.button_text
                    : "Hire me"}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableToHireSection;
