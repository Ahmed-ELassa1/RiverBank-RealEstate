import { HTTPBaseService } from "../HTTPBaseService";

export class DevelopersService extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super(process.env.REACT_APP_API_URL, token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new DevelopersService(token);
    }

    return this.classInstance;
  }

  // POST
  createDeveloper = (body) =>
    this.instance
      .post("developer", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  // GET ALL
  getDevelopers = (body) =>
    this.instance
      .get("developer", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response) => {
        if (response) {
          return response;
        }
      });

  // EDIT
  EditDeveloper = (id, body) =>
    this.instance.put(`developer/${id}`, body).then((response) => {
      if (response) {
        return response;
      }
    });

  // GET BY ID
  getDeveloperById = (id) =>
    this.instance.get(`developer/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteDeveloepr = (id) =>
    this.instance.delete(`developer/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteSelectedDevelopers = (ids) =>
    this.instance.delete(`developer`, { data: ids }).then((response) => {
      if (response) {
        return response;
      }
    });
}
