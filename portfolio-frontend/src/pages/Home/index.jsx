import React, { useEffect, useState } from "react";
import AboutSection from "../../components/Sections/AboutSection";
import EducationSection from "../../components/Sections/EducationSection";
import ExperienceSection from "../../components/Sections/ExperienceSection";
import ServicesSection from "../../components/Sections/ServicesSection";
import SkillsSection from "../../components/Sections/SkillsSection";
import ProjectsSection from "../../components/Sections/ProjectsSection";
import BlogsSection from "../../components/Sections/BlogsSection";
import AvailableToHireSection from "../../components/Sections/AvailableToHireSection";
import ContactSection from "../../components/Sections/ContactSection";
import HomeSection from "../../components/Sections/HomeSection";
import { getHomePageData } from "../../Utils/Api/Services/apiServices";
import YoutubeSection from "../../components/Sections/YoutubeSection";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

function Home() {
  const pageLoading = useSelector((state) => state?.pageLoading?.pageLoading);
  const [homeData, setHomeData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    getHomePageData(setHomeData, dispatch, navigate);
  }, []);

  return (
    <>
      {pageLoading ? <Loader /> :
        <Layout>
          {homeData && (
            <>
              {homeData?.sections?.home && (
                <HomeSection slidesData={homeData?.home_section} />
              )}
              {homeData?.sections?.about && (
                <AboutSection aboutData={homeData?.about_section} />
              )}
              {homeData?.sections?.education && (
                <EducationSection educationData={homeData?.education_section} />
              )}
              {homeData?.sections?.experience && (
                <ExperienceSection experienceData={homeData?.experience_section} />
              )}
              {homeData?.sections?.services && (
                <ServicesSection servicesData={homeData?.services_section} />
              )}
              {homeData?.sections?.skills && (
                <SkillsSection skillsData={homeData?.skills_section} />
              )}
              {homeData?.sections?.projects && (
                <ProjectsSection projectsData={homeData?.projects_section} />
              )}
              {homeData?.sections?.my_blog && (
                <BlogsSection blogsData={homeData?.blogs_section} />
              )}
              {homeData?.sections?.youtube && (
                <YoutubeSection youtubeData={homeData?.youtube_videos_link} />
              )}
              {homeData?.sections?.hire_me && (
                <AvailableToHireSection hireMeData={homeData?.hire_me_section} />
              )}
              {homeData?.sections?.my_blog && (
                <ContactSection contactData={homeData?.about_section} />
              )}
            </>
          )}
        </Layout>}
    </>
  );
}

export default Home;
