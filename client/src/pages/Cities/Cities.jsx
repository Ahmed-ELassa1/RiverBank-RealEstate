import { Card, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import "./Cities.css";
import { CityService } from "../../services/City/CityService";
import { ProjectsService } from "../../services/Projects/ProjectsService";

const Cities = () => {
  const projectService = new ProjectsService();
  const cityService = new CityService();
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
    const data = response?.data?.data;
    setCurrentCity(data?.title);
  }
  useEffect(() => {
    getCityName();
  }, [currentCity]);
  useEffect(() => {
    setCurrentCity("");
    getCityProjects();
  }, [cityId]);

  return (
    <div className="cities">
      <div className="bg">
        <h2>{currentCity}</h2>
      </div>

      <div className="main container city-container">

        {!loading &&
          projectCards?.length > 0 &&
          projectCards?.map((project, i) => {
            return (
              <div className="cityCard" key={i}>
                <Card
                  onClick={() => Navigate(`/projects/${project?._id}`)}
                  hoverable
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
          })}
        {!loading && projectCards?.length === 0 && (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            لا توجد مشاريع في الوقت الحالي. لكن لا تقلق، نعمل بجدّ لإضافة المزيد
            من المشاريع في أقرب وقت ممكن!
          </div>
        )}
        {loading && (
          <div className="skelton-content">
            <div className="skelton-card">
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
            <div className="skelton-card">
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
            <div className="skelton-card">
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
            <div className="skelton-card">
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
      </div>
    </div>
  );
};

export default Cities;
