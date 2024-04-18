import React, { useEffect, useState } from "react";
import { ProjectsService } from "../../../services/Projects/ProjectsService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CloseCircleOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import joi from "joi";

const ProjectsDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState(null);

  const token = localStorage.getItem("token");
  const projectInstance = new ProjectsService(token);

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

  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    currency: "",
    features: "",
    logo: "",
  });
  const [formErros, setFormErros] = useState({
    titleError: undefined,
    descriptionError: undefined,
  });

  function validation() {
    const schema = joi.object({
      title: joi.string().min(2).max(20).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "Title is a required field",
        "string.base": "Title is a required field",
        "any.required": "Title is a required field",
      }),
      description: joi.string().min(2).max(20).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "Description is a required field",
        "string.base": "Description is a required field",
        "any.required": "Description is a required field",
      }),
      location: joi.optional(),
      price: joi.optional(),
      currency: joi.optional(),
      features: joi.optional(),
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

  const getProjectById = async () => {
    try {
      const response = await projectInstance.getProjectById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        title: data?.title,
        description: data?.description,
        location: data?.location,
        logo: data?.logo?.secure_url,
        features: data?.features?.toString(),
        price: data?.price,
        currency: data?.currency,
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
            (error) => error?.context?.label == "title"
          )?.message,
          descriptionError: valid?.error?.details?.find(
            (error) => error?.context?.label == "description"
          )?.message,
        });
      } else {
        setFormErros({
          titleError: undefined,
          descriptionError: undefined,
        });
        setMainImageError("");

        toast.loading("Loading...");

        const featuresSchema = data?.features?.split(",");

        const formData = new FormData();

        featuresSchema?.forEach((feat) => {
          formData.append("features", feat);
        });

        formData.append("title", data.title);
        formData.append("description", data.description);
        mainImage && formData.append("logo", mainImage);
        formData.append("price", data.price);
        formData.append("location", data.location);
        formData.append("currency", data.currency);

        try {
          const response = await projectInstance.EditProject(id, formData);

          if (response.status === 200) {
            toast.dismiss();
            toast.success(`${data.title} updated Successfully`);

            navigate("/dashboard/projects");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err);
        }
      }
    } else {
      navigate("/dashboard/projects");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await projectInstance.deleteProject(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.title} Deleted Successfully`);

        navigate("/dashboard/projects");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };

  useEffect(() => {
    getProjectById();
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
            {formErros?.titleError != undefined && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {formErros?.titleError}
              </p>
            )}
          </div>

          <div className="form-input">
            <p>Description</p>
            <Input
              name="description"
              value={data.description}
              onChange={handleChange}
              size="large"
            />
            {formErros?.descriptionError != undefined && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {formErros?.descriptionError}
              </p>
            )}
          </div>

          <div className="form-input">
            <p>Price</p>
            <Input
              name="price"
              value={data.price}
              onChange={handleChange}
              size="large"
            />
          </div>

          <div className="form-input">
            <p>Currency</p>
            <Input
              name="currency"
              value={data.currency}
              onChange={handleChange}
              size="large"
            />
          </div>

          <div className="form-input">
            <p>Location</p>
            <Input
              name="location"
              value={data.location}
              onChange={handleChange}
              size="large"
            />
          </div>

          <div className="form-input">
            <p>Features</p>
            <Input
              name="features"
              value={data.features}
              onChange={handleChange}
              size="large"
              placeholder="please seperate words by comma EX: one,two,...."
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

            {mainImageError && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {mainImageError}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsDetails;
