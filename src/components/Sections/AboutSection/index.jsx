import moment from "moment/moment";

function AboutSection({ aboutData }) {
  return (
    <div className="ftco-about img ftco_section ftco-no-pb" id="about_section">
      <div className="container">
        <div className="row d-flex">
          <div className="col-md-6 col-lg-5 d-flex">
            <div className="img-about img d-flex align-items-stretch">
              <div className="overlay"></div>
              <div
                className="img d-flex align-self-stretch align-items-center"
                style={{
                  backgroundImage: "url(/src/images/bg_1.png)",
                }}
              ></div>
            </div>
          </div>
          <div className="col-md-6 col-lg-7 pl-lg-5 pb-5">
            <div className="row justify-content-start pb-3">
              <div className="col-md-12 heading_section">
                <h1 className="big">About</h1>
                <h2 className="mb-4">About Me</h2>
                {aboutData?.description !== "" && (
                  <p>{aboutData?.description}</p>
                )}
                <ul className="about-info mt-4 px-md-0 px-2">
                  {aboutData?.name !== "" && (
                    <li className="d-flex">
                      <span>Name:</span> <span>{aboutData.name}</span>
                    </li>
                  )}
                  {aboutData?.date_of_birth !== "" && (
                    <li className="d-flex">
                      <span>Date of birth:</span>{" "}
                      <span>
                        {moment(aboutData?.date_of_birth).format(
                          "MMMM DD, YYYY"
                        )}
                      </span>
                    </li>
                  )}
                  {aboutData?.address !== "" && (
                    <li className="d-flex">
                      <span>Address:</span>
                      <span>{aboutData?.address}</span>
                    </li>
                  )}
                  {aboutData?.zip_code !== "" && (
                    <li className="d-flex">
                      <span>Zip code:</span> <span>1000</span>
                    </li>
                  )}
                  {aboutData?.email !== "" && (
                    <li className="d-flex">
                      <span>Email:</span> <span>{aboutData?.email}</span>
                    </li>
                  )}
                  {aboutData?.phone !== "" && (
                    <li className="d-flex">
                      <span>Phone: </span> <span>{aboutData?.phone}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="counter-wrap d-flex mt-md-3">
              <div className="text">
                <p>
                  <a href="#" className="btn btn-primary py-3 px-3">
                    Download CV
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;