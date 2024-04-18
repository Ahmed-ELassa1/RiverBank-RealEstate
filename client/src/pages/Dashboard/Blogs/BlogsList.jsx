import React, { useEffect, useState } from "react";
import { BlogsServices } from "../../../services/Blogs/BlogsServices";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import BlogCard from "../../../components/BlogCard/BlogCard";

const BlogsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const blogInstance = new BlogsServices();

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
    <div>
      <h2 style={{ margin: "20px 0" }}>Blogs</h2>

      <div className="form-input-btn">
        <button className="subscribe-btn" onClick={() => navigate("create")}>
          Create
        </button>
      </div>

      <div className="content-cards">
        {loading && <LoadingOutlined className="loadingIndicator" />}

        {!loading &&
          data?.length > 0 &&
          data?.map((item) => (
            <Link
              to={`view/${item?._id}`}
              key={item?._id}
              className="props-card blogs-card"
            >
              <BlogCard item={item} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BlogsList;
