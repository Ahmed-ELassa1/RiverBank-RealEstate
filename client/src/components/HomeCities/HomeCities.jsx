import React, { useEffect, useState } from "react";
import "./HomeCities.css";
import { useTranslation } from "react-i18next";
import { CityService } from "../../services/City/CityService";
import { useNavigate } from "react-router-dom";

const HomeCities = ({ citiesData }) => {
  const { t } = useTranslation();
  const Navigate = useNavigate();

  async function handleNavigateToCity(e) {
    const selectedCity = citiesData?.find((city) => {
      return city?.slug == e?.target?.id;
    });
    Navigate(`cities/${selectedCity?._id}`);
  }

  return (
    <section className="homeCities">
      <div className="container">
        <div className="sections-header-container">
          <h3 className="homeCities-section-header">
            {t("home.section.populerCities")}
          </h3>
          {/* <h3 className="homeCities-section-subheader">{t("home.section.populerCities.subText")}</h3> */}
        </div>
        <div className="homeCities-cards-container">
          <div
            className="homeCities-Card"
            id="العاصمة-الإدارية-الجديدة"
            onClick={handleNavigateToCity}
          >
            <div
              className="homeCities-Card-img"
              style={{
                backgroundImage:
                  "url(https://www.egyptaqar.com/wp-content/uploads/2020/12/العاصمة-الإدارية-الجديدة.jpg)",
              }}
            ></div>
            <h4 className="homeCities-title">العاصمة الادراية الجديدة</h4>
          </div>
          <div
            className="homeCities-Card"
            id="الساحل-الشمالي"
            onClick={handleNavigateToCity}
          >
            <div
              className="homeCities-Card-img"
              style={{
                backgroundImage:
                  "url(https://www.egyptaqar.com/wp-content/uploads/2020/12/الساحل-الشمالي.jpg)",
              }}
            ></div>
            <h4 className="homeCities-title">الساحل الشمالي</h4>
          </div>
          <div
            className="homeCities-Card"
            id="العين-السخنة"
            onClick={handleNavigateToCity}
          >
            <div
              className="homeCities-Card-img"
              style={{
                backgroundImage:
                  "url(https://www.egyptaqar.com/wp-content/uploads/2020/12/العين-السخنة.jpg)",
              }}
            ></div>
            <h4 className="homeCities-title">العين السخنة</h4>
          </div>
          <div
            className="homeCities-Card"
            id="القاهرة-الجديدة"
            onClick={handleNavigateToCity}
          >
            <div
              className="homeCities-Card-img"
              style={{
                backgroundImage:
                  "url(https://www.egyptaqar.com/wp-content/uploads/2022/01/القاهرة-الجديدة.jpg)",
              }}
            ></div>
            <h4 className="homeCities-title">القاهرة الجديدة</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCities;
