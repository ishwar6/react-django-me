import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const homeData = useSelector((state) => state?.homeData?.homeData?.results);
  return (
    <>
      <Header sections={homeData?.sections} navTitle={homeData?.nav_name} />
      {children}
      <Footer
        sections={homeData?.sections}
        aboutData={homeData?.about_section}
        socialLinks={homeData?.social_media_links}
      />
    </>
  );
}

export default Layout;
