import React from "react";
import "./BlogsSection.css";
import img1 from "../../assets/blog1.jpeg";
import img2 from "../../assets/blog2.jpeg";
import img3 from "../../assets/blog3.jpeg";
import { KeyOutlined } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
const BlogsSection = () => {
  // init Swiper:
  // const swiper = new Swiper(".swiper", {
  //   // configure Swiper to use modules
  //   modules: [Navigation, Pagination],
  // });
  const blogs = [
    {
      image: img1,
      title: "Best cities",
      description: "choose your unit at best locations",
    },
    {
      image: img2,
      title: "green areas",
      description: "we offer you the quality of life that you need",
    },
    {
      image: img3,
      title: "path walking",
      description: "feel free to go out with family",
    },
  ];
  return (
    <section className="BlogsSection">
      <div className="container">
        <h3 className="cityLabel">PROPERTY AMENITIES</h3>
        {/* <p className="amini-title">Separate Title Residences</p> */}
        {/* <div className="aminit-content">
          <div className="aminit-card">
            <div className="am-icon">
              <KeyOutlined />
            </div>
            <div className="am-text">
              <p>Reception and security</p>
            </div>
          </div>

          <div className="aminit-card">
            <div className="am-icon">
              <KeyOutlined />
            </div>
            <div className="am-text">
              <p>Professional Maintaiance</p>
            </div>
          </div>

          <div className="aminit-card">
            <div className="am-icon">
              <KeyOutlined />
            </div>
            <div className="am-text">
              <p>Technical Equipment</p>
            </div>
          </div>

          <div className="aminit-card">
            <div className="am-icon">
              <KeyOutlined />
            </div>
            <div className="am-text">
              <p>Smart House System</p>
            </div>
          </div>
        </div>

        <div className="aminit-content">
          <div className="aminit-card">
            <div className="am-icon">
              <KeyOutlined />
            </div>
            <div className="am-text">
              <p>Nearby Shopping Area</p>
            </div>
          </div>

          <div className="aminit-card">
            <div className="am-icon">
              <KeyOutlined />
            </div>
            <div className="am-text">
              <p>Roof Top Swmimming Pool</p>
            </div>
          </div>

          <div className="aminit-card">
            <div className="am-icon">
              <KeyOutlined />
            </div>
            <div className="am-text">
              <p>Spa, wellness, and sport gym</p>
            </div>
          </div>

          <div className="aminit-card">
            <div className="am-icon">
              <KeyOutlined />
            </div>
            <div className="am-text">
              <p>+150 personal garage spots</p>
            </div>
          </div>
        </div> */}
        <Swiper
          className="mySwiper"
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={2}
          loop={true}
          pagination={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            770: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
        >
          {blogs?.map((element, index) => (
            <SwiperSlide
              key={element.title}
              className="blog-section-cursoul-container"
              // style={{ backgroundImage: `url(${element?.image})` }}
            >
              <img
                className="blog-section-cursoul-img"
                src={element?.image}
                alt={element?.title}
              />
              <div className="blog-section-cursoul-text-container">
                <p className="blog-section-cursoul-title">{element?.title}</p>
                <p className="blog-section-cursoul-desc">
                  {element?.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogsSection;
