import React from "react";
import "./CommercialProjects.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CommercialProjects = ({ commercialProjects, cities, projectTypesData }) => {
  const { t } = useTranslation();
  const Navigate = useNavigate();
  return (
    <section className="residentialProjects">
      <div className="container">
        <h3 className="container cityLabel">
          {t("home.section.CommercialProjects")}
        </h3>
        <div className="residentialProjects-content">
          {commercialProjects?.length > 0
            ? commercialProjects?.map((project, i) => {
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
                            {
                              cities?.find((e) => e.slug == project?.cityId)
                                ?.title
                            }
                          </p>
                        </div>
                      </div>
                      <div className="details">
                        <div className="tc_content">
                          <h4>
                            <Link to="/listing-details-v1/1">
                              {project?.title}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
          <Link className="button-seeAll-link">{t("button.seeAll")}</Link>
        </div>
      </div>
    </section>
  );
};

export default CommercialProjects;
