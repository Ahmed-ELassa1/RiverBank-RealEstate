import React, { useState } from "react";
import "./ContactUs.css";
import { ClientRequestService } from "../../services/ClientRequest/ClientRequestService";
import { toast } from "react-toastify";
import joi from "joi";
import img from "../../assets/contactUs.jpg";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();
  const [data, setData] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    message: "",
  });
  const [formErros, setFormErros] = useState({
    nameError: undefined,
    emailError: undefined,
    locationError: undefined,
    phoneError: undefined,
    messageError: undefined,
  });
  const clientInstance = new ClientRequestService();

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;
    if (e.target.name == "phone" && e.target.value < 0) {
      setData({ ...cloned, phone: null });
    } else {
      setData(cloned);
    }
  };
  function validation() {
    const schema = joi.object({
      name: joi.string().min(2).max(20).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "name is a required field",
        "string.base": "name is a required field",
        "any.required": "name is a required field",
      }),
      location: joi.string().min(2).max(20).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "location is a required field",
        "string.base": "location is a required field",
        "any.required": "location is a required field",
      }),
      phone: joi.string().required().messages({
        "string.empty": "phone is a required field",
        "string.base": "phone is a required field",
        "any.required": "phone is a required field",
      }),
      email: joi
        .string()
        .email({ tlds: { allow: ["net", "com"] } })
        .required()
        .messages({
          "string.empty": "email is a required field",
          "string.base": "email is a required field",
          "any.required": "email is a required field",
        }),
      message: joi.string().min(2).max(500).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 500 char",
        "string.empty": "message is a required field",
        "string.base": "message is a required field",
        "any.required": "message is a required field",
      }),
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }
  const sendClientRequest = async (e) => {
    e.preventDefault();
    const valid = validation();
    if (valid?.error?.details) {
      // setFormErros({
      //   nameError: valid?.error?.details?.find(
      //     (error) => error?.context?.label == "name"
      //   )?.message,
      //   phoneError: valid?.error?.details?.find(
      //     (error) => error?.context?.label == "phone"
      //   )?.message,
      //   locationError: valid?.error?.details?.find(
      //     (error) => error?.context?.label == "location"
      //   )?.message,
      //   messageError: valid?.error?.details?.find(
      //     (error) => error?.context?.label == "message"
      //   )?.message,
      //   emailError: valid?.error?.details?.find(
      //     (error) => error?.context?.label == "email"
      //   )?.message,
      // });
      valid?.error?.details?.map((error) => {
        return toast.error(`${error?.message}`);
      });
    } else {
      toast.loading("loading...");
      setFormErros({
        nameError: undefined,
        emailError: undefined,
        locationError: undefined,
        phoneError: undefined,
        messageError: undefined,
      });
      //   try {
      const response = await clientInstance.createClientRequest({
        userName: data.name,
        email: "hhhh@mail.com",
        phone: data.phone,
        preferredLocation: data.location,
        message: data.message,
      });
      if (response?.status == 201) {
        toast.dismiss();
        toast.success("Request Sent Successfully, Thank you");
        setData({
          name: "",
          location: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    }
  };
  return (
    <div className="contactus-page">
      <div className="contactus-page-content">
        <div className="sub-form">
          <div>
            <input
              className={
                formErros?.nameError == undefined
                  ? "email-input"
                  : "email-input-error"
              }
              type="text"
              placeholder={t("label.name")}
              onChange={handleChange}
              name="name"
              value={data.name}
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
          <div>
            <input
              className={
                formErros?.emailError == undefined
                  ? "email-input"
                  : "email-input-error"
              }
              type="text"
              placeholder={t("label.email")}
              onChange={handleChange}
              name="email"
              value={data.email}
            />
            {formErros?.emailError != undefined && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {formErros?.emailError}
              </p>
            )}
          </div>
          <div>
            <input
              className={
                formErros?.locationError == undefined
                  ? "email-input"
                  : "email-input-error"
              }
              type="text"
              placeholder={t("label.location")}
              onChange={handleChange}
              name="location"
              value={data.location}
            />
            {formErros?.locationError != undefined && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {formErros?.locationError}
              </p>
            )}
          </div>
          <div>
            <input
              className={
                formErros?.phoneError == undefined
                  ? "email-input"
                  : "email-input-error"
              }
              type="number"
              placeholder={t("label.phone")}
              onChange={handleChange}
              name="phone"
              value={data.phone}
            />
            {formErros?.phoneError != undefined && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {formErros?.phoneError}
              </p>
            )}
          </div>
          <div>
            <textarea
              className={
                formErros?.messageError == undefined
                  ? "email-input"
                  : "email-input-error"
              }
              type="text"
              placeholder={t("label.message")}
              rows={5}
              onChange={handleChange}
              name="message"
              value={data.message}
              draggable={false}
            />
            {formErros?.messageError != undefined && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {formErros?.messageError}
              </p>
            )}
          </div>
          <button className="subscribe-btn" onClick={sendClientRequest}>
            {t("button.Submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
