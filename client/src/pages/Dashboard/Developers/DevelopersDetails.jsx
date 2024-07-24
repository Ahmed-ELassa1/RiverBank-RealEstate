import {
  CloseCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DevelopersService } from "../../../services/Developers/DevelopersService";
import { toast } from "react-toastify";
import joi from "joi";
import EditableRows from "../../../utils/EditableRows";
import { formats, modules } from "../../../data/sharedData";
import ReactQuill from "react-quill";

const DevelopersDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageError, setMainImageError] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const token = localStorage.getItem("token");
  const developerInstance = new DevelopersService(token);
  const [fileList, setFileList] = useState([]);
  const [contentDataSource, setContentDataSource] = useState([]);
  const [quesDataSource, setQuesDataSource] = useState([]);
  const [descDataSource, setDescDataSource] = useState([]);
  const [mainImgObj, setMainImgObj] = useState();
  const [subImgsObj, setSubImgsObj] = useState();

  const [data, setData] = useState({
    title: "",
    logo: "",
    description: "",
    subImages: [],
  });

  const [formErros, setFormErros] = useState({
    titleError: undefined,
    descriptionError: undefined,
  });

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

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      setIsEdited(true);

      newFileList.splice(index, 1);
      setFileList(newFileList);
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
      setIsEdited(true);
      setData({ ...data, logo: "" });

      setMainImageError("");
    },
    beforeUpload: (file) => {
      setMainImage(file);
      setData({ ...data, logo: URL.createObjectURL(file) });
      setIsEdited(true);

      setMainImageError("");

      return false;
    },
    mainImage,
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
      logo: joi.optional(),
      subImages: joi.optional(),
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

  const getDeveloperById = async () => {
    try {
      const response = await developerInstance.getDeveloperById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        title: data?.title,
        description: data?.mainDescription,
        logo: data?.mainImage?.secure_url,
        subImages: data?.subImages,
      });

      setMainImgObj(data.logo);
      setSubImgsObj(data.subImages);

      setContentDataSource(
        data?.developerContent?.map((item) => {
          return { key: Math.random(), question: item };
        })
      );
      setDescDataSource(
        data?.developerDescriptions?.map((item) => {
          return { key: Math.random(), question: item };
        })
      );
      setQuesDataSource(
        data?.developerQuestions?.map((item) => {
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
        setFormErros({
          titleError: valid?.error?.details?.find(
            (error) => error?.context?.label === "title"
          )?.message,
          descriptionError: valid?.error?.details?.find(
            (error) => error?.context?.label === "description"
          )?.message,
        });
      } else {
        setFormErros({
          titleError: undefined,
        });
        toast.loading("Loading...");

        const formData = new FormData();

        contentDataSource?.forEach((feat) => {
          formData.append("developerContent", feat.question);
        });

        descDataSource?.forEach((feat, i) => {
          formData.append(`developerDescriptions[${[i]}]`, feat.question);
        });

        quesDataSource?.forEach((feat, i) => {
          formData.append(
            `developerQuestions[${[i]}][question]`,
            feat.question
          );
          formData.append(`developerQuestions[${[i]}][answer]`, feat.answer);
        });

        if (mainImage) {
          formData.append("mainImage", mainImage);
        } else {
          formData.append("mainImage[0][public_id]", mainImgObj?.public_id);
          formData.append("mainImage[0][secure_url]", mainImgObj?.secure_url);
        }

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

        formData.append("title", data.title);
        formData.append("mainDescription", data.description);

        try {
          const response = await developerInstance.EditDeveloper(id, formData);

          if (response.status === 200) {
            toast.dismiss();
            toast.success(`${data.title} updated Successfully`);

            navigate("/dashboard/developers");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err);
        }
      }
    } else {
      navigate("/dashboard/developers");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await developerInstance.deleteDeveloepr(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.title} Deleted Successfully`);

        navigate("/dashboard/developers");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };

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

  useEffect(() => {
    getDeveloperById();
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
            <p>Logo</p>
            {data.logo && (
              <img
                name="logo"
                src={data.logo}
                alt={"img-main"}
                width={250}
                height={250}
                style={{ backgroundColor: "#eee" }}
              />
            )}
          </div>

          <div className="form-input">
            <p>Upload Logo</p>
            <Upload {...logoProps} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
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
                      key={item.secure_url}
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
        </>
      )}
    </div>
  );
};

export default DevelopersDetails;
