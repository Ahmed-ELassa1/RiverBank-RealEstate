import React, { useEffect, useState } from "react";
import { DevelopersService } from "../../../services/Developers/DevelopersService";
import { LoadingOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Link, useNavigate } from "react-router-dom";

const DevelopersList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const developerInstance = new DevelopersService();
  const navigate = useNavigate();

  const getAllDeveloeprs = async () => {
    try {
      const response = await developerInstance.getDevelopers({
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
    getAllDeveloeprs();
  }, []);

  return (
    <div>
      <h2 style={{ margin: "20px 0" }}>Developers</h2>

      <div className="form-input-btn">
        <button className="subscribe-btn" onClick={() => navigate("create")}>
          Create
        </button>
      </div>

      <div className="content-cards">
        {loading && <LoadingOutlined className="loadingIndicator" />}

        {!loading &&
          data &&
          data?.map((item) => (
            <Link
              to={`view/${item?._id}`}
              className="developer-card"
              key={item._id}
            >
              <Card
                hoverable
                className="dev-img"
                cover={
                  <img
                    alt={item.title}
                    src={item.logo?.secure_url}
                    width={250}
                    height={250}
                  />
                }
              >
                <Meta title={item.title} />
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DevelopersList;
