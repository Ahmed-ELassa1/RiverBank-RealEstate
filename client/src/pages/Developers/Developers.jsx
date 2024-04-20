import React, { useEffect, useState } from "react";
import Subscribe from "../../components/Subscribe/Subscribe";
import { DevelopersService } from "../../services/Developers/DevelopersService";
import { LoadingOutlined } from "@ant-design/icons";
import "./Developers.css";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

const Developers = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const developerInstance = new DevelopersService();

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
    <section className="developer-page">
      <div className="dev bg">
        <h2>Developers</h2>
      </div>
      <div className="main container dev-container">
        {loading && <LoadingOutlined className="loadingIndicator" />}

        {!loading &&
          data &&
          data?.map((item) => (
            <div className="developer-card" key={item._id}>
              <Card
                onClick={() => Navigate("/projects/1")}
                hoverable
                className="dev-img"
                cover={<img alt={item.title} src={item.logo?.secure_url} />}
              >
                <Meta title={item.title} />
              </Card>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Developers;
