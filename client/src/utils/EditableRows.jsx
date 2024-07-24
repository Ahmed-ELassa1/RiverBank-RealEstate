import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table } from "antd";
import ReactQuill from "react-quill";
import { formats, modules } from "../data/sharedData";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        save();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <div ref={wrapperRef}>
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} مطلوب.`,
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            ref={inputRef}
            value={form.getFieldValue(dataIndex)}
            onChange={(value) => form.setFieldsValue({ [dataIndex]: value })}
            modules={modules}
            formats={formats}
            style={{
              height: "150px",
              width: "100%",
              background: "#fff",
              overflow: "auto",
            }}
          />
        </Form.Item>
        <Button onClick={save} type="primary">
          Save
        </Button>
      </div>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const EditableRows = ({ dataSource, setDataSource, defaultColumns }) => {
  const [count, setCount] = useState(2);

  const handleAdd = () => {
    const newData = {
      key: count,
      question: `جديد`,
      answer: "جديد",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          margin: "16px 0px",
        }}
        size="large"
      >
        أضف جديد
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default EditableRows;
