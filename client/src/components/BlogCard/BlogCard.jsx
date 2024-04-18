import React, { useState } from "react";
import { Col, Divider, Drawer, Row } from "antd";
import "./BlogCard.css";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const BlogCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="blogCard" onClick={showDrawer}>
        {item?.mainImage ? (
          <div className="blogImg">
            <img src={item?.mainImage?.secure_url} alt="blog" />
          </div>
        ) : (
          <></>
        )}

        <div className="blogContent">
          <h4 className="title">{item?.title}</h4>
          <span className="date">
            {new Date(item?.createdAt).toUTCString()}
          </span>
          <p className="desc">{item?.description}</p>
          <button
            className="continue"
            onClick={showDrawer}
            key={`a-${item?._id}`}
          >
            continue reading
          </button>
        </div>
      </div>

      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          Blog Details
        </p>
        <p className="site-description-item-profile-p">Main</p>

        {item?.mainImage ? (
          <div className="blogImg">
            <img src={item?.mainImage?.secure_url} alt="blog" />
          </div>
        ) : (
          <></>
        )}

        <Row>
          <Col span={12}>
            <DescriptionItem title="Title" />
          </Col>
          <Col span={12}>
            <DescriptionItem title={item?.title} />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <DescriptionItem title="Date" />
          </Col>
          <Col span={12}>
            <DescriptionItem title={new Date(item?.createdAt).toUTCString()} />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <DescriptionItem title="Description" />
          </Col>
          <Col span={12}>
            <DescriptionItem title={item?.description} />
          </Col>
        </Row>

        <Divider />
      </Drawer>
    </>
  );
};

export default BlogCard;
