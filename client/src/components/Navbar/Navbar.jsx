import {
  AppstoreOutlined,
  MailOutlined,
  PhoneFilled,
  PhoneOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Menu } from "antd";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logoImg.png";
import LogoTxt from "../../assets/logoTxt.png";
import Bars from "../../assets/menu.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState("/");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // #0A383D
  //#B07A12
  const items = [
    {
      label: t("home"),
      key: "",
    },
    {
      label: t("label.navbar.newCapital"),
      key: "cities/662abcb327f0cd662fdf0d38",
    },
    {
      label: t("label.navbar.newCairo"),
      key: "cities/newCairo",
    },
    {
      label: t("label.navbar.costalProjects"),
      //   icon: <AppstoreOutlined />,
      children: [
        {
          label: "الساحل الشمالي",
          key: "cities/northCoast",
        },
        {
          label: "العين السخنة",
          key: "cities/ainSokhna",
        },
        {
          label: "راس سدر",
          key: "cities/rasSedr",
        },
      ],
    },
    {
      label: t("developers"),
      key: "developers",
    },
    {
      label: t("blogs"),
      key: "blogs",
    },
    {
      label: <a href="tel:+1234567890">{t("label.phoneNumber")}</a>,
      key: "#footer",
      icon: <PhoneFilled />,
    },
  ];

  const onClick = (e) => {
    if (e.key === "#footer") {
      // Scroll to the footer section
      return;
    } else {
      setIsOpen(false);
      setCurrent(e.key);
      navigate(e.key);
    }
  };

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  });

  return (
    <>
      <div id="navbar" className={`navbar ${scroll ? "sticky" : ""}`}>
        <Link to="/">
          <div className="logo">
            <img className="logoTxt" src={LogoTxt} alt="riverBank" />
            <img src={Logo} alt="riverBank" />
          </div>
        </Link>

        <ConfigProvider
          theme={{
            token: {
              darkItemSelectedBg: "#B07A12",
              horizontalItemHoverColor: "#B07A12",
              horizontalItemSelectedColor: "#B07A12",
              itemSelectedColor: "#B07A12",
              colorPrimary: "#B07A12",
              colorSplit: "#B07A12",
              itemSelectedBg: "#B07A12",
              subMenuItemBg: "#B07A12",
              itemHoverBg: "#B07A12",
              itemActiveBg: "#B07A12",
            },
          }}
        >
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="navbar-menu-container"
            items={items}
            defaultSelectedKeys={["1", "calc", "projects"]}
            defaultOpenKeys={["sub1"]}
          />
        </ConfigProvider>

        <div>
          <button className="subscribe-btn" onClick={() => navigate("/login")}>
            {t("login")}
          </button>
        </div>
      </div>

      {/* Tablet */}
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
        <Menu
          // theme={theme}
          onClick={onClick}
          className="mob-menu"
          style={{
            width: "100%",
          }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
        {/* <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/cities" onClick={() => setIsOpen(false)}>
          Cities
        </Link>
        <Link to="/developers" onClick={() => setIsOpen(false)}>
          Developers
        </Link>
        <Link to="/projects" onClick={() => setIsOpen(false)}>
          Projects
        </Link>
        <Link to="/properties" onClick={() => setIsOpen(false)}>
          Properties
        </Link>
        <Link to="/blogs" onClick={() => setIsOpen(false)}>
          Blogs
        </Link>
        <Link to="/contactUs" onClick={() => setIsOpen(false)}>
          Contact Us
        </Link> */}
      </div>
    </>
  );
};

export default Navbar;
