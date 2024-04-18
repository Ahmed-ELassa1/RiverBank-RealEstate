import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import "./Cities.css";
import City from "../../assets/cairo.avif";

const Cities = () => {
  return (
    <div className="cities">
      <div className="bg">
        <h2>Cities</h2>
      </div>
      <div className="container">
        <h3 className=" cityLabel">Our Cities</h3>
      </div>

      <div className="main container city-container">
        <div className="cityCard">
          <Card
            hoverable
            // style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="New Cairo" description="127 companies" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            // style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="New Capital City" description="127 companies" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            // style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="Mostakbal City" description="127 companies" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="Ain Sokhna" description="127 companies" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="North Coast" description="127 companies" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="El Gouna" description="127 companies" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="New Heliopolis" description="127 companies" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cities;
