import { Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import "./Cities.css";
import City from "../../assets/cairo.avif";
import { useTranslation } from "react-i18next";
import { CityService } from "../../services/City/CityService";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import { LoadingOutlined } from "@ant-design/icons";

const Cities = () => {
  const projectService = new ProjectsService();
  const cityService = new CityService();
  const { t } = useTranslation();
  const { cityId } = useParams();
  const [projectCards, setProjectCards] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  async function getCityProjects() {
    setLoading(true);
    setProjectCards([]);
    const response = await projectService.getProjects({ cityId });
    setProjectCards(response?.data?.data);
    setLoading(false);
  }
  async function getCityName() {
    const response = await cityService.getCityById(cityId);
    const data = response.data.data;
    setCurrentCity(data?.title);
  }
  useEffect(() => {
    getCityName();
  }, [currentCity]);
  useEffect(() => {
    setCurrentCity("")
    getCityProjects();
  }, [cityId]);

  return (
    <div className="cities">
      <div className="bg">
        <h2>{currentCity}</h2>
      </div>
      {/* <div className="container">
        <h3 className=" cityLabel">Our Cities</h3>
      </div> */}

      <div className="main container city-container">
        {loading && <LoadingOutlined className="loadingIndicator" />}

        {!loading && projectCards?.length > 0
          ? projectCards?.map((project, i) => {
              return (
                <div className="cityCard" key={i}>
                  <Card
                    onClick={() => Navigate(`/projects/${project?._id}`)}
                    hoverable
                    // style={{ width: 240 }}
                    cover={
                      <img
                        alt={project?.seoData}
                        src={project?.mainImage?.secure_url}
                      />
                    }
                  >
                    <Meta title={project?.title} />
                  </Card>
                </div>
              );
            })
          : ""}

        {/* <div className="cityCard">
          <Card
            onClick={() => Navigate("/projects/1")}
            hoverable
            // style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="New Capital City" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            onClick={() => Navigate("/projects/1")}
            hoverable
            // style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="Mostakbal City" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            onClick={() => Navigate("/projects/1")}
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="Ain Sokhna" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            onClick={() => Navigate("/projects/1")}
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="North Coast" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            onClick={() => Navigate("/projects/1")}
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="El Gouna" />
          </Card>
        </div>

        <div className="cityCard">
          <Card
            onClick={() => Navigate("/projects/1")}
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={City} />}
          >
            <Meta title="New Heliopolis" />
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default Cities;
