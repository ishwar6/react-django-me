import React from "react";
import parse from 'html-react-parser';

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
                  <h2 className="mb-4">My Videos</h2>
                  {youtubeData?.description !== "" && (
                    <p>{parse(youtubeData?.description)}</p>
                  )}
                </div>
              </div>
              <div className="row d-flex">
                {youtubeData?.youtube_links?.map((link, index) => {
                  return (
                    <div className="col-md-6 col-lg-4 d-flex ftco-animate" key={index}>
                      <div
                        className="blog-entry d-flex flex-column"
                      >
                        <iframe
                          width="80%"
                          height="200"
                          src={link.link}
                          style={{ border: "none",margin:"0 auto" }}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div className="text mt-3 d-block">
                          <div className="d-flex align-items-center mb-3 meta"></div>
                          <h3 className="heading">
                            <a>{link?.title}</a>
                          </h3>
                          <p className="description">{parse(link?.description)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a
                target="blank"
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
