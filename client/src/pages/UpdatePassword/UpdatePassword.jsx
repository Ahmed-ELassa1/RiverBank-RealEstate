import React, { useState } from "react";
import Logo from "../../assets/logoTxt.png";
import Logoimg from "../../assets/logoImg.png";
import EmailIcon from "../../components/Icons/Email";

import { UsersService } from "../../services/Users/UsersService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import PassowrdIcon from "../../components/Icons/Passowrd";
import joi from "joi";
import { CloseCircleOutlined } from "@ant-design/icons";

const UpdatePassword = () => {
  const loginInstance = new UsersService();
  const { state } = useLocation();
  const { email } = state;
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: email,
    password: "",
    cPassword: "",
    code: "",
  });

  const [formErros, setFormErros] = useState({
    emailError: undefined,
    passwordError: undefined,
    cPasswordError: undefined,
    codeError: undefined,
  });

  function validation() {
    const schema = joi.object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Email is a required field",
          "string.base": "Email is a required field",
          "any.required": "Email is a required field",
          "string.email": "Email is not valid",
        }),
      password: joi.string().required().min(2).max(20).messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "Password is a required field",
        "string.base": "Password is a required field",
        "any.required": "Password is a required field",
      }),
      cPassword: joi.any().valid(joi.ref("password")).required().messages({
        "any.only": "Confimation password doesn't match password",
      }),
      code: joi.number().required().messages({
        "number.empty": "Code is a required field",
        "number.base": "Code is a required field",
        "any.required": "Code is a required field",
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

  const handleVerify = async (e) => {
    e.preventDefault();

    const valid = validation();
    if (valid?.error?.details) {
      setFormErros({
        emailError: valid?.error?.details?.find(
          (error) => error?.context?.label == "email"
        )?.message,
        passwordError: valid?.error?.details?.find(
          (error) => error?.context?.label == "password"
        )?.message,
        cPasswordError: valid?.error?.details?.find(
          (error) => error?.context?.label == "cPassword"
        )?.message,
        codeError: valid?.error?.details?.find(
          (error) => error?.context?.label == "code"
        )?.message,
      });
    } else {
      setFormErros({
        emailError: undefined,
        passwordError: undefined,
        cPasswordError: undefined,
        codeError: undefined,
      });
      e.preventDefault();

      toast.loading("Loading...");

      try {
        const response = await loginInstance.forgetPassword(data);

        if (response.status === 200) {
          toast.dismiss();
          toast.success(`Password resetted successfully`);

          navigate("/login");
        }
      } catch (err) {
        toast.dismiss();
      }
    }
  };

  return (
    <div className="login-page">
      <form className="form_container" onSubmit={handleVerify}>
        <div className="logo_container">
          <img src={Logoimg} alt="riverBank" />
          <img src={Logo} alt="riverBankTxt" />
        </div>
        <div className="title_container">
          <p className="title">Resset Password</p>
        </div>
        <br />
        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Email
          </label>

          <EmailIcon />
          <input
            placeholder="Enter your email"
            title="Inpit title"
            name="email"
            type="text"
            value={data.email}
            onChange={handleChange}
            className="input_field"
            id="email_field"
          />
        </div>

        <div style={{ width: "100%" }}>
          {formErros?.emailError != undefined && (
            <p className="input-error-message">
              <span>
                <CloseCircleOutlined className="input-error-icon" />
              </span>
              {formErros?.emailError}
            </p>
          )}
        </div>

        <div className="input_container">
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
          <PassowrdIcon />

          <input
            placeholder="Password"
            title="Inpit title"
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
            className="input_field"
            id="password_field"
          />
        </div>

        <div style={{ width: "100%" }}>
          {formErros?.passwordError != undefined && (
            <p className="input-error-message">
              <span>
                <CloseCircleOutlined className="input-error-icon" />
              </span>
              {formErros?.passwordError}
            </p>
          )}
        </div>

        <div className="input_container">
          <label className="input_label" htmlFor="cPassword">
            Password Confirmation
          </label>
          <PassowrdIcon />

          <input
            placeholder="Password"
            title="Inpit title"
            name="cPassword"
            value={data.cPassword}
            onChange={handleChange}
            type="password"
            className="input_field"
            id="cPassword"
          />
        </div>

        <div style={{ width: "100%" }}>
          {formErros?.cPasswordError != undefined && (
            <p className="input-error-message">
              <span>
                <CloseCircleOutlined className="input-error-icon" />
              </span>
              {formErros?.cPasswordError}
            </p>
          )}
        </div>

        <div className="input_container">
          <label className="input_label" htmlFor="code">
            Code
          </label>
          <PassowrdIcon />

          <input
            placeholder="code"
            title="Inpit title"
            name="code"
            value={data.code}
            onChange={handleChange}
            type="number"
            className="input_field"
            id="code"
          />
        </div>

        <div style={{ width: "100%" }}>
          {formErros?.codeError != undefined && (
            <p className="input-error-message">
              <span>
                <CloseCircleOutlined className="input-error-icon" />
              </span>
              {formErros?.codeError}
            </p>
          )}
        </div>

        <button title="Send Email" type="submit" className="sign-in_btn">
          <span>Verify</span>
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
