import React, { useState } from "react";
// import Contact from "../../assets/subscribe.svg";
import "./Subscribe.css";
import { ClientRequestService } from "../../services/ClientRequest/ClientRequestService";
import { toast } from "react-toastify";
import Contact from "../../assets/ASQ.jpeg";
import { useNavigate } from "react-router-dom";
const Subscribe = () => {
  const Navigate = useNavigate();


  return (
    <section className="subscribe">
      <div className="container">
        <div className="subscribe-content">
          <h5 className="sub-title">Need Expert Advice?</h5>
          <div className="subscription-below-section">
            <p className="sub-description">
              Fill out the form and one of our property consultants will contact
              you.
            </p>
            <button
              onClick={() => Navigate("./contactUs")}
              className="subscription-contactus-btn"
            >
              contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
