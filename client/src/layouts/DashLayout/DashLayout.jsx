import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/logoImg.png";
import LogoTxt from "../../assets/logoTxt.png";

import { UsersService } from "../../services/Users/UsersService";
import { toast } from "react-toastify";
import Bars from "../../assets/menu.png";

import "./DashLayout.css";

const DashLayout = () => {
  const token = localStorage.token;
  const loginInstance = new UsersService(token);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
            تسجيل خروج
          </button>
        </div>
      </div>

      {/* START TABLET MODE */}
      <div className="menu-bars">
        <img
          src={Logo}
          width={30}
          alt="logo"
          className="bars"
          onClick={() => {
            setIsOpen(false);
            navigate("/");
          }}
        />

        <img
          src={Bars}
          alt="logo"
          className="bars"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div className={`navMob ${isOpen ? "active" : ""}`}>
        <NavLink
          active
          to="projects"
          className="side-item"
          onClick={() => setIsOpen(false)}
        >
          المشروعات
        </NavLink>
        <NavLink
          to="blogs"
          className="side-item"
          onClick={() => setIsOpen(false)}
        >
          المقالات
        </NavLink>
        <NavLink
          to="clientInfo"
          className="side-item"
          onClick={() => setIsOpen(false)}
        >
          طلبات العملاء
        </NavLink>
        <NavLink
          to="developers"
          className="side-item"
          onClick={() => setIsOpen(false)}
        >
          المطورين
        </NavLink>
        <NavLink
          to="cities"
          className="side-item"
          onClick={() => setIsOpen(false)}
        >
          المدن
        </NavLink>
        <NavLink
          to="projectTypes"
          className="side-item"
          onClick={() => setIsOpen(false)}
        >
          أنواع المشروعات
        </NavLink>
      </div>
      {/* END TABLET MODE */}

      <div className="dash-container">
        <div className="sidebar">
          <ul className="side-list">
            {/* <li>
              <Link className="side-item" to={"properties"}>
                العقارات
              </Link>
            </li> */}

            <li>
              <NavLink active className="side-item" to={"projects"}>
                المشروعات
              </NavLink>
            </li>

            <li>
              <NavLink className="side-item" to={"blogs"}>
                المقالات
              </NavLink>
            </li>

            <li>
              <NavLink className="side-item" to={"clientInfo"}>
                طلبات العملاء
              </NavLink>
            </li>

            <li>
              <NavLink className="side-item" to={"developers"}>
                المطورين
              </NavLink>
            </li>

            <li>
              <NavLink className="side-item" to={"cities"}>
                المدن
              </NavLink>
            </li>

            <li>
              <NavLink className="side-item" to={"projectTypes"}>
                أنواع المشروعات
              </NavLink>
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
