import React from "react";
import "./Footer.css";
import Logo from "../../assets/logo-01.png";
import { Link } from "react-router-dom";
import FooterSkewed from "./FooterSkewed";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterSkewed />

      <div className="footer-content container">
        <div className="footer-logo">
          <div className="ft-logo">
            <img src={Logo} alt="riverBank" />
          </div>
          {/* <p>
            Interse is ipsum dolor sit amet, consectet adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p> */}
        </div>
        <div className="links">
          <h5>Other Pages</h5>
          <ul>
            <li>
              <Link>About us</Link>
            </li>
            <li>
              <Link>Blog</Link>
            </li>
            <li>
              <Link>Developers</Link>
            </li>
            <li>
              <Link>Cities</Link>
            </li>
            <li>
              <Link>In press</Link>
            </li>
          </ul>
        </div>
        <div className="links">
          <h5>Quick Links</h5>
          <ul>
            <li>
              <Link>About us</Link>
            </li>
            <li>
              <Link>Blog</Link>
            </li>
            <li>
              <Link>Developers</Link>
            </li>
            <li>
              <Link>Cities</Link>
            </li>
            <li>
              <Link>In press</Link>
            </li>
          </ul>
        </div>
        <div className="links">
          <h5>Contact Details</h5>
          <ul>
            <li>
              <Link>Cairo, Egypt</Link>
            </li>
            <li>
              <Link to={"mailto:support@gmail.com"}>support@gmail.com</Link>
            </li>
            <li>
              <Link to={"tele: 123456789"}>123-456-789</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
