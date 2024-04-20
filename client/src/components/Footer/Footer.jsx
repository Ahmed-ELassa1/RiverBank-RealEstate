import React from "react";
import "./Footer.css";
// import Logo from "../../assets/logoImg";
import { Link } from "react-router-dom";
import FooterSkewed from "./FooterSkewed";
import ContactUs from "../../pages/ContactUs/ContactUs";
import Logo from "../../assets/logoImg.png";
import LogoTxt from "../../assets/logoTxt.png";
import { useTranslation } from "react-i18next";
import {
  FacebookFilled,
  MailFilled,
  PhoneFilled,
  PushpinOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer id="footer" className="footer">
      {/* <FooterSkewed /> */}

      <div className="footer-content container">
        <div className="footer-logo-container">
          <div className="footer-logo">
            <img className="logoTxt" src={LogoTxt} alt="riverBank" />
            <img src={Logo} alt="riverBank" />
          </div>{" "}
          <p>{t("label.footer-logo-text")}</p>
        </div>
        <div className="links">
          <h5>{t("label.footer.projectLinks.mainTitle")}</h5>
          <ul>
            <li>
              <Link>اويا تاورز العاصمة الادارية</Link>
            </li>
            <li>
              <Link>ريفان العاصمة الإدارية الجديدة</Link>
            </li>
            <li>
              <Link>الموندو العاصمة الإدارية الجديدة</Link>
            </li>
            <li>
              <Link>المقصد ريزيدنس العاصمة الإدارية الجديدة</Link>
            </li>
            <li>
              <Link>اتيكا العاصمة الإدارية الجديدة</Link>
            </li>
            <li>
              <Link>كمبوند انترادا العاصمة الادارية الجديدة</Link>
            </li>
          </ul>
        </div>
        <div className="links">
          <h5>{t("بيانات التواصل")}</h5>
          <ul>
            <li>
              <PushpinOutlined />
              14
              <span>{t("label.locationDetails")}</span>
            </li>
            <li>
              <PhoneFilled />
              <span>{t("label.phoneNumber")}</span>
            </li>
            <li>
              <WhatsAppOutlined />
              <span>{t("label.whatsAppNumber")}</span>
            </li>
            <li>
              <MailFilled />
              <span>{t("label.contactEmail")}</span>
            </li>
            <li className="footer-social-media-container">
              <a
                className="contact-social-Media-links"
                target="_blank"
                href="https://www.twitter.com"
                rel="noreferrer"
              >
                <TwitterOutlined />
              </a>
              <a
                className="contact-social-Media-links"
                target="_blank"
                href="https://www.youtube.com"
                rel="noreferrer"
              >
                <YoutubeOutlined />
              </a>
              <a
                className="contact-social-Media-links"
                target="_blank"
                href="https://www.facebook.com"
                rel="noreferrer"
              >
                <FacebookFilled />
              </a>
            </li>
          </ul>
        </div>
        <ContactUs />
      </div>
    </footer>
  );
};

export default Footer;
