import React, { useEffect, useState } from "react";
import { ProjectsService } from "../../../services/Projects/ProjectsService";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const ProjectsList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
    <div>
      <h2 style={{ margin: "20px 0" }}>Projects</h2>

      <div className="form-input-btn">
        <button className="subscribe-btn" onClick={() => navigate("create")}>
          Create
        </button>
      </div>

      {loading && <LoadingOutlined className="loadingIndicator" />}

      {/* Cards */}
      <div className="content-cards">
        {!loading &&
          data &&
          data?.map((item) => (
            <Link to={`view/${item._id}`} className="props-card" key={item._id}>
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
    </div>
  );
};

export default ProjectsList;
