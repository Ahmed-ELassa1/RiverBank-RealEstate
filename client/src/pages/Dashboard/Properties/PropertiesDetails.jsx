import { Button, Input, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropertiesServices } from "../../../services/properties/PropertiesServices";
import {
  CloseCircleOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import joi from "joi";
import {
  areaOptions,
  currencyOptions,
  egyptianCities,
  purposeOptions,
  useOptions,
} from "../../../data/sharedData";

const PropertiesDetails = () => {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isEdited, setIsEdited] = useState(false);

  const token = localStorage.getItem("token");
  const propertyInstance = new PropertiesServices(token);

  const [data, setData] = useState({
    name: "",
    description: "",
    city: "",
    area: "",
    price: "",
    purpose: "",
    use: "",
    mainImage: "",
    coverImages: [],
    bedrooms: "",
    bathrooms: "",
    currency: "",
  });

  const [formErros, setFormErros] = useState({
    nameError: undefined,
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

    if (JSON.stringify(cloned) === JSON.stringify(data)) {
      setIsEdited(false);
    } else {
      setIsEdited(true);
      setData(cloned);
    }
  };

  const getPropertyById = async () => {
    try {
      const response = await propertyInstance.getPropertyById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        name: data?.name,
        description: data?.description,
        city: data?.city,
        area: data?.area,
        price: data?.price,
        purpose: data?.purpose,
        mainImage: data?.mainImage?.secure_url,
        coverImages: data?.coverImages,
        use: data?.use,
        bedrooms: data?.bedrooms,
        bathrooms: data?.bathrooms,
        currency: data?.currency,
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (isEdited) {
      const valid = validation();
      if (valid?.error?.details) {
        setFormErros({
          nameError: valid?.error?.details?.find(
            (error) => error?.context?.label == "name"
          )?.message,
          descriptionError: valid?.error?.details?.find(
            (error) => error?.context?.label == "description"
          )?.message,
        });
      } else {
        toast.loading("Loading...");

        setFormErros({
          nameError: undefined,
          descriptionError: undefined,
        });

        const formData = new FormData();

        fileList?.length > 0 &&
          fileList?.forEach((file) => {
            formData.append("coverImages", file);
          });

        mainImage && formData.append("mainImage", mainImage);
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
          const response = await propertyInstance.EditProperty(id, formData);

          if (response.status === 201) {
            toast.dismiss();
            toast.success(`${data.name} updated Successfully`);

            navigate("/dashboard/properties");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
        }
      }
    } else {
      navigate("/dashboard/properties");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await propertyInstance.deleteProperty(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.name} Deleted Successfully`);

        navigate("/dashboard/properties");
      }
    } catch (err) {
      toast.dismiss();
    }
  };

  useEffect(() => {
    getPropertyById();
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
        <button className="subscribe-btn" onClick={handleSave}>
          Save
        </button>
      </div>

      {loading && <LoadingOutlined className="loadingIndicator" />}

      {!loading && (
        <>
          <div className="form-input">
            <p>Title</p>
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
              type="number"
              onChange={handleChange}
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
              {data?.coverImages?.map((item) => (
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

export default PropertiesDetails;
