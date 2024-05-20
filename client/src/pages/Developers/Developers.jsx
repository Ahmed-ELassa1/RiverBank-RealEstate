import React, { useEffect, useState } from "react";
import Subscribe from "../../components/Subscribe/Subscribe";
import { DevelopersService } from "../../services/Developers/DevelopersService";
import { LoadingOutlined } from "@ant-design/icons";
import "./Developers.css";
import { Card, Skeleton } from "antd";
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
        <h2>المطورون</h2>
      </div>
      <div className="main container dev-container">
        {/* {loading && <LoadingOutlined className="loadingIndicator" />} */}

        {!loading &&
          data &&
          data?.map((item) => (
            <div className="developer-card" key={item._id}>
              <Card
                onClick={() => Navigate(`/developers/${item._id}`)}
                hoverable
                className="dev-img"
                cover={
                  <img alt={item.title} src={item?.mainImage?.secure_url} />
                }
              >
                <Meta title={item.title} />
              </Card>
            </div>
          ))}
        {!loading && data?.length === 0 && (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            لا توجد مستثمرين في الوقت الحالي. لكن لا تقلق، نعمل بجدّ لإضافة
            المزيد من المستثمرين في أقرب وقت ممكن!
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
    </section>
  );
};

export default Developers;
