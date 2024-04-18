import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/logoImg.png";
import LogoTxt from "../../assets/logoTxt.png";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Breadcrumb, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./DashLayout.css";
import { UsersService } from "../../services/Users/UsersService";
import { toast } from "react-toastify";

const DashLayout = () => {
  const token = localStorage.token;
  const loginInstance = new UsersService(token);
  const navigate = useNavigate();

  const handleLogout = async () => {
    toast.loading("Loading...");

    try {
      const response = await loginInstance.logout();

      if (response?.status == 200) {
        localStorage.clear();

        toast.dismiss();
        toast.success(`You are successfully logged out`);

        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.dismiss();
    }
  };
  return (
    <div className="dashLayout">
      <div className={`navbar`}>
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="riverBank" />
            <img className="logoTxt" src={LogoTxt} alt="riverBank" />
          </div>
        </Link>

        <div>
          <button className="subscribe-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dash-container">
        <div className="sidebar">
          <ul className="side-list">
            <li>
              <Link className="side-item" to={"properties"}>
                properties
              </Link>
            </li>

            <li>
              <Link className="side-item" to={"projects"}>
                Projects
              </Link>
            </li>

            <li>
              <Link className="side-item" to={"blogs"}>
                blogs{" "}
              </Link>
            </li>

            <li>
              <Link className="side-item" to={"clientInfo"}>
                Client Requests
              </Link>
            </li>

            <li>
              <Link className="side-item" to={"developers"}>
                Developers
              </Link>
            </li>
          </ul>
        </div>

        <div className="dash-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
