import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ClientRequestService } from "../../../services/ClientRequest/ClientRequestService";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";

const ClientInfoList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const clientInstance = new ClientRequestService(token);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [pageNumber, setPaegNumber] = useState(1);

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
      const response = await clientInstance.deleteClientRequest(_id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(` Deleted Successfully`);

        getAllClientInfo();
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };
  const columns = [
    {
      title: "اسم المستخدم",
      dataIndex: "userName",
      key: "userName",
      ...getColumnSearchProps("userName"),
      sorter: (a, b) => a.userName.length - b.userName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "البريد الالكتروني",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "رقم الجوال",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
      sorter: (a, b) => a.phone.length - b.phone.developers,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "الرسالة",
      dataIndex: "message",
      key: "message",
      ...getColumnSearchProps("message"),
    },
    {
      title: "الاجراء",
      width: "10%",
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

  const getAllClientInfo = async () => {
    try {
      toast.loading("Loading...");
      const response = await clientInstance.getClientRequest({
        page: pageNumber,
        size: 10,
      });
      const data = await response.data.data;
      toast.dismiss();
      setLoading(false);
      setData(data);
    } catch (err) {
      toast.dismiss();
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClientInfo();
  }, [pageNumber]);

  return (
    <div>
      <h2 style={{ margin: "20px 0" }}>طلبات العملاء</h2>

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

export default ClientInfoList;
