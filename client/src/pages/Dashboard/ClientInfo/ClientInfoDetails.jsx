import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClientRequestService } from "../../../services/ClientRequest/ClientRequestService";
import { LoadingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const ClientInfoDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const clientInstance = new ClientRequestService(token);

  const [data, setData] = useState({
    userName: "",
    email: "",
    phone: "",
    preferredLocation: "",
    message: "",
  });

  const getRequestById = async () => {
    try {
      const response = await clientInstance.getClientRequestById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        userName: data?.userName,
        email: data?.email,
        phone: data?.phone,
        preferredLocation: data?.preferredLocation,
        message: data?.message,
      });
    } catch (err) {
      setLoading(false);
      toast.error(err);
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await clientInstance.deleteClientRequest(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.userName} Deleted Successfully`);

        navigate("/dashboard/clientInfo");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };

  useEffect(() => {
    getRequestById();
  }, []);

  return (
    <div>
      <div className="form-input-btn">
        <button
          onClick={handleDelete}
          className="subscribe-btn delete"
          style={{ backgroundColor: "rgb(203 60 60)" }}
        >
          مسح
        </button>
      </div>

      {loading && <LoadingOutlined className="loadingIndicator" />}

      {!loading && (
        <>
          <div className="form-input">
            <p>User Name</p>
            <Input
              name="userName"
              value={data.userName}
              disabled
              size="large"
            />
          </div>

          <div className="form-input">
            <p>Email</p>
            <Input name="email" value={data.email} disabled size="large" />
          </div>

          <div className="form-input">
            <p>Phone</p>
            <Input name="phoen" value={data.phone} disabled size="large" />
          </div>

          <div className="form-input">
            <p>Preferred Location</p>
            <Input
              name="preferredLocation"
              value={data.preferredLocation}
              disabled
              size="large"
            />
          </div>

          <div className="form-input">
            <p>Message</p>
            <TextArea
              rows={4}
              name="message"
              value={data.message}
              disabled
              size="large"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ClientInfoDetails;
