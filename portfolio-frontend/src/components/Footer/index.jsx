function Footer({ sections, aboutData, socialLinks }) {
  return (
    <div className="ftco-footer ftco_section">
      <div className="container">
        <div className="row mb-5 justify-content-around">
          <div className="col-md-4">
            <div className="ftco-footer-widget mb-4">
              {aboutData && aboutData?.description !== "" && (
                <>
                  <h2 className="ftco-heading-2">About</h2>
                  <p>{aboutData?.description}</p>
                </>
              )}
              {sections?.social_media && (
                <ul className="ftco-footer-social list-unstyled mt-5" style={aboutData ? {} : { display: "flex", justifyContent: "center" }}>
                  {socialLinks?.twitter && (
                    <li className="ftco-animate">
                      <a target="blank" href={socialLinks?.twitter}>
                        <span className="icon-twitter"></span>
                      </a>
                    </li>
                  )}
                  {socialLinks?.facebook && (
                    <li className="ftco-animate">
                      <a target="blank" href={socialLinks?.facebook}>
                        <span className="icon-facebook"></span>
                      </a>
                    </li>
                  )}
                  {socialLinks?.instagram && (
                    <li className="ftco-animate">
                      <a target="blank" href={socialLinks?.instagram}>
                        <span className="icon-instagram"></span>
                      </a>
                    </li>
                  )}

                  {socialLinks?.github && (
                    <li className="ftco-animate">
                      <a target="blank" href={socialLinks?.github}>
                        <span className="icon-github"></span>
                      </a>
                    </li>
                  )}
                  {socialLinks?.linkedin && (
                    <li className="ftco-animate">
                      <a target="blank" href={socialLinks?.linkedin}>
                        <span className="icon-linkedin"></span>
                      </a>
                    </li>
                  )}
                  {socialLinks?.youtube && (
                    <li className="ftco-animate">
                      <a target="blank" href={socialLinks?.youtube}>
                        <span className="icon-youtube"></span>
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
          {
            aboutData &&
            <div className="col-md-4">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">Have a Questions?</h2>
                <div className="block-23 mb-3">
                  <ul>
                    {aboutData?.address !== "" && (
                      <li>
                        <span className="icon icon-map-marker"></span>
                        <span className="text">{aboutData?.address}</span>
                      </li>
                    )}
                    {aboutData?.phone !== "" && (
                      <li>
                        <a href="">
                          <span className="icon icon-phone"></span>
                          <span className="text">{aboutData?.phone}</span>
                        </a>
                      </li>
                    )}
                    {aboutData?.email !== "" && (
                      <li>
                        <a href={`mailto:${aboutData?.email}`}>
                          <span className="icon icon-envelope"></span>
                          <span className="text">{aboutData?.email}</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>Copyright &copy; 2023 All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
