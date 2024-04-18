/* eslint-disable jsx-a11y/anchor-is-valid */
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import "./Properties.css";
import { Button, Divider, Dropdown, Space } from "antd";
import useToken from "antd/es/theme/useToken";
import { ArrowsAltOutlined, LoadingOutlined } from "@ant-design/icons";
import PropsCard from "../../components/PropsCard/PropsCard";
import { PropertiesServices } from "../../services/properties/PropertiesServices";

const Properties = () => {
  const [data, setData] = useState([]);
  const [sortingValue, setSortingValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const propertyInstance = new PropertiesServices();

  const menuStyle = {
    boxShadow: "none",
  };

  const handleSort = async (val) => {
    setSortingValue(val);
    setLoading(true);
    try {
      const response = await propertyInstance.getProperties({
        sort: val,
      });
      const data = await response.data.data;
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <button
          onClick={() => handleSort("price")}
          className={
            sortingValue === "price" ? "subscribe-btn-active" : "subscribe-btn"
          }
        >
          Price: Low To High
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => handleSort("-price")}
          className={
            sortingValue === "-price" ? "subscribe-btn-active" : "subscribe-btn"
          }
        >
          Price: High To Low
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          onClick={() => handleSort("area")}
          className={
            sortingValue === "area" ? "subscribe-btn-active" : "subscribe-btn"
          }
        >
          Area: Low To High
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <button
          onClick={() => handleSort("-area")}
          className={
            sortingValue === "-area" ? "subscribe-btn-active" : "subscribe-btn"
          }
        >
          Area: High To Low
        </button>
      ),
    },
  ];

  const onSearch = async (value, _e, info) => {
    if (searchValue.trim() !== "") {
      setLoading(true);
      try {
        const response = await propertyInstance.getProperties({
          search: searchValue,
        });
        const data = await response.data.data;
        setLoading(false);
        setData(data);
      } catch (err) {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const response = await propertyInstance.getProperties();
        const data = await response.data.data;
        setLoading(false);
        setData(data);
      } catch (err) {
        setLoading(false);
      }
    }
  };

  const getAllProperties = async () => {
    try {
      const response = await propertyInstance.getProperties();
      const data = await response.data.data;
      setLoading(false);

      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <div className="properties">
      <div className="props bg">
        <h2>Properties</h2>
      </div>

      <div className="container">
        <h3 className="heading">Preleased commercial properties for sale</h3>

        <div className="props-search">
          <Search
            placeholder="Search ..."
            onSearch={onSearch}
            onKeyUp={onSearch}
            className="search-field"
            // style={{ width: "60%" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {/* <div className="props-btns">
            <button className="subscribe-btn resale">Resale</button>
            <button className="subscribe-btn new">New</button>
          </div> */}
        </div>

        <div className="props-content">
          <div className="content-head">
            <p className="title">
              Showing <span className="props-count">{data?.length}</span>{" "}
              properties
            </p>

            <Dropdown
              menu={{
                items,
              }}
              dropdownRender={(menu) => (
                <div>
                  {React.cloneElement(menu, {
                    style: menuStyle,
                  })}
                  <Divider
                    style={{
                      margin: 0,
                    }}
                  />
                  <Space
                    style={{
                      padding: 8,
                    }}
                  >
                    <Button type="default" onClick={() => handleSort("")}>
                      Reset
                    </Button>
                  </Space>
                </div>
              )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Sort By
                  <ArrowsAltOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          {loading && <LoadingOutlined className="loadingIndicator" />}

          {/* Cards */}
          <div className="content-cards">
            {!loading &&
              data?.length > 0 &&
              data?.map((item) => (
                <div key={item._id} className="props-card">
                  <PropsCard item={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
