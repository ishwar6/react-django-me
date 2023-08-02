import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { BASEURL } from "../../../Utils/Api/axiosClient";
import parse from 'html-react-parser';
import { useLocation, useNavigate } from "react-router-dom";
import { handleSectionNavigation } from "../../Header";

function HomeSection({ slidesData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [opacities, setOpacities] = React.useState([]);
  const [sliderRef] = useKeenSlider(
    {
      slides: slidesData?.length,
      loop: true,
      detailsChanged(s) {
        const new_opacities = s.track.details.slides.map(
          (slide) => slide.portion
        );
        setOpacities(new_opacities);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div id="home_section" className="hero">
      <div ref={sliderRef} className="home-slider fader">
        {slidesData?.length > 0 && (
          <>
            {slidesData?.map((slide, index) => {
              return (
                <div
                  className="slider-item fader__slide"
                  style={{ opacity: opacities[index] }}
                  key={index}
                >
                  <div className="overlay"></div>
                  <div className="container">
                    <div
                      className="row d-md-flex no-gutters slider-text align-items-end justify-content-end"
                      data-scrollax-parent="true"
                    >
                      <div
                        className="one-third js-fullheight order-md-last img"
                        style={{
                          backgroundImage: `url(${BASEURL + slide?.file})`,
                        }}
                      >
                        <div className="overlay"></div>
                      </div>
                      <div
                        className="one-forth d-flex  align-items-center ftco-animate"
                        data-scrollax=" properties: { translateY: '70%' }"
                      >
                        <div className="text">
                          <span className="subheading">
                            {slide?.greeting_text}
                          </span>
                          <h1 className="mb-4 mt-3">
                            {parse(slide?.main_text)}
                          </h1>
                          <h2 className="mb-4">{slide?.sub_text}</h2>
                          {slide?.is_button_available && (
                            <p>
                              <a onClick={() => handleSectionNavigation(location, navigate, "contact_section")} className="btn btn-primary py-3 px-4">
                                {slide?.button_text
                                  ? slide?.button_text
                                  : "Hire me"}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default HomeSection;
