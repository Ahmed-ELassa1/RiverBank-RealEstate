import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectsService } from "../../../services/Projects/ProjectsService";
import joi from "joi";
import EditableRows from "../../../utils/EditableRows";
import TextArea from "antd/es/input/TextArea";
import { CityService } from "../../../services/City/CityService";
import { DevelopersService } from "../../../services/Developers/DevelopersService";
import { ProjectTypesService } from "../../../services/ProjectTypesService/ProjectTypesService";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../data/sharedData";

const CreateProject = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState("");

  const token = localStorage.getItem("token");
  const projectInstance = new ProjectsService(token);
  const [fileList, setFileList] = useState([]);
  const [contentDataSource, setContentDataSource] = useState([]);
  const [quesDataSource, setQuesDataSource] = useState([]);
  const [descDataSource, setDescDataSource] = useState([]);
  const [detailsDataSource, setDetailsDataSource] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [developersOptions, setDevelopersOptions] = useState([]);
  const [projectTypesOptions, setProjectTypesOptions] = useState([]);

  const defaultContentColumns = [
    {
      title: "المحتوي",
      dataIndex: "question",
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
  const defaultDetailsColumns = [
    {
      title: "الوصف",
      dataIndex: "question",
      editable: true,
    },
    {
      title: "الخاصية",
      dataIndex: "answer",
      editable: true,
    },
    {
      title: "الاجراء",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) =>
        detailsDataSource.length >= 1 ? (
          <Popconfirm
            title="هل انت متأكد من الحذف"
            onConfirm={() => handleDeleteDetails(record.key)}
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
      editable: true,
    },
    {
      title: "الاجراء",
      width: "10%",
      dataIndex: "operation",
      render: (_, record) =>
        descDataSource.length >= 1 ? (
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
        quesDataSource.length >= 1 ? (
          <Popconfirm
            title="هل انت متأكد من الحذف"
            onConfirm={() => handleDeleteQuestion(record.key)}
          >
            <a>حذف</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDeleteDetails = (key) => {
    const newData = detailsDataSource.filter((item) => item.key !== key);
    setDetailsDataSource(newData);
  };

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

  const [data, setData] = useState({
    title: "",
    description: "",
    slug: "",
    developerId: "",
    cityId: "",
    projectType: "",
    seoData: "",
    whatsAppNumber: "",
    callToAction: "",
    contactMessage: "",
  });

  const [formErros, setFormErros] = useState({
    titleError: undefined,
    descriptionError: undefined,
    slugError: undefined,
    developerIdError: undefined,
    cityIdError: undefined,
    whatsAppNumberError: undefined,
    callToActionError: undefined,
    contactMessageError: undefined,
  });

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

  const handleChange = (e) => {
    const cloned = { ...data };
    cloned[e.target.name] = e.target.value;

    setData(cloned);
  };

  function validation() {
    const schema = joi.object({
      title: joi.string().required().messages({
        "string.empty": "Title is a required field",
        "string.base": "Title is a required field",
        "any.required": "Title is a required field",
      }),
      description: joi.string().required().messages({
        "string.empty": "Description is a required field",
        "string.base": "Description is a required field",
        "any.required": "Description is a required field",
      }),
      slug: joi.string().required().messages({
        "string.empty": "slug is a required field",
        "string.base": "slug is a required field",
        "any.required": "slug is a required field",
      }),
      developerId: joi.string().required().messages({
        "string.empty": "developer is a required field",
        "string.base": "developer is a required field",
        "any.required": "developer is a required field",
      }),
      cityId: joi.string().required().messages({
        "string.empty": "city is a required field",
        "string.base": "city is a required field",
        "any.required": "city is a required field",
      }),
      whatsAppNumber: joi.string().required().messages({
        "string.empty": "whatsAppNumber is a required field",
        "string.base": "whatsAppNumber is a required field",
        "any.required": "whatsAppNumber is a required field",
      }),
      callToAction: joi.string().required().messages({
        "string.empty": "callToAction is a required field",
        "string.base": "callToAction is a required field",
        "any.required": "callToAction is a required field",
      }),
      contactMessage: joi.string().required().messages({
        "string.empty": "contactMessage is a required field",
        "string.base": "contactMessage is a required field",
        "any.required": "contactMessage is a required field",
      }),

      seoData: joi.optional(),
      projectType: joi.optional(),
    });
    const valid = schema.validate(data, { abortEarly: false });
    return valid;
  }

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
        slugError: valid?.error?.details?.find(
          (error) => error?.context?.label === "slug"
        )?.message,
        contactMessageError: valid?.error?.details?.find(
          (error) => error?.context?.label === "contactMessage"
        )?.message,
        callToActionError: valid?.error?.details?.find(
          (error) => error?.context?.label === "callToAction"
        )?.message,
        whatsAppNumberError: valid?.error?.details?.find(
          (error) => error?.context?.label === "whatsAppNumber"
        )?.message,
        cityIdError: valid?.error?.details?.find(
          (error) => error?.context?.label === "cityId"
        )?.message,
        developerIdError: valid?.error?.details?.find(
          (error) => error?.context?.label === "developerId"
        )?.message,
      });
    } else {
      if (!mainImage) {
        setMainImageError("Main Image is a reqired field");
        return;
      } else {
        setMainImageError("");
      }

      setFormErros({
        titleError: undefined,
        descriptionError: undefined,
      });

      toast.loading("Loading...");

      const formData = new FormData();

      fileList?.forEach((feat) => {
        formData.append("subImages", feat);
      });

      contentDataSource?.forEach((feat) => {
        formData.append("projectContent", feat.question);
      });

      quesDataSource?.forEach((feat, i) => {
        formData.append(`projectQuestions[${[i]}][question]`, feat.question);
        formData.append(`projectQuestions[${[i]}][answer]`, feat.answer);
      });

      detailsDataSource?.forEach((feat, i) => {
        formData.append(`projectDetails[${[i]}][question]`, feat.question);
        formData.append(`projectDetails[${[i]}][answer]`, feat.answer);
      });

      descDataSource?.forEach((feat, i) => {
        formData.append(`projectDescriptions[${[i]}]`, feat.question);
      });

      formData.append("title", data.title);
      formData.append("mainDescription", data.description);
      formData.append("mainImage", mainImage);
      formData.append("seoData", data.seoData);
      formData.append("whatsAppNumber", data.whatsAppNumber);
      formData.append("callToAction", data.callToAction);
      formData.append("contactMessage", data.contactMessage);
      formData.append("slug", data.slug);
      formData.append("cityId", data.cityId);
      formData.append("projectType", data.projectType);
      formData.append("developerId", data.developerId);

      try {
        const response = await projectInstance.createProject(formData);

        if (response?.status === 201) {
          toast.dismiss();
          toast.success(`${data.title} created Successfully`);

          navigate("/dashboard/projects");
        }
      } catch (err) {
        toast.dismiss();
        toast.error(err);
      }
    }
  };

  const onCityChange = (key) => {
    setData({ ...data, cityId: key });
  };

  const onDeveloperChange = (key) => {
    setData({ ...data, developerId: key });
  };

  const onProjectTypeChange = (key) => {
    setData({ ...data, projectType: key });
  };

  function getItems(key, label, options, onChange) {
    return {
      key,
      label,
      children: (
        <Select
          style={{
            width: "100%",
          }}
          onChange={onChange}
          options={options}
        />
      ),
    };
  }

  const getCities = async () => {
    try {
      const cityInstance = new CityService(token);
      const response = await cityInstance.getCities();

      const data = await response?.data?.data?.map((item) => {
        return {
          label: item?.title,
          value: item?._id,
        };
      });
      setCityOptions(data);
    } catch (err) {
      toast.error(err);
    }
  };

  const getDevelopers = async () => {
    try {
      const developerInstance = new DevelopersService(token);
      const response = await developerInstance.getDevelopers();

      const data = await response?.data?.data?.map((item) => {
        return {
          label: item?.title,
          value: item?._id,
        };
      });
      setDevelopersOptions(data);
    } catch (err) {
      toast.error(err);
    }
  };

  const getProjectTypes = async () => {
    try {
      const projectInstance = new ProjectTypesService(token);
      const response = await projectInstance.getProjectTypes();

      const data = await response?.data?.data?.map((item) => {
        return {
          label: item?.title,
          value: item?._id,
        };
      });
      setProjectTypesOptions(data);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getCities();
    getProjectTypes();
    getDevelopers();
  }, []);

  return (
    <div>
      <div className="form-input-btn">
        <button className="subscribe-btn" onClick={handleCreate}>
          اضف
        </button>
      </div>

      <div className="edit-layout">
        <div className="edit-content">
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
            <p> الوصف الرئيسي</p>
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

          <div className="form-input" style={{ marginTop: "30px" }}>
            <h2>أسئلة حول المشروع</h2>
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
                Project Questions is a required field
              </p>
            )}
          </div>

          <div className="form-input" style={{ marginTop: "30px" }}>
            <h2> محتوي المشروع</h2>
            <EditableRows
              dataSource={contentDataSource}
              setDataSource={setContentDataSource}
              defaultColumns={defaultContentColumns}
            />
            {contentDataSource.length === 0 && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                Project Content is a required field
              </p>
            )}
          </div>

          <div className="form-input" style={{ marginTop: "30px" }}>
            <h2>تفاصيل المشروع</h2>
            <EditableRows
              dataSource={detailsDataSource}
              setDataSource={setDetailsDataSource}
              defaultColumns={defaultDetailsColumns}
            />
            {detailsDataSource.length === 0 && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                Project Details is a required field
              </p>
            )}
          </div>

          <div className="form-input" style={{ marginTop: "30px" }}>
            <h2>وصف المشروع</h2>
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
                Project Description is a required field
              </p>
            )}
          </div>

          <div className="form-input" style={{ marginTop: "30px" }}>
            <h2> حول SEO</h2>

            <div className="form-input">
              <p>الاسم اللطيف (slug)</p>
              <Input
                name="slug"
                value={data.slug}
                onChange={handleChange}
                size="large"
              />
              {formErros?.slugError != undefined && (
                <p className="input-error-message">
                  <span>
                    <CloseCircleOutlined className="input-error-icon" />
                  </span>
                  {formErros?.slugError}
                </p>
              )}
            </div>

            <p>بيانات SEO</p>
            <TextArea
              name="seoData"
              value={data.seoData}
              onChange={handleChange}
              size="large"
              rows={4}
            />
          </div>

          <div className="form-input">
            <p>اختر صورة</p>
            <Upload {...logoProps} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>

            {mainImageError && (
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
        {/* Side items */}
        <div className="edit-side">
          <div className="edit-item">
            <p>المدن</p>
            <Select
              style={{
                width: "100%",
              }}
              onChange={onCityChange}
              options={cityOptions}
            />
            {formErros?.cityIdError != undefined && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {formErros?.cityIdError}
              </p>
            )}
          </div>

          <div className="edit-item">
            <p>المطورين</p>

            <Select
              style={{
                width: "100%",
              }}
              onChange={onDeveloperChange}
              options={developersOptions}
            />
            {formErros?.developerIdError != undefined && (
              <p className="input-error-message">
                <span>
                  <CloseCircleOutlined className="input-error-icon" />
                </span>
                {formErros?.developerIdError}
              </p>
            )}
          </div>

          <div className="edit-item">
            <p>نوع العقار</p>

            <Select
              style={{
                width: "100%",
              }}
              onChange={onProjectTypeChange}
              options={projectTypesOptions}
            />
          </div>

          <div className="edit-item">
            <p>Click To Chat</p>

            <div className="form-input">
              <p>Whatsapp Number</p>
              <Input
                name="whatsAppNumber"
                value={data.whatsAppNumber}
                onChange={handleChange}
                size="large"
              />
              {formErros?.whatsAppNumberError != undefined && (
                <p className="input-error-message">
                  <span>
                    <CloseCircleOutlined className="input-error-icon" />
                  </span>
                  {formErros?.whatsAppNumberError}
                </p>
              )}
            </div>

            <div className="form-input">
              <p>Call To Action</p>
              <Input
                name="callToAction"
                value={data.callToAction}
                onChange={handleChange}
                size="large"
              />
              {formErros?.callToActionError != undefined && (
                <p className="input-error-message">
                  <span>
                    <CloseCircleOutlined className="input-error-icon" />
                  </span>
                  {formErros?.callToActionError}
                </p>
              )}
            </div>

            <div className="form-input">
              <p>Pre-filled Message</p>
              <TextArea
                name="contactMessage"
                value={data.contactMessage}
                onChange={handleChange}
                size="large"
                rows={5}
              />
              {formErros?.contactMessageError != undefined && (
                <p className="input-error-message">
                  <span>
                    <CloseCircleOutlined className="input-error-icon" />
                  </span>
                  {formErros?.contactMessageError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
