import { CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "antd";
import joi from "joi";
import { ProjectTypesService } from "../../../services/ProjectTypesService/ProjectTypesService";

const ProjectTypeDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  const token = localStorage.getItem("token");
  const projectTypeInstance = new ProjectTypesService(token);

  const [data, setData] = useState({
    title: "",
  });

  const [formErros, setFormErros] = useState({
    titleError: undefined,
  });

  function validation() {
    const schema = joi.object({
      title: joi.string().min(2).max(20).required().messages({
        "string.min": "min length is 2 char at least",
        "string.max": "max length is 20 char",
        "string.empty": "Title is a required field",
        "string.base": "Title is a required field",
        "any.required": "Title is a required field",
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

  const getProjectTypeById = async () => {
    try {
      const response = await projectTypeInstance.getProjectTypeById(id);

      const data = await response.data.data;
      setLoading(false);

      setData({
        title: data?.title,
      });
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
        });
      } else {
        toast.loading("Loading...");

        try {
          const response = await projectTypeInstance.EditProjectType(id, data);

          if (response.status === 200 || response.status === 201) {
            toast.dismiss();
            toast.success(`${data.title} updated Successfully`);

            navigate("/dashboard/projectTypes");
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err);
        }
      }
    } else {
      navigate("/dashboard/projectTypes");
    }
  };

  const handleDelete = async () => {
    toast.loading("Loading...");

    try {
      const response = await projectTypeInstance.deleteProjectType(id);

      if (response.status === 200) {
        toast.dismiss();
        toast.success(`${data.title} Deleted Successfully`);

        navigate("/dashboard/projectTypes");
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err);
    }
  };

  useEffect(() => {
    getProjectTypeById();
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
      )}
    </div>
  );
};

export default ProjectTypeDetails;
