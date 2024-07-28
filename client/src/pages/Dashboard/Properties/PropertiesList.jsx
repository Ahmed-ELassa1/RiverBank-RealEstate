import React, { useEffect, useState } from "react";
import { PropertiesServices } from "../../../services/properties/PropertiesServices";
import { LoadingOutlined } from "@ant-design/icons";
import PropsCard from "../../../components/PropsCard/PropsCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PropertiesList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const propertyInstance = new PropertiesServices();

  const getAllProperties = async () => {
    try {
      toast.loading("Loading...");
      const response = await propertyInstance.getProperties();
      const data = await response.data.data;
      setLoading(false);
      toast.dismiss();
      setData(data);
    } catch (err) {
      toast.dismiss();
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <div>
      <h2 style={{ margin: "20px 0" }}>Properties</h2>

      <div className="form-input-btn">
        <button className="subscribe-btn" onClick={() => navigate("create")}>
          Create
        </button>
      </div>

      {loading && <LoadingOutlined className="loadingIndicator" />}

      {/* Cards */}
      <div className="content-cards">
        {!loading &&
          data?.length > 0 &&
          data?.map((item) => (
            <div
              key={item._id}
              className="props-card"
              onClick={() => navigate(`view/${item._id}`)}
            >
              <PropsCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PropertiesList;
