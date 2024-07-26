import React from "react";
import Facade from "../../assets/facade.webp";
import { Link } from "react-router-dom";
import Arrow from "../../assets/arrow.png";
import "./Structure.css";

const Structure = () => {
  return (
    <section className="idea structure">
      <div className="container">
        <div className="ideaContent structureContent">
          <div className="idea-right strc">
            <img className="idea-img" src={Facade} alt="idea" />
          </div>

          <div className="idea-left">
            <h2 className=" text-white">
              <span className="bt_bb_headline_superheadline">STRUCTURE</span>
            </h2>
            <h2 className="ideaTitle">The Idea</h2>
            <p className="idea-desc">
              Each property is given individual consideration. Through a process
              of in-depth research and discovery we identify each property’s
              innate qualities. Guided by our philosophy we seek to enhance the
              singular characteristics presented in each property that are as
              particular. Organically grow the holistic world view of disruptive
              innovation.
            </p>
            <Link className="viewMore" to={"/"}>
              View More
              <span className="more-arrow">
                <img src={Arrow} alt="moreIdeas" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
