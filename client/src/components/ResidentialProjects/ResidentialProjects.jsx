import React from "react";
import "./ResidentialProjects.css";
import { Link } from "react-router-dom";
import F1 from "../../assets/fp1.jpg";
import F2 from "../../assets/fp2.jpg";
import F3 from "../../assets/fp3.jpg";
import F4 from "../../assets/fp4.jpeg";
import Person from "../../assets/pposter1.png";
import { useTranslation } from "react-i18next";

const ResidentialProjects = () => {
  const { t } = useTranslation();
  return (
    <section className="residentialProjects">
      {/* <div className="skewed"></div> */}
      <div className="container">
        <h3 className="container cityLabel">
          {t("home.section.residentialProjects")}
        </h3>
        <div className="residentialProjects-content">
          <div className="residentialProjects-card">
            <div className="residentialProjects_property">
              <div className="thumb">
                <img
                  className="img-whp w-100 h-100 cover"
                  src={F4}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <p className="residentialProjects-card-name">
                    القاهرة الجديدة
                  </p>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  {/* <p className="text-thm">Apartment</p> */}
                  <h4>
                    <Link to="/listing-details-v1/1">Luxury Family Home</Link>
                  </h4>
                  {/* <p>
                    <span className="flaticon-placeholder"></span>
                    1421 San Pedro St, Los Angeles, CA 900015
                  </p> */}
                  {/* <ul className="prop_details mb0">
                    <li className="list-inline-item">
                      <Link to="#">Beds: 1</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">Baths: 1</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">SqFt: 8280</Link>
                    </li>
                  </ul> */}
                </div>
                {/* <div className="fp_footer">
                  <ul className="fp_meta float-start mb0">
                    <li className="list-inline-item">
                      <Link to="/agent-v2">
                        <img src={Person} alt="pposter1.png" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/agent-v2">Mo Hani</Link>
                    </li>
                  </ul>
                  <div className="fp_pdate float-end">1 year ago</div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="residentialProjects-card">
            <div className="residentialProjects_property">
              <div className="thumb">
                <img
                  className="img-whp w-100 h-100 cover"
                  src={F4}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <p className="residentialProjects-card-name">
                    القاهرة الجديدة
                  </p>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  {/* <p className="text-thm">Apartment</p> */}
                  <h4>
                    <Link to="/listing-details-v1/1">Luxury Family Home</Link>
                  </h4>
                  {/* <p>
                    <span className="flaticon-placeholder"></span>
                    1421 San Pedro St, Los Angeles, CA 900015
                  </p> */}
                  {/* <ul className="prop_details mb0">
                    <li className="list-inline-item">
                      <Link to="#">Beds: 1</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">Baths: 1</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">SqFt: 8280</Link>
                    </li>
                  </ul> */}
                </div>
                {/* <div className="fp_footer">
                  <ul className="fp_meta float-start mb0">
                    <li className="list-inline-item">
                      <Link to="/agent-v2">
                        <img src={Person} alt="pposter1.png" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/agent-v2">Mo Hani</Link>
                    </li>
                  </ul>
                  <div className="fp_pdate float-end">1 year ago</div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="residentialProjects-card">
            <div className="residentialProjects_property">
              <div className="thumb">
                <img
                  className="img-whp w-100 h-100 cover"
                  src={F4}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <p className="residentialProjects-card-name">
                    القاهرة الجديدة
                  </p>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  {/* <p className="text-thm">Apartment</p> */}
                  <h4>
                    <Link to="/listing-details-v1/1">Luxury Family Home</Link>
                  </h4>
                  {/* <p>
                    <span className="flaticon-placeholder"></span>
                    1421 San Pedro St, Los Angeles, CA 900015
                  </p> */}
                  {/* <ul className="prop_details mb0">
                    <li className="list-inline-item">
                      <Link to="#">Beds: 1</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">Baths: 1</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">SqFt: 8280</Link>
                    </li>
                  </ul> */}
                </div>
                {/* <div className="fp_footer">
                  <ul className="fp_meta float-start mb0">
                    <li className="list-inline-item">
                      <Link to="/agent-v2">
                        <img src={Person} alt="pposter1.png" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/agent-v2">Mo Hani</Link>
                    </li>
                  </ul>
                  <div className="fp_pdate float-end">1 year ago</div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="residentialProjects-card">
            <div className="residentialProjects_property">
              <div className="thumb">
                <img
                  className="img-whp w-100 h-100 cover"
                  src={F4}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <p className="residentialProjects-card-name">
                    القاهرة الجديدة
                  </p>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  {/* <p className="text-thm">Apartment</p> */}
                  <h4>
                    <Link to="/listing-details-v1/1">Luxury Family Home</Link>
                  </h4>
                  {/* <p>
                    <span className="flaticon-placeholder"></span>
                    1421 San Pedro St, Los Angeles, CA 900015
                  </p> */}
                  {/* <ul className="prop_details mb0">
                    <li className="list-inline-item">
                      <Link to="#">Beds: 1</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">Baths: 1</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">SqFt: 8280</Link>
                    </li>
                  </ul> */}
                </div>
                {/* <div className="fp_footer">
                  <ul className="fp_meta float-start mb0">
                    <li className="list-inline-item">
                      <Link to="/agent-v2">
                        <img src={Person} alt="pposter1.png" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/agent-v2">Mo Hani</Link>
                    </li>
                  </ul>
                  <div className="fp_pdate float-end">1 year ago</div>
                </div> */}
              </div>
            </div>
          </div>
          <Link className="button-seeAll-link">{t("button.seeAll")}</Link>
        </div>
      </div>
    </section>
  );
};

export default ResidentialProjects;
