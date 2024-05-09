import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BlogsServices } from "../../../services/Blogs/BlogsServices";
import { useNavigate } from "react-router-dom";
import { Button, Input, Popconfirm, Select, Upload } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import joi from "joi";
import { CityService } from "../../../services/City/CityService";
import EditableRows from "../../../utils/EditableRows";
import { ProjectTypesService } from "../../../services/ProjectTypesService/ProjectTypesService";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../data/sharedData";

const CreateCity = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const cityInstance = new CityService(token);
  const [dataSource, setDataSource] = useState([]);

  const [data, setData] = useState({
    title: "",
    projectType: "",
    description: "",
  });
  const [projectTypeOptions, setProjectTypeOptions] = useState([]);

  const [formErros, setFormErros] = useState({
    titleError: undefined,
    projectTypeError: undefined,
    descriptionError: undefined,
  });

  function validation() {
    const schema = joi.object({
      title: joi.string().required().messages({
        "string.empty": "Title is a required field",
        "string.base": "Title is a required field",
        "any.required": "Title is a required field",
      }),
      projectType: joi.string().required().messages({
        "string.empty": "Project Type is a required field",
        "string.base": "Project Type is a required field",
        "any.required": "Project Type is a required field",
      }),
      description: joi.string().required().messages({
        "string.empty": "Project Type is a required field",
        "string.base": "Project Type is a required field",
        "any.required": "Project Type is a required field",
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
        projectTypeError: valid?.error?.details?.find(
          (error) => error?.context?.label === "projectType"
        )?.message,
      });
    } else {
      toast.loading("Loading...");

      try {
        const cityQuestions = dataSource?.map((item) => {
          return { question: item.question, answer: item.answer };
        });
        const response = await cityInstance.createCity({
          ...data,
          cityQuestions,
        });

        if (response.status === 201) {
          toast.dismiss();
          toast.success(`${data.title} created Successfully`);

          navigate("/dashboard/cities");
        }
      } catch (err) {
        toast.dismiss();
        toast.error(err);
      }
    }
  };

  const getAllProjectTypes = async () => {
    try {
      const proIntance = new ProjectTypesService(token);
      const response = await proIntance.getProjectTypes({
        page: 1,
        size: 10,
      });
      const data = await response?.data?.data?.map((item) => {
        return {
          label: item?.title,
          value: item?._id,
        };
      });
      setProjectTypeOptions(data);
      // setLoading(false);
    } catch (err) {
      // setLoading(false);
    }
  };

  const handleDeleteRow = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultDetailsColumns = [
    {
      title: "السؤال",
      dataIndex: "question",
      // width: "30%",
      editable: true,
    },
    {
      title: "الاجابة",
      dataIndex: "answer",
      editable: true,
    },

    {
      title: "الاجراء",
      width: "10%",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="هل انت متأكد من الحذف"
            onConfirm={() => handleDeleteRow(record.key)}
          >
            <a>حذف</a>
          </Popconfirm>
        ) : null,
    },
  ];

  useEffect(() => {
    getAllProjectTypes();
  }, []);

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
        <p>الوصف</p>
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
        <p>نوع المشروع</p>
        <Select
          name="projectType"
          value={data.projectType}
          onChange={(key) => setData({ ...data, projectType: key })}
          options={projectTypeOptions}
          size="large"
          style={{ width: "100%" }}
        />
        {formErros?.projectTypeError != undefined && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            {formErros?.projectTypeError}
          </p>
        )}
      </div>

      <div className="form-input">
        <p>أسئلة عن المدينة</p>
        <EditableRows
          dataSource={dataSource}
          setDataSource={setDataSource}
          defaultColumns={defaultDetailsColumns}
        />
        {dataSource.length === 0 && (
          <p className="input-error-message">
            <span>
              <CloseCircleOutlined className="input-error-icon" />
            </span>
            City Questions is a required field
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateCity;
