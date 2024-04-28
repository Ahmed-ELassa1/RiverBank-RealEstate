import React, { useState } from "react";
import "./Home.css";
import HomeCities from "../../components/HomeCities/HomeCities";
import ResidentialProjects from "../../components/ResidentialProjects/ResidentialProjects";
import BlogsSection from "../../components/BlogsSection/BlogsSection";
import Subscribe from "../../components/Subscribe/Subscribe";
import { useTranslation } from "react-i18next";
import CommercialProjects from "../../components/CommercialProjects/CommercialProjects";
import CoastalProjects from "../../components/CoastalProjects/CoastalProjects";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const projectService = new ProjectsService();
  const [resultProjects, setResultProjects] = useState([]);
  const [formData, setFormData] = useState({
    project: searchParams.get("project") || "",
    city: searchParams.get("city") || "",
  });
  function handleFormInputs(e) {
    const clonedForm = { ...formData };
    clonedForm[e.target.name] = e.target.value;
    setFormData(clonedForm);
  }
  async function searchInProjects(e) {
    e.preventDefault();
    const response = await projectService.getProjects({
      title: formData.project,
      cityId: formData.city,
    });
    if (response?.status == 200) {
      console.log(response?.data);
      setResultProjects(response?.data);
    }
  }
  return (
    <div className="homepage">
      <div className="home home-bg">
        <h1 className="head">
          {/* <TypeAnimation
            sequence={[
              "Find Your Dream", // Types 'One'
              1000, // Waits 1s
              "Your Dream Our Passion", // Deletes 'One' and types 'Two'
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: "80px", display: "inline-block" }}
          /> */}
          {t("home.mainHeader")}
        </h1>
        <form
          onSubmit={searchInProjects}
          className="home-search-input-container"
        >
          <input
            className="home-search-input"
            name="project"
            onChange={handleFormInputs}
            placeholder={t("input.findByProject")}
            value={formData.project}
          />
          <select
            className="home-search-input"
            name="city"
            onChange={handleFormInputs}
            placeholder={t("input.findByCity")}
            value={formData.city}
          >
            <option value={""}>{t("input.findByCity")}</option>
            <option value="662abcb327f0cd662fdf0d38">alex</option>
            <option value="cairooo">cairo</option>
          </select>
          <button
            type="submit"
            onClick={searchInProjects}
            className="home-search-button"
          >
            {t("btn.search")}
          </button>
        </form>
      </div>

      <HomeCities />
      <ResidentialProjects />
      <CoastalProjects />
      <CommercialProjects />
    </div>
  );
};

export default Home;
