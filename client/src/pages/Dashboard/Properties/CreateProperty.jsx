import React, { useState } from "react";
import { PropertiesServices } from "../../../services/properties/PropertiesServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Select, Upload } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import joi from "joi";
import {
  areaOptions,
  currencyOptions,
  egyptianCities,
  purposeOptions,
  useOptions,
} from "../../../data/sharedData";

const CreateProperty = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const propertyInstance = new PropertiesServices(token);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState("");

  const [fileList, setFileList] = useState([]);

  const mainImageProps = {
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

  const [data, setData] = useState({
    name: "",
    description: "",
    city: egyptianCities[0].value,
    area: areaOptions[0].value,
    price: 0,
    purpose: purposeOptions[0].value,
    use: useOptions[0].value,
    bedrooms: 0,
    bathrooms: 0,
    currency: currencyOptions[0].value,
  });

  const [formErros, setFormErros] = useState({
    nameError: undefined,
    descriptionError: undefined,
  });

  function validation() {
    const schema = joi.object({
      name: joi.string().min(2).max(20).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "Name is a required field",
        "string.base": "Name is a required field",
        "any.required": "Name is a required field",
      }),
      description: joi.string().min(2).max(20).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "Description is a required field",
        "string.base": "Description is a required field",
        "any.required": "Description is a required field",
      }),

      city: joi.optional(),
      area: joi.optional(),
      price: joi.optional(),
      purpose: joi.optional(),
      use: joi.optional(),
      bedrooms: joi.optional(),
      bathrooms: joi.optional(),
      currency: joi.optional(),
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;

    setData(cloned);
  };

  const handleCreate = async (e) => {
    const valid = validation();
    if (valid?.error?.details) {
      setFormErros({
        nameError: valid?.error?.details?.find(
          (error) => error?.context?.label === "name"
        )?.message,
        descriptionError: valid?.error?.details?.find(
          (error) => error?.context?.label === "description"
        )?.message,
      });
    } else if (!mainImage) {
      setMainImageError("Main Image is a reqired field");
      setFormErros({
        titleError: undefined,
        descriptionError: undefined,
        cityError: undefined,
      });
      return;
    } else {
      setMainImageError("");

      setFormErros({
        titleError: undefined,
        descriptionError: undefined,
        cityError: undefined,
      });

      toast.loading("Loading...");

      const formData = new FormData();

      fileList?.length > 0 &&
        fileList.forEach((file) => {
          formData.append("coverImages", file);
        });

      formData.append("mainImage", mainImage);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("city", data.city);
      formData.append("area", data.area);
      formData.append("price", data.price);
      formData.append("purpose", data.purpose);
      formData.append("bedrooms", data.bedrooms);
      formData.append("use", data.use);
      formData.append("bathrooms", data.bathrooms);
      formData.append("currency", data.currency);

      try {
        const response = await propertyInstance.createProperty(formData);

        if (response.status === 201) {
          toast.dismiss();
          toast.success(`${data.name} updated Successfully`);

          navigate("/dashboard/properties");
        }
      } catch (err) {
        toast.dismiss();
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
        <p>Name</p>
        <Input
          name="name"
          value={data.name}
          onChange={handleChange}
          size="large"
        />
        {formErros?.nameError != undefined && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            {formErros?.nameError}
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
        <p>City</p>
        <Select
          value={data.city}
          style={{ width: "100%" }}
          onChange={(value) => setData({ ...data, city: value })}
          options={egyptianCities}
          size="large"
        />
      </div>
      <div className="form-input">
        <p>Area</p>

        <Select
          value={data.area}
          style={{ width: "100%" }}
          onChange={(value) => setData({ ...data, area: value })}
          options={areaOptions}
          size="large"
        />
      </div>
      <div className="form-input">
        <p>Price</p>
        <Input
          name="price"
          value={data.price}
          onChange={handleChange}
          type="number"
          size="large"
        />
      </div>
      <div className="form-input">
        <p>Use</p>
        <Select
          value={data.use}
          style={{ width: "100%" }}
          onChange={(value) => setData({ ...data, use: value })}
          options={useOptions}
          size="large"
        />
      </div>
      <div className="form-input">
        <p>Currency</p>

        <Select
          value={data.currency}
          style={{ width: "100%" }}
          onChange={(value) => setData({ ...data, currency: value })}
          options={currencyOptions}
          size="large"
        />
      </div>
      <div className="form-input">
        <p>Purpose</p>
        <Select
          value={data.purpose}
          style={{ width: "100%" }}
          onChange={(value) => setData({ ...data, purpose: value })}
          options={purposeOptions}
          size="large"
        />
      </div>
      <div className="form-input">
        <p>Bedrooms</p>
        <Input
          name="bedrooms"
          value={data.bedrooms}
          type="number"
          onChange={handleChange}
          size="large"
        />
      </div>
      <div className="form-input">
        <p>Bathrooms</p>
        <Input
          name="bathrooms"
          value={data.bathrooms}
          type="number"
          onChange={handleChange}
          size="large"
        />
      </div>

      <div className="form-input">
        <p>Upload Main Image</p>
        <Upload {...mainImageProps} maxCount={1} listType="picture">
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

      <div className="form-input">
        <p>Upload Cover Images</p>
        <Upload {...props} maxCount={3} multiple listType="picture">
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </div>
    </div>
  );
};

export default CreateProperty;
