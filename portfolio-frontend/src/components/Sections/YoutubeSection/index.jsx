import React from "react";

function YoutubeSection({ youtubeData }) {
  return (
    <>
      {youtubeData?.youtube_links?.length > 0 && (
        <>
          <div className="ftco_section" id="youtube_section">
            <div className="container">
              <div className="row justify-content-center mb-5 pb-5">
                <div className="col-md-7 heading_section text-center ftco-animate">
                  <h1 className="big big-2">Youtube</h1>
                  <h2 className="mb-4">Our Videos</h2>
                  {youtubeData?.description !== "" && (
                    <p>{youtubeData?.description}</p>
                  )}
                </div>
              </div>
              <div className="row d-flex">
                {youtubeData?.youtube_links?.map((link, index) => {
                  return (
                    <div className="col-md-6 col-lg-4 d-flex ftco-animate" key={index}>
                      <div
                        className="blog-entry justify-content-end"
                        style={{ width: "100%" }}
                      >
                        <iframe
                          width="100%"
                          height="350"
                          src={link.link}
                          style={{border:"none"}}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div className="text mt-3 float-right d-block">
                          <div className="d-flex align-items-center mb-3 meta"></div>
                          <h3 className="heading">
                            <a>{link?.title}</a>
                          </h3>
                          <p className="description">{link?.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a
                href={youtubeData?.youtube_channel_link}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >{`View More >>`}</a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default YoutubeSection;
