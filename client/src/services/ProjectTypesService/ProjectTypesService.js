import { HTTPBaseService } from "../HTTPBaseService";

export class ProjectTypesService extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super(process.env.REACT_APP_API_URL, token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new ProjectTypesService(token);
    }

    return this.classInstance;
  }

  // POST
  createProjectType = (body) =>
    this.instance
      .post("projectType", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  // GET ALL
  getProjectTypes = (body) =>
    this.instance
      .get("projectType", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response) => {
        if (response) {
          return response;
        }
      });

  // EDIT
  EditProjectType = (id, body) =>
    this.instance.put(`projectType/${id}`, body).then((response) => {
      if (response) {
        return response;
      }
    });

  // GET BY ID
  getProjectTypeById = (id) =>
    this.instance.get(`projectType/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteProjectType = (id) =>
    this.instance.delete(`projectType/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteSelectedProjectTypes = (ids) =>
    this.instance.delete(`projectType`, { data: ids }).then((response) => {
      if (response) {
        return response;
      }
    });
}
