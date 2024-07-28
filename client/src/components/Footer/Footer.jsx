import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import ContactUs from "../../pages/ContactUs/ContactUs";
import Logo from "../../assets/logoImg.png";
import LogoTxt from "../../assets/logoTxt.png";
import { useTranslation } from "react-i18next";
import {
  MailFilled,
  PhoneFilled,
  PushpinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import { Tooltip } from "antd";

const Footer = () => {
  const { t } = useTranslation();
  const projectService = new ProjectsService();
  const [projectTitles, setProjectTitles] = useState([]);
  const [gettingData, setGettingData] = useState(true);

  async function getOneCityTitles() {
    setProjectTitles([]);
    const response = await projectService.getProjects();
    const data = response?.data?.data;
    const newCapitalProjects = data?.filter((project) => {
      return project?.cityId === "العاصمة-الإدارية-الجديدة";
    });
    const newData = newCapitalProjects
      ?.map((project) => {
        return { title: project?.title, id: project?._id };
      })
      ?.slice(0, 5);
    setGettingData(false);
    setProjectTitles(newData);
  }
  useEffect(() => {
    getOneCityTitles();
  }, [gettingData]);
  return (
    <footer id="footer" className="footer">
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
            {projectTitles?.length > 0
              ? projectTitles?.map((project) => {
                  return (
                    <li>
                      <Tooltip
                        placement="bottom"
                        title={project?.title}
                        color="#a7a7a7"
                        style={{ color: "#fff" }}
                      >
                        <Link to={`/projects/${project?.id}`}>{`${project?.title
                          ?.split(" ")
                          ?.slice(0, 4)
                          ?.join(" ")} ...`}</Link>
                      </Tooltip>
                    </li>
                  );
                })
              : "لا توجد مشاريع في الوقت الحالي. لكن لا تقلق، نعمل بجدّ لإضافة المزيد من المشاريع في أقرب وقت ممكن!"}
          </ul>
        </div>
        <div className="links">
          <h5>{t("بيانات التواصل")}</h5>
          <ul className="contact-details-list"> 
            <li>
              <PushpinOutlined />
              
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
          </ul>
        </div>
        <ContactUs />
      </div>
    </footer>
  );
};

export default Footer;
