import React, { useState } from "react";
import Logo from "../../assets/logoTxt.png";
import Logoimg from "../../assets/logoImg.png";
import EmailIcon from "../../components/Icons/Email";
import PassowrdIcon from "../../components/Icons/Passowrd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { UsersService } from "../../services/Users/UsersService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import "./Login.css";

const Login = () => {
  const loginInstance = new UsersService();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "ahmedhamed2150@gmail.com",
    password: "123",
  });

  const [formErros, setFormErros] = useState({
    emailError: undefined,
    passwordError: undefined,
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
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;

    setData(cloned);
  };

  const handleLogin = async (e) => {
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
      e.preventDefault();

      setFormErros({
        emailError: undefined,
        passwordError: undefined,
      });

      toast.loading("Loading...");

      try {
        const response = await loginInstance.login(data);

        if (response?.status === 200) {
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("refreshToken", response?.data?.refToken);

          toast.dismiss();
          toast.success(`You are successfully logged in`);

          navigate("/dashboard/projects");
        }
      } catch (err) {
        toast.dismiss();
        toast.error("حدث خطا ,  برجاء المحاولة مجددا");
      }
    }
  };

  return (
    <div className="login-page">
      <form className="form_container" onSubmit={handleLogin}>
        <div className="logo_container">
          <img src={Logoimg} alt="riverBank" />
          <img src={Logo} alt="riverBankTxt" />
        </div>
        <div className="title_container">
          <p className="title">Login to your Account</p>
          <span className="subtitle">
            Get started with our app, just enter your account and enjoy the
            experience.
          </span>
        </div>
        <br />
        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Email
          </label>

          <EmailIcon />
          <input
            placeholder="name@mail.com"
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
        <button title="Sign In" type="submit" className="sign-in_btn">
          <span>Sign In</span>
        </button>

        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>

        {/* <LineIcon /> */}

        {/* <button title="Sign In" type="submit" className="sign-in_ggl">
          <span>Sign up</span>
        </button> */}
        <button
          title="Forgot Password?"
          type="button"
          className="sign-in_apl"
          onClick={() => navigate("/forgotPassword")}
        >
          <span>Forgot Password?</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
