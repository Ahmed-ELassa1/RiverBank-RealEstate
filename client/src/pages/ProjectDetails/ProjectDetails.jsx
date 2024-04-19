import React, { useEffect, useState } from "react";
import "./ProjectDetails.css";
import { useParams } from "react-router-dom";
import { ProjectsService } from "../../services/Projects/ProjectsService";
import {
  GlobalOutlined,
  LoadingOutlined,
  PhoneFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ContactUs from "../ContactUs/ContactUs";

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectInstance = new ProjectsService();

  const getProject = async () => {
    try {
      const response = await projectInstance.getProjectById(id);
      const data = await response.data.data;
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="details-page">
      {/* {loading && <LoadingOutlined className="loadingIndicator" />} */}
      <div className="blog bg">
        <h2>كمبوند سعادة التجمع الخامس COMPOUND SAADA NEW CAIRO</h2>
      </div>
      {!loading && (
        <div className="details-page-container">
          <div className="details-page-content-container">
            <div>
              <img
                src={data?.logo?.secure_url}
                alt={data?.title}
                className="projectImg"
              />
            </div>
            <div className="container">
              <h3 className="cityLabel">Details</h3>

              <div className="details-content">
                <div>
                  <p>Name: {data?.title}</p>
                  <span>
                    <GlobalOutlined /> Location: {data?.location}
                  </span>
                  <p>Description: {data?.description}</p>

                  <div className="featuresDetails">
                    <span>Features:</span>
                    <ul>
                      {data?.features?.map((item) => (
                        <li>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    Price: {data?.price}&nbsp;{data?.currency}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="details-page-sidebar">
            <div className="details-sidebar-contact-details">
              <div className="details-sidebar-contact-details-row">
                <p>
                  <PhoneFilled />
                  <span className="details-row-text">اتصل بنا على</span>
                  <span className="details-row-text">:</span>
                </p>
                <p className="details-row-text">{t("label.phoneNumber")}</p>
              </div>
              <div className="details-sidebar-contact-details-row">
                <p>
                  <WhatsAppOutlined />
                  <span className="details-row-text">أو عبر واتساب</span>
                  <span className="details-row-text">:</span>
                </p>
                <p className="details-row-text">{t("label.whatsAppNumber")}</p>
              </div>
              <div className="details-sidebar-contact-details-row">
                <p>
                  <PhoneFilled />
                  <span className="details-row-text">أو عبر بريدنا</span>
                  <span className="details-row-text">:</span>
                </p>
                <p className="details-row-text">{t("label.contactEmail")}</p>
              </div>
            </div>
            <div className="details-sidebar-form-container">
              <ContactUs />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
