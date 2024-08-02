import { CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Popconfirm, Select } from "antd";
import joi from "joi";
import { CityService } from "../../../services/City/CityService";
import { ProjectTypesService } from "../../../services/ProjectTypesService/ProjectTypesService";
import EditableRows from "../../../utils/EditableRows";
import { formats, modules } from "../../../data/sharedData";
import ReactQuill from "react-quill";

const CityDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

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

    if (JSON.stringify(cloned) === JSON.stringify(data)) {
      setIsEdited(false);
    } else {
      setIsEdited(true);
      setData(cloned);
    }
  };

  const getCityById = async () => {
    try {
      const response = await cityInstance.getCityById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        title: data?.title,
        description: data?.description,
        projectType: data?.projectType,
      });
      setDataSource(
        data?.cityQuestions?.map((item) => {
          return {
            key: item?._id,
            question: item?.question,
            answer: item?.answer,
          };
        })
      );
    } catch (err) {
      setLoading(false);
      toast.error(err);
    }
  };

  const handleSave = async () => {
    if (isEdited) {
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

          const response = await cityInstance.EditCity(id, {
            ...data,
            cityQuestions,
          });

          if (response.status === 201) {
            toast.dismiss();
            toast.success(`${data.title} updated Successfully`);

            navigate("/dashboard/cities");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err);
        }
      }
    } else {
      navigate("/dashboard/cities");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await cityInstance.deleteCity(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.title} Deleted Successfully`);

        navigate("/dashboard/cities");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
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
    } catch (err) {
    }
  };

  const handleDeleteRow = (key) => {
    setIsEdited(true);

    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultDetailsColumns = [
    {
      title: "السؤال",
      dataIndex: "question",
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
    getCityById();
    getAllProjectTypes();
  }, []);

  return (
    <div>
      <div className="form-input-btn">
        <button
          onClick={handleDelete}
          className="subscribe-btn delete"
          style={{ backgroundColor: "rgb(203 60 60)" }}
        >
          مسح
        </button>
        <button type="submit" onClick={handleSave} className="subscribe-btn">
          حفظ
        </button>
      </div>

      {loading && <LoadingOutlined className="loadingIndicator" />}

      {!loading && (
        <>
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
            <ReactQuill
              theme="snow"
              value={data.description}
              onChange={(e) => {
                setIsEdited(true);
                setData({ ...data, description: e });
              }}
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
              setIsEdited={setIsEdited}
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
        </>
      )}
    </div>
  );
};

export default CityDetails;
