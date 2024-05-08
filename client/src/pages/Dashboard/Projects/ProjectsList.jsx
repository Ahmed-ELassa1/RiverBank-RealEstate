import React, { useEffect, useRef, useState } from "react";
import { ProjectsService } from "../../../services/Projects/ProjectsService";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";

const ProjectsList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPaegNumber] = useState(1);

  const token = localStorage.getItem("token");
  const projectInstance = new ProjectsService(token);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            بحث
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            حدف
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            فلترة
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            اغلاق
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = async (_id) => {
    toast.loading("Loading...");

    try {
      const response = await projectInstance.deleteProject(_id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`Deleted Successfully`);

        getAllProjects();
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };

  const columns = [
    {
      title: "العنوان",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "المدن",
      dataIndex: "cityId",
      key: "cityId",
      width: "20%",
      ...getColumnSearchProps("cityId"),
      sorter: (a, b) => a.cityId.length - b.cityId.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "نوع المشروع",
      dataIndex: "projectType",
      key: "projectType",
      ...getColumnSearchProps("projectType"),
      sorter: (a, b) => a.projectType.length - b.projectType.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "الاجراء",
      key: "operation",
      fixed: "right",
      width: 100,
      render: ({ _id }) => (
        <div className="actions">
          <button onClick={() => handleDelete(_id)}>
            <DeleteOutlined style={{ fontSize: "20px", color: "#b07a12" }} />
          </button>
          <Link to={`view/${_id}`}>
            <EditOutlined style={{ fontSize: "20px", color: "#b07a12" }} />
          </Link>
        </div>
      ),
    },
  ];

  const getAllProjects = async () => {
    try {
      const response = await projectInstance.getProjects({
        page: pageNumber,
        size: 10,
      });
      const data = await response.data.data;
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [pageNumber]);

  return (
    <div>
      <h2 style={{ margin: "20px 0" }}>المشروعات</h2>

      <div className="form-input-btn">
        <button className="subscribe-btn" onClick={() => navigate("create")}>
          أضف جديد
        </button>
      </div>

      <Table columns={columns} dataSource={data} pagination={false} />

      {data.length > 0 && (
        <div className="pagination">
          {pageNumber > 1 && (
            <button onClick={() => setPaegNumber((prev) => prev - 1)}>
              السابق
            </button>
          )}
          {pageNumber >= 1 && data.length === 10 && (
            <button onClick={() => setPaegNumber((prev) => prev + 1)}>
              التالي
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
