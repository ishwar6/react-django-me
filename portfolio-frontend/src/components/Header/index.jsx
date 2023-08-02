import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

export function handleSectionNavigation(location,navigate,sectionName) {
  if (location.pathname.length > 2) {
    navigate("/");
  }
  setTimeout(() => {
    scroller.scrollTo(sectionName, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }, 500);
}

function Header({ sections, navTitle }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target"
      id="ftco-navbar"
    >
      <div className="container">
        {navTitle !== "" && <a className="navbar-brand">{navTitle}</a>}
        <button
          className="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="oi oi-menu"></span> Menu
        </button>

        <div className="collapse navbar-collapse" id="ftco-nav">
          <ul className="navbar-nav nav ml-auto">
            {sections?.home && (
              <li className="nav-item" id="home">
                <a
                  onClick={() => handleSectionNavigation(location,navigate,"home_section")}
                  className="nav-link"
                >
                  <span>Home</span>
                </a>
              </li>
            )}
            {sections?.about && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location,navigate,"about_section")}
                  className="nav-link"
                >
                  <span>About</span>
                </a>
              </li>
            )}
            {sections?.education && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location,navigate,"education_section")}
                  className="nav-link"
                >
                  <span>Education</span>
                </a>
              </li>
            )}
            {sections?.experience && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location,navigate,"experience_section")}
                  className="nav-link"
                >
                  <span>Experience</span>
                </a>
              </li>
            )}

            {sections?.services && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location,navigate,"services_section")}
                  className="nav-link"
                >
                  <span>Services</span>
                </a>
              </li>
            )}

            {sections?.skills && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location,navigate,"skills_section")}
                  className="nav-link"
                >
                  <span>Skills</span>
                </a>
              </li>
            )}

            {sections?.projects && (
              <li className="nav-item">
                <a
                  onClick={() => {
                    navigate("/projects/");
                    window.location.reload();
                  }}
                  className="nav-link"
                >
                  <span>Projects</span>
                </a>
              </li>
            )}
            {sections?.my_blog && (
              <li className="nav-item">
                <a
                  onClick={() => {
                    navigate("/blogs/");
                    window.location.reload();
                  }}
                  className="nav-link"
                >
                  <span>My Blog</span>
                </a>
              </li>
            )}
            {sections?.contact && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location,navigate,"contact_section")}
                  className="nav-link"
                >
                  <span>Contact</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
