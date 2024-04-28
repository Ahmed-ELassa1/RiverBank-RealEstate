import React, { useEffect, useState } from "react";
import Subscribe from "../../components/Subscribe/Subscribe";
import "./Projects.css";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const ProjectSearch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectInstance = new ProjectsService();

  const getAllProjects = async () => {
    try {
      const response = await projectInstance.getProjects({
        page: 1,
        size: 10,
      });
      const data = await response.data.data;
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <section className="">
      <div className="projectBg bg">
        <h2>Projects</h2>
      </div>
      <div className="container">
        <h3 className="cityLabel">Our Projects</h3>
      </div>

      <div className="main container dev-container proje-container">
        {loading && <LoadingOutlined className="loadingIndicator" />}

        {!loading &&
          data &&
          data?.map((item) => (
            <Link to={`${item._id}`} className="developer-card" key={item._id}>
              <img
                className="dev-img proj-img"
                src={item.logo?.secure_url}
                alt="developer"
              />
              <div className="projectLink">
                <div className="project-card-title"> {item?.title}</div>
                <p className="">
                  Start from{" "}
                  <span>
                    {item?.price}&nbsp;
                    {item?.currency}
                  </span>
                </p>
              </div>
            </Link>
          ))}
      </div>

      <Subscribe />
    </section>
  );
};

export default ProjectSearch;
