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
