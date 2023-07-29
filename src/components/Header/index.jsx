import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

function Header({ sections, navTitle }) {
  const location = useLocation();
  const navigate = useNavigate();
  function handleClick(sectionName) {
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
                  onClick={() => handleClick("home_section")}
                  className="nav-link"
                >
                  <span>Home</span>
                </a>
              </li>
            )}
            {sections?.about && (
              <li className="nav-item">
                <a
                  onClick={() => handleClick("about_section")}
                  className="nav-link"
                >
                  <span>About</span>
                </a>
              </li>
            )}
            {sections?.education && (
              <li className="nav-item">
                <a
                  onClick={() => handleClick("education_section")}
                  className="nav-link"
                >
                  <span>Education</span>
                </a>
              </li>
            )}
            {sections?.experience && (
              <li className="nav-item">
                <a
                  onClick={() => handleClick("experience_section")}
                  className="nav-link"
                >
                  <span>Experience</span>
                </a>
              </li>
            )}

            {sections?.services && (
              <li className="nav-item">
                <a
                  onClick={() => handleClick("services_section")}
                  className="nav-link"
                >
                  <span>Services</span>
                </a>
              </li>
            )}

            {sections?.skills && (
              <li className="nav-item">
                <a
                  onClick={() => handleClick("skills_section")}
                  className="nav-link"
                >
                  <span>Skills</span>
                </a>
              </li>
            )}

            {sections?.projects && (
              <li className="nav-item">
                <a
                  onClick={() => handleClick("projects_section")}
                  className="nav-link"
                >
                  <span>Projects</span>
                </a>
              </li>
            )}
            {sections?.my_blog && (
              <li className="nav-item">
                <a
                  onClick={() => handleClick("my_blog_section")}
                  className="nav-link"
                >
                  <span>My Blog</span>
                </a>
              </li>
            )}
            {sections?.contact && (
              <li className="nav-item">
                <a
                  onClick={() => handleClick("contact_section")}
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
