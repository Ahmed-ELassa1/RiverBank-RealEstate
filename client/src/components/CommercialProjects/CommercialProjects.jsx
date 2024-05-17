import React, { useEffect, useState } from "react";
import "./CommercialProjects.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";

const CommercialProjects = ({
  commercialProjects,
  cities,
  gettingData,
}) => {
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const [projectsCards, setProjectsCards] = useState([]);
  useEffect(() => {
    if (commercialProjects?.length) {
      setProjectsCards(commercialProjects.slice(0, 4));
    }
  }, [commercialProjects?.length]);

  return (
    <section className="residentialProjects">
      <div className="container">
        <h3 className="container cityLabel">
          {t("home.section.CommercialProjects")}
        </h3>
        <div className="residentialProjects-content">
          {projectsCards?.map((project, i) => {
            return (
              <div
                key={i}
                className="residentialProjects-card"
                onClick={() => Navigate(`projects/${project?._id}`)}
              >
                <div className="residentialProjects_property">
                  <div className="thumb">
                    <img
                      className="img-whp w-100 h-100 cover"
                      src={project?.mainImage?.secure_url}
                      alt={project?.seoData}
                    />
                    <div className="thmb_cntnt">
                      <p className="residentialProjects-card-name">
                        {cities?.find((e) => e.slug == project?.cityId)?.title}
                      </p>
                    </div>
                  </div>
                  <div className="details">
                    <div className="tc_content">
                      <h4>
                        <Link to="/listing-details-v1/1">{project?.title}</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {gettingData && (
            <div className="residentialProjects-skelton-content">
              <div className="residentialProjects-skelton-card">
                <Skeleton
                  active={true}
                  paragraph={{
                    rows: 2,
                    width: 100,
                    style: { textAlign: "center" },
                  }}
                  round={true}
                  title={false}
                  avatar={{
                    shape: "square",
                    size: "large",
                  }}
                />
              </div>
              <div className="residentialProjects-skelton-card">
                <Skeleton
                  active={true}
                  paragraph={{
                    rows: 2,
                    width: 100,
                    style: { textAlign: "center" },
                  }}
                  round={true}
                  title={false}
                  avatar={{
                    shape: "square",
                    size: "large",
                  }}
                />
              </div>
              <div className="residentialProjects-skelton-card">
                <Skeleton
                  active={true}
                  paragraph={{
                    rows: 2,
                    width: 100,
                    style: { textAlign: "center" },
                  }}
                  round={true}
                  title={false}
                  avatar={{
                    shape: "square",
                    size: "large",
                  }}
                />
              </div>
              <div className="residentialProjects-skelton-card">
                <Skeleton
                  active={true}
                  paragraph={{
                    rows: 2,
                    width: 100,
                    style: { textAlign: "center" },
                  }}
                  round={true}
                  title={false}
                  avatar={{
                    shape: "square",
                    size: "large",
                  }}
                />
              </div>
            </div>
          )}
          <Link to={`type/commercial`} className="button-seeAll-link">
            {t("button.seeAll")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommercialProjects;
