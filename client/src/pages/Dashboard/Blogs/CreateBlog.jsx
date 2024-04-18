import React, { useState } from "react";
import { toast } from "react-toastify";
import { BlogsServices } from "../../../services/Blogs/BlogsServices";
import { useNavigate } from "react-router-dom";
import { Button, Input, Upload } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import joi from "joi";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [fileList, setFileList] = useState([]);

  const token = localStorage.getItem("token");
  const blogInstance = new BlogsServices(token);

  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [formErros, setFormErros] = useState({
    titleError: undefined,
    descriptionError: undefined,
  });

  const mainImageProps = {
    onRemove: (file) => {
      setMainImage(null);
    },
    beforeUpload: (file) => {
      setMainImage(file);
      return false;
    },
    mainImage,
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
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
        descriptionError: valid?.error?.details?.find(
          (error) => error?.context?.label === "description"
        )?.message,
      });
    } else {
      toast.loading("Loading...");

      const formData = new FormData();

      fileList?.forEach((feat) => {
        formData.append("subImages", feat);
      });

      mainImage && formData.append("mainImage", mainImage);
      formData.append("title", data.title);
      formData.append("description", data.description);

      try {
        const response = await blogInstance.createBlog(formData);

        if (response.status === 201) {
          toast.dismiss();
          toast.success(`${data.title} created Successfully`);

          navigate("/dashboard/blogs");
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
        <p>Upload Main Image</p>
        <Upload {...mainImageProps} maxCount={1}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </div>

      <div className="form-input">
        <p>Upload Sub Images</p>
        <Upload {...props} multiple>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </div>
    </div>
  );
};

export default CreateBlog;
