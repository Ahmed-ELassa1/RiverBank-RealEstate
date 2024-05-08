import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import joi from "joi";
import { ProjectTypesService } from "../../../services/ProjectTypesService/ProjectTypesService";

const CreateProjectType = () => {
  const navigate = useNavigate();

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

    setData(cloned);
  };

  const handleCreate = async () => {
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
        const response = await projectTypeInstance.createProjectType(data);

        if (response.status === 201) {
          toast.dismiss();
          toast.success(`${data.title} created Successfully`);

          navigate("/dashboard/projectTypes");
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
    </div>
  );
};

export default CreateProjectType;
