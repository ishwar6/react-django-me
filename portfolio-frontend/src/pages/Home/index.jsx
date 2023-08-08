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
import { Helmet } from 'react-helmet';


function Home() {
  const pageLoading = useSelector((state) => state?.pageLoading?.pageLoading);
  const [homeData, setHomeData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getHomePageData(setHomeData, dispatch, navigate);
  }, []);
  return (
    <>
      {pageLoading ? <Loader /> :
        <Layout>
          {homeData?.meta && 
          <Helmet>
            <title>{homeData?.meta?.title}</title>
            <meta name="description" content={homeData?.meta?.description} />
          </Helmet>}
          {homeData && homeData?.results && (
            <>
              {homeData?.results?.sections?.home && (
                <HomeSection slidesData={homeData?.results?.home_section} />
              )}
              {homeData?.results?.sections?.about && (
                <AboutSection aboutData={homeData?.results?.about_section} />
              )}
              {homeData?.results?.sections?.education && (
                <EducationSection educationData={homeData?.results?.education_section} />
              )}
              {homeData?.results?.sections?.experience && (
                <ExperienceSection experienceData={homeData?.results?.experience_section} />
              )}
              {homeData?.results?.sections?.services && (
                <ServicesSection servicesData={homeData?.results?.services_section} />
              )}
              {homeData?.results?.sections?.skills && (
                <SkillsSection skillsData={homeData?.results?.skills_section} />
              )}
              {homeData?.results?.sections?.projects && (
                <ProjectsSection projectsData={homeData?.results?.projects_section} />
              )}
              {homeData?.results?.sections?.my_blog && (
                <BlogsSection blogsData={homeData?.results?.blogs_section} />
              )}
              {homeData?.results?.sections?.youtube && (
                <YoutubeSection youtubeData={homeData?.results?.youtube_videos_link} />
              )}
              {homeData?.results?.sections?.hire_me && (
                <AvailableToHireSection hireMeData={homeData?.results?.hire_me_section} />
              )}
              {homeData?.results?.sections?.my_blog && (
                <ContactSection contactData={homeData?.results?.about_section} />
              )}
            </>
          )}
        </Layout>}
    </>
  );
}

export default Home;
