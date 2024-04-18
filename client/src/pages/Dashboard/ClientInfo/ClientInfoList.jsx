import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClientRequestService } from "../../../services/ClientRequest/ClientRequestService";

const ClientInfoList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const clientInstance = new ClientRequestService(token);

  const getAllDeveloeprs = async () => {
    try {
      const response = await clientInstance.getClientRequest({
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
      <h2 style={{ margin: "20px 0" }}>Client Requests</h2>

      {loading && <LoadingOutlined className="loadingIndicator" />}

      {/* Cards */}
      <div className="content-cards">
        {!loading &&
          data &&
          data?.map((item) => (
            <Link to={`view/${item._id}`} className="props-card" key={item._id}>
              <p className="project-card-title"> {item?.userName}</p>
              <p className="project-card-title"> {item?.email}</p>
              <p className="project-card-title"> {item?.phone}</p>
              <p className="project-card-title"> {item?.message}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ClientInfoList;
