import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import "./blogs.css";
import { Col, Divider, Drawer, Row, Skeleton } from "antd";
import { BlogsServices } from "../../services/Blogs/BlogsServices";
import { LoadingOutlined } from "@ant-design/icons";

const Blogs = () => {
  const [data, setData] = useState([]);
  const blogInstance = new BlogsServices();
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async () => {
    try {
      const response = await blogInstance.getBlogs({
        page: 1,
        size: 10,
      });
      const data = await response.data.data;
      setData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <div className="properties blogs">
        <div className="blog bg">
          <h2>مقالات</h2>
        </div>

        <div className="blogs-container">
          <div className="props-content">
            {/* Cards */}
            <div className="content-cards">
              {/* {loading && <LoadingOutlined className="loadingIndicator" />} */}

              {!loading &&
                data?.length > 0 &&
                data?.map((item) => (
                  <div key={item?._id} className="blogs-card">
                    <BlogCard item={item} />
                  </div>
                ))}
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
        </div>
      </div>
    </>
  );
};

export default Blogs;
