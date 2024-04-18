import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DevelopersService } from "../../../services/Developers/DevelopersService";
import { toast } from "react-toastify";
import joi from "joi";

const DevelopersDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const token = localStorage.getItem("token");
  const developerInstance = new DevelopersService(token);

  const [data, setData] = useState({
    title: "",
    logo: "",
  });

  const [formErros, setFormErros] = useState({
    titleError: undefined,
  });

  const logoProps = {
    onRemove: (file) => {
      setMainImage(null);
      setMainImageError("");
    },
    beforeUpload: (file) => {
      setMainImage(file);
      setMainImageError("");

      return false;
    },
    mainImage,
  };

  function validation() {
    const schema = joi.object({
      title: joi.string().min(2).max(20).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "Title is a required field",
        "string.base": "Title is a required field",
        "any.required": "Title is a required field",
      }),
      logo: joi.optional(),
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;

    if (JSON.stringify(cloned) === JSON.stringify(data)) {
      setIsEdited(false);
    } else {
      setIsEdited(true);
      setData(cloned);
    }
  };

  const getDeveloperById = async () => {
    try {
      const response = await developerInstance.getDeveloperById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        title: data?.title,
        logo: data?.logo?.secure_url,
      });
    } catch (err) {
      setLoading(false);
      toast.error(err);
    }
  };

  const handleSave = async () => {
    if (isEdited) {
      const valid = validation();

      if (valid?.error?.details) {
        setFormErros({
          titleError: valid?.error?.details?.find(
            (error) => error?.context?.label === "title"
          )?.message,
        });
      } else {
        setFormErros({
          titleError: undefined,
        });
        toast.loading("Loading...");

        const formData = new FormData();

        mainImage && formData.append("logo", mainImage);
        formData.append("title", data.title);

        try {
          const response = await developerInstance.EditDeveloper(id, formData);

          if (response.status === 200) {
            toast.dismiss();
            toast.success(`${data.title} updated Successfully`);

            navigate("/dashboard/developers");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err);
        }
      }
    } else {
      navigate("/dashboard/developers");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await developerInstance.deleteDeveloepr(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.title} Deleted Successfully`);

        navigate("/dashboard/developers");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };

  useEffect(() => {
    getDeveloperById();
  }, []);

  return (
    <div>
      <div className="form-input-btn">
        <button
          onClick={handleDelete}
          className="subscribe-btn delete"
          style={{ backgroundColor: "rgb(203 60 60)" }}
        >
          Delete
        </button>
        <button type="submit" onClick={handleSave} className="subscribe-btn">
          Save
        </button>
      </div>

      {loading && <LoadingOutlined className="loadingIndicator" />}

      {!loading && (
        <>
          <div className="form-input">
            <p>Title</p>
            <Input
              name="title"
              value={data.title}
              onChange={handleChange}
              size="large"
            />
          </div>

          <div className="form-input">
            <p>Logo</p>
            <img
              name="logo"
              src={data.logo}
              alt={data.logo}
              width={250}
              height={250}
            />
          </div>

          <div className="form-input">
            <p>Upload Logo</p>
            <Upload {...logoProps} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>
        </>
      )}
    </div>
  );
};

export default DevelopersDetails;
