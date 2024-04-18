import React from "react";
import "./HomeCities.css";
import { useTranslation } from "react-i18next";

const HomeCities = () => {
  const { t } = useTranslation()
  return (
    <section className="homeCities">
      <div className="container">
        <div className="sections-header-container">
          <h3 className="homeCities-section-header">{t("home.section.populerCities")}</h3>
          <h3 className="homeCities-section-subheader">{t("home.section.populerCities.subText")}</h3>
        </div>
        <div className="homeCities-cards-container">
          <div className="homeCities-Card">
            <a className="homeCities-Card-img" style={{ backgroundImage: "url(https://www.egyptaqar.com/wp-content/uploads/2020/12/العاصمة-الإدارية-الجديدة.jpg)" }}>
            </a>
            <h4 className="homeCities-title">Houses</h4>
          </div>
          <div className="homeCities-Card">
            <a className="homeCities-Card-img" style={{ backgroundImage: "url(https://www.egyptaqar.com/wp-content/uploads/2020/12/الساحل-الشمالي.jpg)" }}>
            </a>
            <h4 className="homeCities-title">Houses</h4>
          </div>
          <div className="homeCities-Card">
            <a className="homeCities-Card-img" style={{ backgroundImage: "url(https://www.egyptaqar.com/wp-content/uploads/2020/12/العين-السخنة.jpg)" }}>
            </a>
            <h4 className="homeCities-title">Houses</h4>
          </div>
          <div className="homeCities-Card">
            <a className="homeCities-Card-img" style={{ backgroundImage: "url(https://www.egyptaqar.com/wp-content/uploads/2022/01/القاهرة-الجديدة.jpg)" }}>
            </a>
            <h4 className="homeCities-title">Houses</h4>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeCities;
