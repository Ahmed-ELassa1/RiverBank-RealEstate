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
import img1 from "../../assets/contact.jpg";
const ProjectDetails = ({ isSticky }) => {
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
      {/* {loading && ( */}
      <div className="details-page-container">
        <div className="details-page-content-container">
          <div>
            <img
              // src={data?.logo?.secure_url}
              src={img1}
              alt={data?.title}
              className="projectImg"
            />
          </div>
          {/* questions */}
          <div className="project-details-questions-container">
            <h3 className="questionLabel">
              {t("label.projectDetails.header")}
            </h3>
            <div className="project-details-questions-content">
              <p className="project-questions-row">
                <span>
                  أين يقع المشروع<strong>:</strong>
                </span>
                <span>مدينه المستقبل سيتي</span>
              </p>
              <p className="project-questions-row">
                <span>
                  من هي الشركه المالكه للمشروع<strong>:</strong>
                </span>
                <span>شركه كونر ستون للتطوير العقاري</span>
              </p>
              <p className="project-questions-row">
                <span>
                  ما هو رقم المبيعات<strong>:</strong>
                </span>
                <span>01127814880</span>
              </p>
            </div>
          </div>
          {/*project content summery*/}
          <div className="project-details-content-headers">
            <p>{t("label.projectDetails.pageContent")}</p>
            <ol>
              <li>
                <a href="">
                  موقع كمبوند ريد المستقبل سيتي Compound RED Mostakbal City
                </a>
              </li>
              <li>
                <a href="">
                  تصميم كمبوند ريد المستقبل سيتي Compound RED Mostakbal City{" "}
                </a>
              </li>
              <li>
                <a href="">
                  مساحه كمبوند ريد المستقبل سيتي Compound RED Mostakbal City{" "}
                </a>
              </li>
            </ol>
          </div>
          {/* main description */}
          <div className="project-details-main-desc-section">
            {t("label.projectDetails.mainDescription")}
          </div>
          {/* details sections */}
          <div className="details-descriptions-section-container">
            <h3>موقع كمبوند ريد المستقبل سيتي Compound RED Mostakbal City</h3>
            <img src={img1} />
            <p>
              اقتنصت شركه كونر ستون أهم موقع استراتيجي بقلب مدينه المستقبل، كما
              حرصت علي أختيار أفضل قطعه أرض لأن الموقع هو العامل الأساسي لنجاح
              أي مشروع، كذلك يعد الموقع هو المؤشر لنجاح تشغيل المشروع علي المدي
              البعيد أو فشل تشغيل المشروع رغم كافه المقاومات، كما انطلقت الشركه
              المطوره بأختيار الموقع لأنه الأساس في أختيار العميل أو المستثمر
              للمشروع بناء علي موقعه الحيوي، كذلك اهتمت أيضا الشركه المطوره بقرب
              المشروع من أهم المدن النابضه الحيويه، أيضا يسهل الوصول الي
              الكمبوند عن طريق أهم الطرق الرئيسيه، كما يقترب الكمبوند من العديد
              من المدارس والمستشفيات، كذلك المناطق الخدميه والترفيهيه، كذلك
              وصولا الي الأماكن التعليميه العاليه. الأماكن القريبه من كمبوند ريد
              مستقبل سيتي: يقترب الكمبوند من أهم المحاور والطرق الرئيسيه مثل
              المحور الأقليمي والدائري الأوسطي. كما يقترب الكمبوند من طريق
              السويس لذلك يسهل الوصول الي مشروع كونر ستون بسهوله. كذلك يبعد
              الكمبوند عن العاصمه الاداريه بحوالي 15 دقيقه فقط. أيضا يقترب
              الكمبوند من التجمع الخامس بحوالي 10 دقائق فقط. كما يبعد الكمبوند
              من مول كايرو فيستيفال سيتي CFC MALL حوالي 5 دقائق فقط. كذلك يقترب
              الكمبوند من مدينتي والرحاب وكذلك مدينه الشروق وبدر. أيضا يبعد
              الكمبوند عن الجامعه الأمريكيه AUC بحوالي 5 دقائق فقط. كما يقترب
              الكمبوند من مطار القاهره الدولي. كذلك يبعد الكمبوند عن حي المال
              والأعمال بمسافه قليله جدا. أيضا يمكنك الوصول الي الكمبوند بسهوله
              من طريق العين السخنه. كما يجاور الكمبوند محطه القطار السريع
              المونوريل. كذلك يبعد الكمبوند عن مول 5A بأقل من 10 دقائق. أيضا
              يقترب الكمبوند من الحي الحكومي بالعاصمه الاداريه. كما يبعد
              الكمبوند عن مصر الجديده ومدينه نصر بدقائق معدوده. كذلك يجاور
              الكمبوند العديد من أهم المشروعات السكنيه والخدميه كمبوند اليفا
              مونتن فيو مستقبل سيتي، كذلك كمبوند البوسكو سيتي.
            </p>
          </div>
        </div>

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
      {/* )} */}
    </div>
  );
};

export default ProjectDetails;
