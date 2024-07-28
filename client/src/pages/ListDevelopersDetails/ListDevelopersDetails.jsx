import React, { useEffect, useState } from "react";
// import "./DevelopersDetails.css";
import { useParams } from "react-router-dom";
import {
  LoadingOutlined,
  PhoneFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ContactUs from "../ContactUs/ContactUs";
import { DevelopersService } from "../../services/Developers/DevelopersService";
import "./ListDevelopersDetails.css";
const ListDevelopersDetails = ({ isSticky }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const developersService = new DevelopersService();

  const getDeveloper = async () => {
    try {
      const response = await developersService.getDeveloperById(id);
      const data = await response.data.data;
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDeveloper();
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
              {console.log(data?.mainImage)}
              <img
                src={
                  Array?.isArray(data?.mainImage)
                    ? data?.mainImage[0]?.secure_url
                    : data?.mainImage?.secure_url
                }
                alt={data?.seoData}
                className="projectImg"
              />
            </div>
            {/*project content summery*/}
            {data?.developerContent?.length > 0 && (
              <div className="project-details-content-headers">
                <p>{t("label.projectDetails.pageContent")}</p>
                <ol>
                  {data?.developerContent?.map((developerContent, i) => {
                    return (
                      <li key={i}>
                        <a
                          href={`/#/projects/${id}/#section-${i}`}
                          onClick={(e) => scrollToSection(e, `section-${i}`)}
                        >
                          <div
                            // style={{ padding: "0 30px" }}
                            dangerouslySetInnerHTML={{
                              __html: developerContent,
                            }}
                          />
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
                dangerouslySetInnerHTML={{
                  __html: data?.mainDescription,
                }}
              />
            </div>
            {/* details sections */}
            <div className="details-descriptions-section-container">
              {data?.developerDescriptions?.length > 0 &&
                data?.developerDescriptions?.map((developerDescriptions, i) => {
                  return (
                    <div
                      id={`section-${i}`}
                      key={i}
                      className="details-sections"
                    >
                      {data?.subImages?.length > i && (
                        <img
                          src={data?.subImages[i]?.secure_url}
                          alt={data?.title}
                        />
                      )}
                      {/* <p>{developerDescription  s}</p> */}
                      <div
                        style={{ padding: "0 30px", textAlign: "right" }}
                        dangerouslySetInnerHTML={{
                          __html: developerDescriptions,
                        }}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="details-question-about-project">
              {data?.developerQuestions?.length &&
                data?.developerQuestions?.map((developerQuestion, i) => {
                  return (
                    <div key={i} className="details-question-about-project-row">
                      <h3>
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: developerQuestion?.question,
                            }}
                          />
                        }
                      </h3>
                      <p>
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: developerQuestion?.answer,
                            }}
                          />
                        }
                      </p>
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

export default ListDevelopersDetails;
