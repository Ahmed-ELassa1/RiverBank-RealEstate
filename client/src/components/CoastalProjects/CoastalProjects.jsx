import React from "react";
import "./CoastalProjects.css";
import { Link } from "react-router-dom";
import F1 from "../../assets/fp1.jpg";
import F2 from "../../assets/fp2.jpg";
import F3 from "../../assets/fp3.jpg";
import F4 from "../../assets/fp4.jpeg";
import { useTranslation } from "react-i18next";

const CoastalProjects = () => {
  const { t } = useTranslation();
  return (
    <section className="residentialProjects">
      <div className="container">
        <h3 className="container cityLabel">
          {t("home.section.coastalProjects")}
        </h3>
        <div className="residentialProjects-content">
          <div className="residentialProjects-card">
            <div className="residentialProjects_property">
              <div className="thumb">
                <img
                  className="img-whp w-100 h-100 cover"
                  src={F1}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <p className="residentialProjects-card-name">
                    الساحل الشمالي
                  </p>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  <h4>
                    <Link to="/listing-details-v1/1">
                      مول ماس تاور العاصمة الإدارية الجديدة Mall Mas Tower New
                      Capital
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="residentialProjects-card">
            <div className="residentialProjects_property">
              <div className="thumb">
                <img
                  className="img-whp w-100 h-100 cover"
                  src={F4}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <p className="residentialProjects-card-name">
                    الساحل الشمالي
                  </p>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  <h4>
                    <Link to="/listing-details-v1/1">Luxury Family Home</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="residentialProjects-card">
            <div className="residentialProjects_property">
              <div className="thumb">
                <img
                  className="img-whp w-100 h-100 cover"
                  src={F4}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <p className="residentialProjects-card-name">
                    الساحل الشمالي
                  </p>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  <h4>
                    <Link to="/listing-details-v1/1">
                      كمبوند ايون العاصمة الإدارية COMPOUND ION NEW CAPITAL
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <Link className="button-seeAll-link">{t("button.seeAll")}</Link>
        </div>
      </div>
    </section>
  );
};

export default CoastalProjects;
