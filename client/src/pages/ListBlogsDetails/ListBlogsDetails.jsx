import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LoadingOutlined,
  PhoneFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ContactUs from "../ContactUs/ContactUs";
import { BlogsServices } from "../../services/Blogs/BlogsServices";
import { toast } from "react-toastify";
const ListBlogsDetails = ({ isSticky }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const blogService = new BlogsServices();

  const getBlogDetails = async () => {
    try {
      toast.loading("Loading ....");
      const response = await blogService.getBlogById(id);
      const data = await response.data.data;
      setLoading(false);
      toast.dismiss();
      setData(data);
    } catch (err) {
      toast.dismiss();
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogDetails();
  }, [id]);
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop + 120,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="details-page">
      <div className="blog bg">
        <h2>{data?.title}</h2>
      </div>
      <div className="details-page-container">
        {loading && <LoadingOutlined className="loadingIndicator" />}
        {!loading ? (
          <div className="details-page-content-container">
            <div>
              <img
                src={
                  Array.isArray(data?.mainImage)
                    ? data?.mainImage[0]?.secure_url
                    : data?.mainImage?.secure_url
                }
                alt={data?.title}
                className="projectImg"
              />
            </div>
            {/*project content summery*/}
            {data?.blogContent?.length > 0 && (
              <div className="project-details-content-headers">
                <p>{t("label.projectDetails.pageContent")}</p>
                <ol>
                  {data?.blogContent?.map((blogContent, i) => {
                    return (
                      <li key={i}>
                        <a
                          href={`/#/projects/${id}/#section-${i}`}
                          onClick={(e) => scrollToSection(e, `section-${i}`)}
                        >
                          {blogContent}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
            {/* main description */}
            <div className="project-details-main-desc-section">
              {/* {data?.mainDescription} */}
              <div
                style={{ padding: "0 30px" }}
                dangerouslySetInnerHTML={{
                  __html: data?.mainDescription,
                }}
              />
            </div>
            {/* details sections */}
            <div className="details-descriptions-section-container">
              {data?.blogDescriptions?.length > 0 &&
                data?.blogDescriptions?.map((blogDescription, i) => {
                  return (
                    <div id={`section-${i}`} key={i}>
                      {data?.subImages?.length > i && (
                        <img
                          src={data?.subImages[i]?.secure_url}
                          alt={data?.title}
                        />
                      )}
                      {/* <p>{blogDescription}</p> */}
                      <div
                        style={{ padding: "0 30px" }}
                        dangerouslySetInnerHTML={{
                          __html: blogDescription,
                        }}
                      />
                    </div>
                  );
                })}
            </div>
            {data?.blogQuestions?.length && (
              <div className="details-question-about-project">
                {data?.blogQuestions?.map((blogQuestion, i) => {
                  return (
                    <div key={i} className="details-question-about-project-row">
                      <h3>{blogQuestion?.question}</h3>
                      <p>{blogQuestion?.answer}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {/* sidebar */}
        <div
          id="details-sidebar"
          className={`details-page-sidebar ${isSticky ? "sidebar-sticky" : ""}`}
        >
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
    </div>
  );
};

export default ListBlogsDetails;
