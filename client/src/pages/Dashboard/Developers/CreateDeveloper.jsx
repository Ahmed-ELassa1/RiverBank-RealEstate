import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DevelopersService } from "../../../services/Developers/DevelopersService";
import { Button, Input, Popconfirm, Upload } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import joi from "joi";
import EditableRows from "../../../utils/EditableRows";
import { formats, modules } from "../../../data/sharedData";
import ReactQuill from "react-quill";

const CreateDeveloper = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState("");

  const token = localStorage.getItem("token");
  const developerInstance = new DevelopersService(token);
  const [fileList, setFileList] = useState([]);
  const [contentDataSource, setContentDataSource] = useState([]);
  const [quesDataSource, setQuesDataSource] = useState([]);
  const [descDataSource, setDescDataSource] = useState([]);

  const defaultDetailsColumns = [
    {
      title: "المحتوي",
      dataIndex: "question",
      // width: "30%",
      editable: true,
    },

    {
      title: "الاجراء",
      width: "10%",
      dataIndex: "operation",
      render: (_, record) =>
        contentDataSource.length >= 1 ? (
          <Popconfirm
            title="هل انت متأكد من الحذف"
            onConfirm={() => handleDeleteRow(record.key)}
          >
            <a>حذف</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const defaultDescColumns = [
    {
      title: "الوصف",
      dataIndex: "question",
      // width: "30%",
      editable: true,
    },

    {
      title: "الاجراء",
      width: "10%",
      dataIndex: "operation",
      render: (_, record) =>
        contentDataSource.length >= 1 ? (
          <Popconfirm
            title="هل انت متأكد من الحذف"
            onConfirm={() => handleDeleteDescription(record.key)}
          >
            <a>حذف</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const defaultQuesColumns = [
    {
      title: "السؤال",
      dataIndex: "question",
      // width: "30%",
      editable: true,
    },
    {
      title: "الاجابة",
      dataIndex: "answer",
      // width: "30%",
      editable: true,
    },
    {
      title: "الاجراء",
      width: "10%",
      dataIndex: "operation",
      render: (_, record) =>
        contentDataSource.length >= 1 ? (
          <Popconfirm
            title="هل انت متأكد من الحذف"
            onConfirm={() => handleDeleteQuestion(record.key)}
          >
            <a>حذف</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDeleteQuestion = (key) => {
    const newData = quesDataSource.filter((item) => item.key !== key);
    setQuesDataSource(newData);
  };

  const handleDeleteRow = (key) => {
    const newData = contentDataSource.filter((item) => item.key !== key);
    setContentDataSource(newData);
  };

  const handleDeleteDescription = (key) => {
    const newData = descDataSource.filter((item) => item.key !== key);
    setDescDataSource(newData);
  };

  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [formErros, setFormErros] = useState({
    titleError: undefined,
    descriptionError: undefined,
  });

  const logoProps = {
    onRemove: (file) => {
      setMainImage(null);
      setMainImageError("");
    },
    beforeUpload: (file) => {
      setMainImage(file);
      setMainImageError("");

      return false;
    },
    mainImage,
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  function validation() {
    const schema = joi.object({
      title: joi.string().required().messages({
        "string.empty": "Title is a required field",
        "string.base": "Title is a required field",
        "any.required": "Title is a required field",
      }),
      description: joi.string().required().messages({
        "string.empty": "description is a required field",
        "string.base": "description is a required field",
        "any.required": "description is a required field",
      }),
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;

    setData(cloned);
  };

  const handleCreate = async () => {
    const valid = validation();

    if (valid?.error?.details) {
      setFormErros({
        titleError: valid?.error?.details?.find(
          (error) => error?.context?.label === "title"
        )?.message,
        descriptionError: valid?.error?.details?.find(
          (error) => error?.context?.label === "description"
        )?.message,
      });
    } else if (!mainImage) {
      setMainImageError("Main Image is a reqired field");
      setFormErros({
        titleError: undefined,
      });
      return;
    } else {
      setFormErros({
        titleError: undefined,
      });

      toast.loading("Loading...");

      const formData = new FormData();

      fileList?.forEach((feat) => {
        formData.append("subImages", feat);
      });

      contentDataSource?.forEach((feat) => {
        formData.append("developerContent", feat.question);
      });

      descDataSource?.forEach((feat, i) => {
        formData.append(`developerDescriptions[${[i]}]`, feat.question);
      });

      quesDataSource?.forEach((feat, i) => {
        formData.append(`developerQuestions[${[i]}][question]`, feat.question);
        formData.append(`developerQuestions[${[i]}][answer]`, feat.answer);
      });

      formData.append("mainImage", mainImage);
      formData.append("title", data.title);
      formData.append("mainDescription", data.description);

      try {
        const response = await developerInstance.createDeveloper(formData);

        if (response.status === 201) {
          toast.dismiss();
          toast.success(`${data.title} created Successfully`);

          navigate("/dashboard/developers");
        }
      } catch (err) {
        toast.dismiss();
        toast.error(err);
      }
    }
  };

  return (
    <div>
      <div className="form-input-btn">
        <button type="submit" onClick={handleCreate} className="subscribe-btn">
          اضافة
        </button>
      </div>

      <div className="form-input">
        <p>العنوان</p>
        <Input
          name="title"
          value={data.title}
          onChange={handleChange}
          size="large"
        />
        {formErros?.titleError != undefined && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            {formErros?.titleError}
          </p>
        )}
      </div>

      <div className="form-input">
        <p>الوصف الرئيسي</p>
        {/* <Input
          name="description"
          value={data.description}
          onChange={handleChange}
          size="large"
        /> */}
        <ReactQuill
          theme="snow"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e })}
          modules={modules}
          formats={formats}
          style={{ height: "250px", background: "#fff", overflow: "auto" }}
        />
        {formErros?.descriptionError != undefined && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            {formErros?.descriptionError}
          </p>
        )}
      </div>

      <div className="form-input">
        <p>محتوي المطور</p>
        <EditableRows
          dataSource={contentDataSource}
          setDataSource={setContentDataSource}
          defaultColumns={defaultDetailsColumns}
        />
        {contentDataSource.length === 0 && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            Developer Content is a required field
          </p>
        )}
      </div>

      <div className="form-input">
        <p>استفسارات حول المطور</p>
        <EditableRows
          dataSource={quesDataSource}
          setDataSource={setQuesDataSource}
          defaultColumns={defaultQuesColumns}
        />
        {quesDataSource.length === 0 && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            Developer Questions is a required field
          </p>
        )}
      </div>

      <div className="form-input">
        <p>وصف المطور</p>
        <EditableRows
          dataSource={descDataSource}
          setDataSource={setDescDataSource}
          defaultColumns={defaultDescColumns}
        />
        {descDataSource.length === 0 && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            Developer Description is a required field
          </p>
        )}
      </div>

      <div className="form-input">
        <p> الصورة الرئيسية</p>
        <Upload {...logoProps} maxCount={1} listType="picture">
          <Button icon={<UploadOutlined />}>اختر صورة</Button>
        </Upload>

        {mainImageError !== "" && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            {mainImageError}
          </p>
        )}
      </div>

      <div className="form-input">
        <p>الصور الفرعية</p>
        <Upload {...props} multiple listType="picture">
          <Button icon={<UploadOutlined />}>اختر صور</Button>
        </Upload>
      </div>
    </div>
  );
};

export default CreateDeveloper;
