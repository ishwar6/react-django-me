import React from "react";
import { BASEURL } from "../../../Utils/Api/axiosClient";

function ServicesSection({ servicesData }) {
  return (
    <>
      {servicesData?.services?.length > 0 && (
        <div className="ftco_section" id="services_section">
          <div className="container">
            <div className="row justify-content-center py-5 mt-5">
              <div className="col-md-12 heading_section text-center ftco-animate">
                <h1 className="big big-2">Services</h1>
                <h2 className="mb-4">Services</h2>
                {servicesData?.description !== "" && (
                  <p>{servicesData?.description}</p>
                )}
              </div>
            </div>
            <div className="row">
              {servicesData?.services.map((service, index) => {
                return (
                  <div
                    className="col-md-4 text-center d-flex ftco-animate"
                    key={index}
                  >
                    <a className="services-1">
                      <span className="icon">
                        <img src={BASEURL + service?.file} style={{height:"60px"}} alt="service"/>
                      </span>
                      <div className="desc">
                        <h3 className="mb-5">{service?.service}</h3>
                      </div>
                    </a>
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

export default ServicesSection;
