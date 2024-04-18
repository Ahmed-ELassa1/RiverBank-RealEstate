import React, { useEffect, useState } from "react";
import "./ProjectDetails.css";
import { useParams } from "react-router-dom";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import { GlobalOutlined, LoadingOutlined } from "@ant-design/icons";

const ProjectDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectInstance = new ProjectsService();

  const getProject = async () => {
    try {
      const response = await projectInstance.getProjectById(id);
      const data = await response.data.data;
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      {loading && <LoadingOutlined className="loadingIndicator" />}

      {!loading && (
        <>
          <div>
            <img
              src={data?.logo?.secure_url}
              alt={data?.title}
              className="projectImg"
            />
          </div>

          <div className="container">
            <h3 className="cityLabel">Details</h3>

            <div className="details-content">
              <div>
                <p>Name: {data?.title}</p>
                <span>
                  <GlobalOutlined /> Location: {data?.location}
                </span>
                <p>Description: {data?.description}</p>

                <div className="featuresDetails">
                  <span>Features:</span>
                  <ul>
                    {data?.features?.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  Price: {data?.price}&nbsp;{data?.currency}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
