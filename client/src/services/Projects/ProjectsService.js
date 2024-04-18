import { HTTPBaseService } from "../HTTPBaseService";

export class ProjectsService extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super(process.env.REACT_APP_API_URL, token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new ProjectsService(token);
    }

    return this.classInstance;
  }

  // POST
  createProject = (body) =>
    this.instance
      .post("project", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  // GET ALL
  getProjects = (body) =>
    this.instance
      .get("project", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response) => {
        if (response) {
          return response;
        }
      });

  // EDIT
  EditProject = (id, body) =>
    this.instance.put(`project/${id}`, body).then((response) => {
      if (response) {
        return response;
      }
    });

  // GET BY ID
  getProjectById = (id) =>
    this.instance.get(`project/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteProject = (id) =>
    this.instance.delete(`project/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteSelectedProjects = (ids) =>
    this.instance.delete(`project`, { data: ids }).then((response) => {
      if (response) {
        return response;
      }
    });
}
