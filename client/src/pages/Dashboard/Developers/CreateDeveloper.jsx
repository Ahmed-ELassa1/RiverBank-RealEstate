import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DevelopersService } from "../../../services/Developers/DevelopersService";
import { Button, Input, Upload } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import joi from "joi";

const CreateDeveloper = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState("");

  const token = localStorage.getItem("token");
  const developerInstance = new DevelopersService(token);

  const [data, setData] = useState({
    title: "",
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
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;

    setData(cloned);
  };

  const handleCreate = async () => {
    const valid = validation();

    if (valid?.error?.details) {
      setFormErros({
        titleError: valid?.error?.details?.find(
          (error) => error?.context?.label === "title"
        )?.message,
      });
    } else if (!mainImage) {
      setMainImageError("Main Image is a reqired field");
      setFormErros({
        titleError: undefined,
      });
      return;
    } else {
      setFormErros({
        titleError: undefined,
      });

      toast.loading("Loading...");

      const formData = new FormData();

      formData.append("logo", mainImage);
      formData.append("title", data.title);

      try {
        const response = await developerInstance.createDeveloper(formData);

        if (response.status === 201) {
          toast.dismiss();
          toast.success(`${data.title} created Successfully`);

          navigate("/dashboard/developers");
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
        <button type="submit" onClick={handleCreate} className="subscribe-btn">
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

export default CreateDeveloper;
