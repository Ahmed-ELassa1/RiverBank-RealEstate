import { Card } from "antd";
import { useParams } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import React from "react";
import "./Cities.css";
import City from "../../assets/cairo.avif";
import { useTranslation } from "react-i18next";

const Cities = () => {
  const { t } = useTranslation();
  const { cityId } = useParams();
  console.log(cityId);
  return (
    <div className="cities">
      <div className="bg">
        <h2>
          {cityId == "newCapital"
            ? t("label.navbar.newCapital")
            : cityId == "newCairo"
            ? t("label.navbar.newCairo")
            : cityId == "northCoast"
            ? t("label.navbar.northCoast")
            : cityId == "rasSedr"
            ? t("label.navbar.rasSedr")
            : t("label.navbar.ainSokhna")}
        </h2>
      </div>
      {/* <div className="container">
        <h3 className=" cityLabel">Our Cities</h3>
      </div> */}

      <div className="main container city-container">
        <div className="cityCard">
          <Card
            hoverable
            // style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="New Cairo" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            // style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="New Capital City" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            // style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="Mostakbal City" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="Ain Sokhna" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="North Coast" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="El Gouna" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="New Heliopolis" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cities;
