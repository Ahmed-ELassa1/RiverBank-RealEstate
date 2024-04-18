import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectsService } from "../../../services/Projects/ProjectsService";
import joi from "joi";

const CreateProject = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState("");

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
  });

  const [formErros, setFormErros] = useState({
    titleError: undefined,
    descriptionError: undefined,
  });

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;

    setData(cloned);
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
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }

  const handleCreate = async () => {
    const valid = validation();
    if (valid?.error?.details) {
      setFormErros({
        titleError: valid?.error?.details?.find(
          (error) => error?.context?.label === "title"
        )?.message,
        descriptionError: valid?.error?.details?.find(
          (error) => error?.context?.label === "description"
        )?.message,
      });
    } else {
      if (!mainImage) {
        setMainImageError("Main Image is a reqired field");
        return;
      } else {
        setMainImageError("");
      }

      setFormErros({
        titleError: undefined,
        descriptionError: undefined,
      });

      toast.loading("Loading...");

      const featuresSchema = data.features?.split(",");

      const formData = new FormData();

      featuresSchema?.forEach((feat) => {
        formData.append("features", feat);
      });

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("logo", mainImage);
      formData.append("price", data.price);
      formData.append("location", data.location);
      formData.append("currency", data.currency);

      try {
        const response = await projectInstance.createProject(formData);

        if (response?.status === 201) {
          toast.dismiss();
          toast.success(`${data.title} created Successfully`);

          navigate("/dashboard/projects");
        }
      } catch (err) {
        toast.dismiss();
        toast.error(err);
      }
    }
  };

  return (
    <div>
      <div className="form-input-btn">
        <button className="subscribe-btn" onClick={handleCreate}>
          Create
        </button>
      </div>

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
        <p>Upload Logo</p>
        <Upload {...logoProps} maxCount={1}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>

        {mainImageError !== "" && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            {mainImageError}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
