import React from "react";
import parse from 'html-react-parser';
import { useLocation, useNavigate } from "react-router-dom";
import { handleSectionNavigation } from "../../Header";
import { BASEURL } from "../../../Utils/Api/axiosClient";

function AvailableToHireSection({ hireMeData }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div
      className="ftco_section ftco-hireme img margin-top"
      id="available_hire"
      style={{
        backgroundImage: hireMeData?.file
          ? `url(${BASEURL + hireMeData?.file})`
          : "url(/images/bg_1.jpg)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 ftco-animate text-center">
            {hireMeData?.main_text !== "" && (
              <h3>{parse(hireMeData?.main_text)}</h3>
            )}
            {hireMeData?.description !== "" && <p style={{color:"white"}}>{hireMeData?.description}</p>}
            {hireMeData?.is_button_available && (
              <p className="mb-0">
                <a onClick={() => handleSectionNavigation(location, navigate, "contact_section")} className="btn btn-primary py-3 px-5">
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
