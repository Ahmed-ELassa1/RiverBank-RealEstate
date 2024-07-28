import React, { useEffect, useState } from "react";
import "./ProjectDetails.css";
import { useParams } from "react-router-dom";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import {
  LoadingOutlined,
  PhoneFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ContactUs from "../ContactUs/ContactUs";
import { CityService } from "../../services/City/CityService";
const ProjectDetails = ({ isSticky }) => {
  const { t } = useTranslation();
  const [cityData, setCityData] = useState({});
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectInstance = new ProjectsService();
  const cityService = new CityService();

  const getProject = async () => {
    try {
      const response = await projectInstance.getProjectById(id);
      const data = await response.data.data;
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProject();
  }, [id]);
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop + 120,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="details-page">
      <div className="blog bg">
        <h2>{data?.title}</h2>
      </div>
      <div className="details-page-container">
        {loading && <LoadingOutlined className="loadingIndicator" />}
        {!loading ? (
          <div className="details-page-content-container">
            <div>
              <img
                src={data?.mainImage?.secure_url}
                alt={data?.seoData}
                className="projectImg"
              />
            </div>
            {/* questions */}
            <div className="project-details-questions-container">
              <h3 className="questionLabel">
                {t("label.projectDetails.header")}
              </h3>
              <div className="project-details-questions-content">
                {data?.projectDetails?.length > 0 &&
                  data?.projectDetails?.map((detail, i) => {
                    return (
                      <p className="project-questions-row" key={i}>
                        <span>
                          {<div
                            className="project-questions-content"
                            style={{ padding: "0 30px" }}
                            dangerouslySetInnerHTML={{ __html: detail?.question }}
                          />}
                        </span>
                        <span>{<div
                          className="project-questions-content"
                          style={{ padding: "0 30px" }}
                          dangerouslySetInnerHTML={{ __html: detail?.answer }}
                        />}</span>
                      </p>
                    );
                  })}
              </div>
            </div>
            {/*project content summery*/}
            {data?.projectContent?.length > 0 && (
              <div className="project-details-content-headers">
                <p>{t("label.projectDetails.pageContent")}</p>
                <ol>
                  {data?.projectContent?.map((projectContent, i) => {
                    return (
                      <li key={i}>
                        <a
                          href={`/#/projects/${id}/#section-${i}`}
                          onClick={(e) => scrollToSection(e, `section-${i}`)}
                        >
                          {<div
                            dangerouslySetInnerHTML={{ __html: projectContent }}
                          />}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
            {/* main description */}
            <div className="project-details-main-desc-section">
              <div
                style={{ padding: "0 30px" }}
                dangerouslySetInnerHTML={{ __html: data?.mainDescription }}
              />
            </div>
            {/* details sections */}
            <div className="details-descriptions-section-container">
              {data?.projectDescriptions?.length > 0 &&
                data?.projectDescriptions?.map((projectDescription, i) => {
                  return (
                    <div id={`section-${i}`} key={i}>
                      <div
                        style={{ padding: "0 22px" }}
                        className="project-details-titles"
                        dangerouslySetInnerHTML={{ __html: data?.projectContent[i] }
                        }
                      />
                      {data?.subImages?.length > i && (
                        <img src={data?.subImages[i]?.secure_url} />
                      )}
                      <div
                        className="project-details-sections"
                        style={{ padding: "0 30px" }}
                        dangerouslySetInnerHTML={{ __html: projectDescription }}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="details-question-about-project">
              {data?.projectQuestions?.length &&
                data?.projectQuestions?.map((projectQuestion, i) => {
                  return (
                    <div key={i} className="details-question-about-project-row">
                      <h3>{<div
                        style={{ paddingRight: "18px", marginTop: "0" }}
                        dangerouslySetInnerHTML={{ __html: projectQuestion?.question }}
                      />}</h3>
                      <p>{<div
                        style={{ paddingRight: "18px" }}
                        dangerouslySetInnerHTML={{ __html: projectQuestion?.answer }}
                      />}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* sidebar */}
        <div
          id="details-sidebar"
          className={`details-page-sidebar ${isSticky ? "sidebar-sticky" : ""}`}
        >
          <div className="details-sidebar-contact-details">
            <div className="details-sidebar-contact-details-row">
              <p>
                <PhoneFilled />
                <span className="details-row-text">اتصل بنا على</span>
                <span className="details-row-text">:</span>
              </p>
              <p className="details-row-text">{t("label.phoneNumber")}</p>
            </div>
            <div className="details-sidebar-contact-details-row">
              <p>
                <WhatsAppOutlined />
                <span className="details-row-text">أو عبر واتساب</span>
                <span className="details-row-text">:</span>
              </p>
              <p className="details-row-text">{t("label.whatsAppNumber")}</p>
            </div>
            <div className="details-sidebar-contact-details-row">
              <p>
                <PhoneFilled />
                <span className="details-row-text">أو عبر بريدنا</span>
                <span className="details-row-text">:</span>
              </p>
              <p className="details-row-text">{t("label.contactEmail")}</p>
            </div>
          </div>
          <div className="details-sidebar-form-container">
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
