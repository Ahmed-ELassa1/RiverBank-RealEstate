import React, { useEffect, useState } from "react";
import HomeCities from "../../components/HomeCities/HomeCities";
import ResidentialProjects from "../../components/ResidentialProjects/ResidentialProjects";
import { useTranslation } from "react-i18next";
import CommercialProjects from "../../components/CommercialProjects/CommercialProjects";
import CoastalProjects from "../../components/CoastalProjects/CoastalProjects";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CityService } from "../../services/City/CityService";
import { LoadingOutlined } from "@ant-design/icons";
import { ProjectTypesService } from "../../services/ProjectTypesService/ProjectTypesService";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const Navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const projectTypesService = new ProjectTypesService();
  const projectService = new ProjectsService();
  const cityService = new CityService();
  const [resultProjects, setResultProjects] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [projectCards, setProjectCards] = useState([]);
  const [resedinationalProjects, setResedinationalProjects] = useState([]);
  const [commercialProjects, setCommercialProjects] = useState([]);
  const [costalProjects, setCostalProjects] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [projectTypesData, setProjectTypesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gettingData, setGettingData] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formData, setFormData] = useState({
    project: searchParams.get("project") || "",
    city: searchParams.get("city") || "",
  });
  async function getCities() {
    const response = await cityService.getCities();
    const data = response?.data?.data;
    setCitiesData(data);
    if (data?.length > 0) {
      const options = data?.map((city) => {
        return { label: city?.title, value: city?._id };
      });
      setLoading(false);
      setCitiesOptions([{ label: "كل المدن", value: "" }, ...options]);
    }
  }
  function handleFormInputs(e) {
    const clonedForm = { ...formData };
    clonedForm[e.target.name] = e.target.value;
    setFormData(clonedForm);
  }
  async function searchInProjects(e) {
    e.preventDefault();
    setSearchLoading(true);
    let response;
    if (formData.city !== "" && formData.project == "") {
      response = await projectService.getProjects({
        cityId: formData.city,
      });
    } else if (formData.city === "" && formData.project !== "") {
      response = await projectService.getProjects({
        title: formData.project,
      });
    } else if (formData.city === "" && formData.project === "") {
      return;
    } else {
      response = await projectService.getProjects({
        title: formData.project,
        cityId: formData.city,
      });
    }
    if (response?.status === 200) {
      if (response?.data?.data?.length === 0) {
        toast.error("لا يوجد مشاريع مماثلة");
        setFormData({
          project: searchParams.get("project") || "",
          city: searchParams.get("city") || "",
        });
      }
      setResultProjects(response?.data?.data);
    }
    setSearchLoading(false);
  }
  useEffect(() => {
    getCities();
    getCityProjects();
    getProjectTypes();
  }, []);

  async function getCityProjects() {
    setProjectCards([]);
    const response = await projectService.getProjects();
    const data = response?.data?.data;
    const resdintianlProjects = data?.filter((project) => {
      return project?.projectType === "مشروعات-سكنية";
    });
    const commercialProjects = data?.filter((project) => {
      return project?.projectType === "مشروعات-تجارية";
    });
    const coastalProjects = data?.filter((project) => {
      return project?.projectType === "مشروعات-ساحلية";
    });
    setGettingData(false);
    setResedinationalProjects(resdintianlProjects);
    setCommercialProjects(commercialProjects);
    setCostalProjects(coastalProjects);
    setProjectCards(data);
  }
  async function deleteSearchValues() {
    setFormData({
      project: "",
      city: "",
    });
    setResultProjects([]);
    Navigate("/");
  }
  async function getProjectTypes() {
    const response = await projectTypesService.getProjectTypes();
    const data = response?.data?.data;
    setProjectTypesData(data);
  }
  return (
    <div className="homepage">
      <div className="home home-bg">
        <h1 className="head">{t("home.mainHeader")}</h1>
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
          {loading ? (
            <div className="home-search-input">
              <LoadingOutlined />
            </div>
          ) : (
            <select
              className="home-search-input"
              name="city"
              onChange={handleFormInputs}
              placeholder={t("input.findByCity")}
              value={formData.city}
            >
              {citiesOptions?.length > 0 ? (
                citiesOptions?.map((city, i) => {
                  return (
                    <option key={i} value={city?.value}>
                      {city?.label}
                    </option>
                  );
                })
              ) : (
                <option value="">none</option>
              )}
            </select>
          )}
          <button
            type="submit"
            onClick={searchInProjects}
            className="home-search-button"
          >
            {t("btn.search")}
          </button>
          {resultProjects?.length > 0 && (
            <button
              type="submit"
              onClick={deleteSearchValues}
              className="home-clear-button"
            >
              حذف
            </button>
          )}
        </form>
      </div>

      {searchLoading ? (
        <LoadingOutlined className="loadingIndicator" />
      ) : resultProjects?.length > 0 ? (
        <div className="home-search-cards-container">
          {resultProjects?.map((project) => {
            return (
              <div className="home-search-card" key={project._id}>
                <Card
                  onClick={() => Navigate(`/projects/${project._id}`)}
                  hoverable
                  className="dev-img"
                  cover={
                    <img
                      alt={project.title}
                      src={project?.mainImage?.secure_url}
                    />
                  }
                >
                  <Meta title={project.title} />
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <HomeCities citiesData={citiesData} />
          {/* {resedinationalProjects?.length > 0 && ( */}
          <ResidentialProjects
            resedinationalProjects={resedinationalProjects}
            cities={citiesData}
            projectTypesData={projectTypesData}
            gettingData={gettingData}
          />
          {/* )} */}
          {/* {costalProjects?.length > 0 && ( */}
          <CoastalProjects
            costalProjects={costalProjects}
            cities={citiesData}
            projectTypesData={projectTypesData}
            gettingData={gettingData}
          />
          {/* )} */}
          {/* {commercialProjects?.length > 0 && ( */}
          <CommercialProjects
            commercialProjects={commercialProjects}
            cities={citiesData}
            projectTypesData={projectTypesData}
            gettingData={gettingData}
          />
          {/* )} */}
        </>
      )}
    </div>
  );
};

export default Home;
