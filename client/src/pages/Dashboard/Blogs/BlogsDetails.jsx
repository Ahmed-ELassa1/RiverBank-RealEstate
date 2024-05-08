import {
  CloseCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BlogsServices } from "../../../services/Blogs/BlogsServices";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Popconfirm, Upload } from "antd";
import joi from "joi";
import EditableRows from "../../../utils/EditableRows";
import TextArea from "antd/es/input/TextArea";
import { formats, modules } from "../../../data/sharedData";
import ReactQuill from "react-quill";

const BlogsDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [contentDataSource, setContentDataSource] = useState([]);
  const [quesDataSource, setQuesDataSource] = useState([]);
  const [descDataSource, setDescDataSource] = useState([]);
  const [subImgsObj, setSubImgsObj] = useState();
  const [mainImgObj, setMainImgObj] = useState();

  const defaultDetailsColumns = [
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

  const token = localStorage.getItem("token");
  const blogInstance = new BlogsServices(token);

  const [data, setData] = useState({
    title: "",
    description: "",
    mainImage: "",
    subImages: [],
  });

  const [formErros, setFormErros] = useState({
    titleError: undefined,
    descriptionError: undefined,
  });

  const mainImageProps = {
    onRemove: (file) => {
      setMainImage(null);
      setData({ ...data, mainImage: "" });

      setIsEdited(true);
    },
    beforeUpload: (file) => {
      setMainImage(file);
      setData({ ...data, mainImage: URL.createObjectURL(file) });

      setIsEdited(true);

      return false;
    },
    mainImage,
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setIsEdited(true);

      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      setIsEdited(true);

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
        "string.empty": "Description is a required field",
        "string.base": "Description is a required field",
        "any.required": "Description is a required field",
      }),
      mainImage: joi.optional(),
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

  const getBlogById = async () => {
    try {
      const response = await blogInstance.getBlogById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        title: data?.title,
        description: data?.mainDescription,
        mainImage: data?.mainImage?.secure_url,
        subImages: data?.subImages,
      });
      setMainImgObj(data?.mainImage);
      setSubImgsObj(data?.subImages);

      setContentDataSource(
        data?.blogContent?.map((item) => {
          return { key: Math.random(), question: item };
        })
      );
      setDescDataSource(
        data?.blogDescriptions?.map((item) => {
          return { key: Math.random(), question: item };
        })
      );
      setQuesDataSource(
        data?.blogQuestions?.map((item) => {
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
            (error) => error?.context?.label === "title"
          )?.message,
          descriptionError: valid?.error?.details?.find(
            (error) => error?.context?.label === "description"
          )?.message,
        });
      } else {
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

        if (mainImage) {
          formData.append("mainImage", mainImage);
        } else {
          formData.append("mainImage[public_id]", mainImgObj.public_id);
          formData.append("mainImage[secure_url]", mainImgObj.secure_url);
        }

        contentDataSource?.forEach((feat) => {
          formData.append("blogContent", feat.question);
        });

        descDataSource?.forEach((feat, i) => {
          formData.append(`blogDescriptions[${[i]}]`, feat.question);
        });

        quesDataSource?.forEach((feat, i) => {
          formData.append(`blogQuestions[${[i]}][question]`, feat.question);
          formData.append(`blogQuestions[${[i]}][answer]`, feat.answer);
        });

        formData.append("title", data.title);
        formData.append("mainDescription", data.description);

        try {
          const response = await blogInstance.EditBlog(id, formData);

          if (response.status === 200) {
            toast.dismiss();
            toast.success(`${data.title} updated Successfully`);

            navigate("/dashboard/blogs");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err);
        }
      }
    } else {
      navigate("/dashboard/blogs");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await blogInstance.deleteBlog(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.title} Deleted Successfully`);

        navigate("/dashboard/blogs");
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
    getBlogById();
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
            {/* <TextArea
              name="description"
              value={data.description}
              onChange={handleChange}
              size="large"
              rows={6}
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
            <p>محتوي المقالة</p>
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
                Blog Content is a required field
              </p>
            )}
          </div>

          <div className="form-input">
            <p>استفسارات حول المقالة</p>
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
                Blog Questions is a required field
              </p>
            )}
          </div>

          <div className="form-input">
            <p>وصف المقالة</p>
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
                Blog Description is a required field
              </p>
            )}
          </div>

          <div className="form-input">
            <p>الصورة الرئيسية</p>
            {data.mainImage && (
              <img
                name="logo"
                src={data.mainImage}
                alt={data.mainImage}
                width={250}
                height={250}
              />
            )}
          </div>

          <div className="form-input">
            <p>اختر صورة</p>
            <Upload {...mainImageProps} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>

          <div className="form-input">
            <p>الصور الفرعية</p>

            <div style={{ display: "flex", gap: "10px" }}>
              {data?.subImages?.length > 0 &&
                data?.subImages?.map((item, i) => (
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
                      key={item?.public_id}
                      name={i}
                      src={item?.secure_url}
                      alt={`img-${i}`}
                      width={250}
                      height={250}
                      style={{ backgroundColor: "#EEE" }}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="form-input">
            <p>اختر صور</p>
            <Upload {...props} multiple listType="picture">
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsDetails;
