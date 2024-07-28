import { Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import "./ProjectType.css";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import { LoadingOutlined } from "@ant-design/icons";

const ProjectType = () => {
  const projectService = new ProjectsService();
  const { projectType } = useParams();
  const [projectCards, setProjectCards] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  async function getCityProjects(currentProject) {
    setLoading(true);
    setProjectCards([]);
    const response = await projectService.getProjects();
    const data = response?.data?.data?.filter((project) => {
      return project?.projectType == currentProject;
    });
    setProjectCards(data);
    setLoading(false);
  }
  useEffect(() => {
    setCurrentCity("")
  }, [projectType]);
  useEffect(() => {
    if (projectType == "residential") {
      setCurrentCity("مشروعات سكنية")
      getCityProjects("مشروعات-سكنية");

    } else if (projectType == "commercial") {
      setCurrentCity("مشروعات تجارية")
      getCityProjects("مشروعات-تجارية");
    } else {
      setCurrentCity("مشروعات ساحلية")
      getCityProjects("مشروعات-ساحلية");
    }
  }, [projectType]);

  return (
    <div className="project-types">
      <div className="bg">
        <h2>{currentCity}</h2>
      </div>
      <div className="main container city-container">
        {loading && <LoadingOutlined className="loadingIndicator" />}

        {!loading && projectCards?.length > 0
          ? projectCards?.map((project, i) => {
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
          })
          : ""}
      </div>
    </div>
  );
};

export default ProjectType;
