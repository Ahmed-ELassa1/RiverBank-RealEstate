import React, { useState } from "react";
import Logo from "../../assets/logoTxt.png";
import Logoimg from "../../assets/logoImg.png";
import EmailIcon from "../../components/Icons/Email";
import { UsersService } from "../../services/Users/UsersService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import { CloseCircleOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const loginInstance = new UsersService();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const [formErros, setFormErros] = useState({
    emailError: undefined,
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
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;

    setData(cloned);
  };

  const handleSendEmail = async (e) => {
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
      });
    } else {
      setFormErros({
        emailError: undefined,
      });

      toast.loading("Loading...");

      try {
        const response = await loginInstance.sendCode(data);

        if (response?.status === 200) {
          toast.dismiss();
          toast.success(`Please check your email and enter the code`);

          navigate("/updatePassword", { state: { email: data.email } });
        }
      } catch (err) {
        toast.error("invalid Email");
      }
    }
  };

  return (
    <div className="login-page">
      <form className="form_container" onSubmit={handleSendEmail}>
        <div className="logo_container">
          <img src={Logoimg} alt="riverBank" />
          <img src={Logo} alt="riverBankTxt" />
        </div>
        <div className="title_container">
          <p className="title">Forgot Password</p>
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

        <button title="Send Email" type="submit" className="sign-in_btn">
          <span>Send Email</span>
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
