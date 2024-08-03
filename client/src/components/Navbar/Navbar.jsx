import { PhoneFilled } from "@ant-design/icons";
import { ConfigProvider, Menu } from "antd";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logoImg.png";
import LogoTxt from "../../assets/logoTxt.png";
import Bars from "../../assets/menu.png";
import { useTranslation } from "react-i18next";
import { CityService } from "../../services/City/CityService";

const Navbar = (props) => {
  const { isOpen, setIsOpen } = props;
  const { t } = useTranslation();
  const [current, setCurrent] = useState("/");
  const cityService = new CityService();
  // const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const items = [
    {
      label: t("home"),
      key: "",
    },
    {
      label: t("label.navbar.newCapital"),
      key: `city/${getCityId("العاصمة-الإدارية-الجديدة")}`,
    },
    {
      label: t("label.navbar.newCairo"),
      key: `city/${getCityId("القاهرة-الجديدة")}`,
    },
    {
      label: t("label.navbar.costalProjects"),
      children: [
        {
          label: "الساحل الشمالي",
          key: `city/${getCityId("الساحل-الشمالي")}`,
        },
        {
          label: "العين السخنة",
          key: `city/${getCityId("العين-السخنة")}`,
        },
        {
          label: "راس سدر",
          key: `city/${getCityId("راس-سدر")}`,
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
  const getCities = async () => {
    try {
      const response = await cityService.getCities();
      const data = await response.data.data;
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };
  function getCityId(navBarCity) {
    const selectedCity = data?.find((city) => {
      return city?.slug == navBarCity;
    });
    return selectedCity ? selectedCity?._id : "";
  }
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
  useEffect(() => {
    getCities();
  }, []);
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
        <div>
          <button
            className="subscribe-btn"
            onClick={() => {
              setIsOpen(false);
              navigate("/login");
            }}
          >
            {t("login")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
