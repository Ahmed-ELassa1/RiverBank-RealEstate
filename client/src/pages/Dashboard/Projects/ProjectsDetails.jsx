import React, { useEffect, useState } from "react";
import { ProjectsService } from "../../../services/Projects/ProjectsService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Select, Tabs, Upload } from "antd";
import joi from "joi";
import TextArea from "antd/es/input/TextArea";
import { CityService } from "../../../services/City/CityService";
import { ProjectTypesService } from "../../../services/ProjectTypesService/ProjectTypesService";
import { DevelopersService } from "../../../services/Developers/DevelopersService";
import EditableRows from "../../../utils/EditableRows";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../data/sharedData";

const ProjectsDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [developersOptions, setDevelopersOptions] = useState([]);
  const [projectTypesOptions, setProjectTypesOptions] = useState([]);
  const [fileList, setFileList] = useState([]);

  const [contentDataSource, setContentDataSource] = useState([]);
  const [quesDataSource, setQuesDataSource] = useState([]);
  const [descDataSource, setDescDataSource] = useState([]);
  const [detailsDataSource, setDetailsDataSource] = useState([]);
  const [mainImgObj, setMainImgObj] = useState();
  const [subImgsObj, setSubImgsObj] = useState();

  const token = localStorage.getItem("token");
  const projectInstance = new ProjectsService(token);

  const [data, setData] = useState({
    title: "",
    mainDescription: "",
    slug: "",
    developerId: "",
    cityId: "",
    projectType: "",
    seoData: "",
    whatsAppNumber: "",
    callToAction: "",
    contactMessage: "",
    mainImage: "",
    subImages: [],
  });

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setIsEdited(true);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      setIsEdited(true);
      return false;
    },
    fileList,
  };

  const logoProps = {
    onRemove: (file) => {
      setMainImage(null);
      setMainImageError("");
      setData({ ...data, mainImage: "" });

      setIsEdited(true);
    },
    beforeUpload: (file) => {
      setMainImage(file);
      setMainImageError("");
      setData({ ...data, mainImage: URL.createObjectURL(file) });

      setIsEdited(true);

      return false;
    },
    mainImage,
  };

  const [formErros, setFormErros] = useState({
    titleError: undefined,
    mainDescriptionError: undefined,
  });

  const defaultContentColumns = [
    {
      title: "المحتوي",
      dataIndex: "question",
      width: "30%",
      editable: true,
    },

    {
      title: "الاجراء",
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
      width: "30%",
      editable: true,
    },
    {
      title: "الخاصية",
      dataIndex: "answer",
      width: "30%",
      editable: true,
    },
    {
      title: "الاجراء",
      dataIndex: "operation",
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
      width: "30%",
      editable: true,
    },
    {
      title: "الاجراء",
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
      width: "30%",
      editable: true,
    },
    {
      title: "الاجابة",
      dataIndex: "answer",
      width: "30%",
      editable: true,
    },
    {
      title: "الاجراء",
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
    setIsEdited(true);

    const newData = detailsDataSource.filter((item) => item.key !== key);
    setDetailsDataSource(newData);
  };

  const handleDeleteQuestion = (key) => {
    setIsEdited(true);

    const newData = quesDataSource.filter((item) => item.key !== key);
    setQuesDataSource(newData);
  };

  const handleDeleteRow = (key) => {
    setIsEdited(true);

    const newData = contentDataSource.filter((item) => item.key !== key);
    setContentDataSource(newData);
  };

  const handleDeleteDescription = (key) => {
    setIsEdited(true);

    const newData = descDataSource.filter((item) => item.key !== key);
    setDescDataSource(newData);
  };

  function validation() {
    const schema = joi.object({
      title: joi.string().required().messages({
        "string.empty": "Title is a required field",
        "string.base": "Title is a required field",
        "any.required": "Title is a required field",
      }),
      mainDescription: joi.string().required().messages({
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
      subImages: joi.optional(),
      mainImage: joi.optional(),
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

  const getProjectById = async () => {
    try {
      const response = await projectInstance.getProjectById(id);

      await getCities();
      await getProjectTypes();
      await getDevelopers();

      const data = await response.data.data;
      setLoading(false);

      setData({
        title: data?.title,
        mainDescription: data?.mainDescription,
        mainImage: data?.mainImage?.secure_url,
        slug: data?.slug,
        developerId: data?.developerId,
        cityId: data?.cityId,
        projectType: data?.projectType,
        seoData: data?.seoData,
        whatsAppNumber: data?.whatsAppNumber,
        callToAction: data?.callToAction,
        contactMessage: data?.contactMessage,
        subImages: data?.subImages,
      });

      setMainImgObj(data.mainImage);
      setSubImgsObj(data.subImages);
      setContentDataSource(
        data?.projectContent?.map((item) => {
          return { key: Math.random(), question: item };
        })
      );
      setDescDataSource(
        data?.projectDescriptions?.map((item) => {
          return { key: Math.random(), question: item };
        })
      );
      setQuesDataSource(
        data?.projectQuestions?.map((item) => {
          return {
            key: item?._id,
            question: item.question,
            answer: item?.answer,
          };
        })
      );
      setDetailsDataSource(
        data?.projectDetails?.map((item) => {
          return {
            key: item?._id,
            question: item.question,
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
        console.log(valid);
        setFormErros({
          titleError: valid?.error?.details?.find(
            (error) => error?.context?.label == "title"
          )?.message,
          mainDescriptionError: valid?.error?.details?.find(
            (error) => error?.context?.label == "mainDescription"
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
        setFormErros({
          titleError: undefined,
          mainDescriptionError: undefined,
        });
        setMainImageError("");

        toast.loading("Loading...");

        const formData = new FormData();

        if (fileList.length > 0 && subImgsObj?.length > 0) {
          fileList?.forEach((feat) => {
            formData.append("subImages", feat);
          });

          subImgsObj?.forEach((feat, i) => {
            formData.append(`subImages[${[i]}][public_id]`, feat.public_id);
            formData.append(`subImages[${[i]}][secure_url]`, feat.secure_url);
          });
        } else if (fileList.length > 0 && subImgsObj?.length === 0) {
          fileList?.forEach((feat) => {
            formData.append("subImages", feat);
          });
        } else {
          subImgsObj?.forEach((feat, i) => {
            formData.append(`subImages[${[i]}][public_id]`, feat.public_id);
            formData.append(`subImages[${[i]}][secure_url]`, feat.secure_url);
          });
        }

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
        formData.append("mainDescription", data.mainDescription);

        if (mainImage) {
          formData.append("mainImage", mainImage);
        } else {
          formData.append("mainImage[public_id]", mainImgObj.public_id);
          formData.append("mainImage[secure_url]", mainImgObj.secure_url);
        }

        formData.append("seoData", data.seoData);
        formData.append("whatsAppNumber", data.whatsAppNumber);
        formData.append("callToAction", data.callToAction);
        formData.append("contactMessage", data.contactMessage);
        formData.append("slug", data.slug);
        formData.append("cityId", data.cityId);
        formData.append("projectType", data.projectType);
        formData.append("developerId", data.developerId);

        try {
          const response = await projectInstance.EditProject(id, formData);

          if (response.status === 200) {
            toast.dismiss();
            toast.success(`${data.title} updated Successfully`);

            navigate("/dashboard/projects");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err);
        }
      }
    } else {
      navigate("/dashboard/projects");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await projectInstance.deleteProject(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.title} Deleted Successfully`);

        navigate("/dashboard/projects");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };

  const onCityChange = (key) => {
    setData({ ...data, cityId: key });
    setIsEdited(true);
  };

  const onDeveloperChange = (key) => {
    setData({ ...data, developerId: key });
    setIsEdited(true);
  };

  const onProjectTypeChange = (key) => {
    setData({ ...data, projectType: key });
    setIsEdited(true);
  };

  const getCities = async () => {
    try {
      const cityInstance = new CityService();
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
      const developerInstance = new DevelopersService();
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
      const projectInstance = new ProjectTypesService();
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
    getProjectById();
  }, []);

  const deleteSubImage = (item) => {
    setIsEdited(true);

    setData({
      ...data,
      subImages: data.subImages.filter(
        (ele) => ele.secure_url !== item.secure_url
      ),
    });

    setSubImgsObj((prev) =>
      prev.filter((ele) => ele.secure_url !== item.secure_url)
    );
  };

  return (
    <div>
      <div className="form-input-btn">
        <button
          onClick={handleDelete}
          className="subscribe-btn delete"
          style={{ backgroundColor: "rgb(203 60 60)" }}
        >
          حذف
        </button>
        <button type="submit" onClick={handleSave} className="subscribe-btn">
          حفظ
        </button>
      </div>

      {loading && <LoadingOutlined className="loadingIndicator" />}

      {!loading && (
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
              <p>الوصف</p>
              {/* <TextArea
                name="mainDescription"
                value={data.mainDescription}
                onChange={handleChange}
                size="large"
                rows={4}
              /> */}
              <ReactQuill
                theme="snow"
                value={data.mainDescription}
                onChange={(e) => {
                  setIsEdited(true);
                  setData({ ...data, mainDescription: e });
                }}
                modules={modules}
                formats={formats}
                style={{
                  height: "250px",
                  background: "#fff",
                  overflow: "auto",
                }}
              />
              {formErros?.mainDescriptionError != undefined && (
                <p className="input-error-message">
                  <span>
                    <CloseCircleOutlined className="input-error-icon" />
                  </span>
                  {formErros?.mainDescriptionError}
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
              <p>الصورة البارزة للمقال</p>
              {data.mainImage && (
                <img
                  name="mainImage"
                  src={data.mainImage}
                  alt={data.mainImage}
                  width={250}
                  height={250}
                  style={{ backgroundColor: "#eee" }}
                />
              )}
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
              <p>الصورة الفرعية </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {data.subImages.length > 0 &&
                  data.subImages?.map((item, i) => (
                    <div
                      key={item.secure_url}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                      }}
                    >
                      <DeleteOutlined
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          padding: "10px",
                          background: "#fff",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteSubImage(item)}
                      />

                      <img
                        name={`img-${i}`}
                        src={item.secure_url}
                        alt={`img-${i}`}
                        width={250}
                        height={250}
                        style={{ backgroundColor: "#eee" }}
                      />
                    </div>
                  ))}
              </div>
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
                value={data.cityId}
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
                value={data.developerId}
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
                value={data.projectType}
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
      )}
    </div>
  );
};

export default ProjectsDetails;
