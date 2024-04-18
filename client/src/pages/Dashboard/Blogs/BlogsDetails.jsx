import {
  CloseCircleOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BlogsServices } from "../../../services/Blogs/BlogsServices";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Upload } from "antd";
import joi from "joi";

const BlogsDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [fileList, setFileList] = useState([]);

  const token = localStorage.getItem("token");
  const blogInstance = new BlogsServices(token);

  const [data, setData] = useState({
    title: "",
    description: "",
    mainImage: "",
    subImages: [],
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
      mainImage: joi.optional(),
      subImages: joi.optional(),
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

  const getBlogById = async () => {
    try {
      const response = await blogInstance.getBlogById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        title: data?.title,
        description: data?.description,
        mainImage: data?.mainImage?.secure_url,
        subImages: data?.subImages,
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
          const response = await blogInstance.EditBlog(id, formData);

          if (response.status === 200) {
            toast.dismiss();
            toast.success(`${data.title} updated Successfully`);

            navigate("/dashboard/blogs");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err);
        }
      }
    } else {
      navigate("/dashboard/blogs");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await blogInstance.deleteBlog(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.title} Deleted Successfully`);

        navigate("/dashboard/blogs");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };

  useEffect(() => {
    getBlogById();
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
            <p>Main Image</p>
            <img
              name="logo"
              src={data.mainImage}
              alt={data.mainImage}
              width={250}
              height={250}
            />
          </div>

          <div className="form-input">
            <p>Upload Main Image</p>
            <Upload {...mainImageProps} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>

          <div className="form-input">
            <p>Sub Images</p>

            <div style={{ display: "flex", gap: "10px" }}>
              {data?.subImages?.map((item) => (
                <img
                  key={item?.public_id}
                  name="sub"
                  src={item?.secure_url}
                  alt={item?.secure_url}
                  width={250}
                  height={250}
                />
              ))}
            </div>
          </div>

          <div className="form-input">
            <p>Upload Sub Images</p>
            <Upload {...props} multiple>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsDetails;
