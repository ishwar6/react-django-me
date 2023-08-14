import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

export function handleSectionNavigation(location, navigate, sectionName) {
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

const iconStyles = {
  color: "#a3a3a3",
  height: "25px",
  width: "25px"
};

const iconSpanStyles = {
  fontSize: "14px"
}

function Header({ sections, navTitle, socialLinks }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target"
      id="ftco-navbar"
    >
      <div className="container py-2">
        <div className="d-flex flex-column flex-xl-row">
        {navTitle !== "" && <a className="navbar-brand p-0">{navTitle}</a>}
        <ul className="ftco-footer-social list-unstyled float-md-left float-lft m-0 pb-4 pb-lg-0 navSocialIconsOne">
            {socialLinks?.leetcode && sections?.leetcode_icon && (
              <li className="ftco-animate">
                <a target="blank" href={socialLinks?.leetcode} className="d-flex justify-content-center align-items-center" style={iconStyles}>
                  <svg fill="#a3a3a3" width="14px" height="14px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" /></svg>
                </a>
              </li>
            )}
            {socialLinks?.github && sections?.github_icon && (
              <li className="ftco-animate">
                <a target="blank" href={socialLinks?.github} style={iconStyles}>
                  <span className="icon-github" style={iconSpanStyles}></span>
                </a>
              </li>
            )}
            {socialLinks?.linkedin && sections?.linkedin_icon && (
              <li className="ftco-animate">
                <a target="blank" href={socialLinks?.linkedin} style={iconStyles}>
                  <span className="icon-linkedin" style={iconSpanStyles}></span>
                </a>
              </li>
            )}
            {socialLinks?.youtube && sections?.youtube_icon && (
              <li className="ftco-animate">
                <a target="blank" href={socialLinks?.youtube} style={iconStyles}>
                  <span className="icon-youtube" style={iconSpanStyles}></span>
                </a>
              </li>
            )}
          </ul>
        </div>
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
          <ul className="ftco-footer-social list-unstyled float-md-left float-lft m-0 pt-1 pb-4 pb-lg-0 navSocialIconsTwo">
            {socialLinks?.leetcode && sections?.leetcode_icon && (
              <li className="ftco-animate">
                <a target="blank" href={socialLinks?.leetcode} className="d-flex justify-content-center align-items-center" style={iconStyles}>
                  <svg fill="#a3a3a3" width="14px" height="14px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" /></svg>
                </a>
              </li>
            )}
            {socialLinks?.github && sections?.github_icon && (
              <li className="ftco-animate">
                <a target="blank" href={socialLinks?.github} style={iconStyles}>
                  <span className="icon-github" style={iconSpanStyles}></span>
                </a>
              </li>
            )}
            {socialLinks?.linkedin && sections?.linkedin_icon && (
              <li className="ftco-animate">
                <a target="blank" href={socialLinks?.linkedin} style={iconStyles}>
                  <span className="icon-linkedin" style={iconSpanStyles}></span>
                </a>
              </li>
            )}
            {socialLinks?.youtube && sections?.youtube_icon && (
              <li className="ftco-animate">
                <a target="blank" href={socialLinks?.youtube} style={iconStyles}>
                  <span className="icon-youtube" style={iconSpanStyles}></span>
                </a>
              </li>
            )}
          </ul>
          <ul className="navbar-nav nav ml-auto">
            {sections?.home && (
              <li className="nav-item" id="home">
                <a
                  onClick={() => handleSectionNavigation(location, navigate, "home_section")}
                  className="nav-link"
                >
                  <span>Home</span>
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
            {sections?.youtube && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location, navigate, "youtube_section")}
                  className="nav-link"
                >
                  <span>Youtube</span>
                </a>
              </li>
            )}
            {sections?.about && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location, navigate, "about_section")}
                  className="nav-link"
                >
                  <span>About</span>
                </a>
              </li>
            )}
            {sections?.education && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location, navigate, "education_section")}
                  className="nav-link"
                >
                  <span>Education</span>
                </a>
              </li>
            )}
            {sections?.experience && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location, navigate, "experience_section")}
                  className="nav-link"
                >
                  <span>Experience</span>
                </a>
              </li>
            )}

            {sections?.services && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location, navigate, "services_section")}
                  className="nav-link"
                >
                  <span>Services</span>
                </a>
              </li>
            )}

            {sections?.skills && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location, navigate, "skills_section")}
                  className="nav-link"
                >
                  <span>Skills</span>
                </a>
              </li>
            )}
            {sections?.contact && (
              <li className="nav-item">
                <a
                  onClick={() => handleSectionNavigation(location, navigate, "contact_section")}
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
