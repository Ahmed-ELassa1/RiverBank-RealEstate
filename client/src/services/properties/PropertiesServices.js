import { HTTPBaseService } from "../HTTPBaseService";

export class PropertiesServices extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super(process.env.REACT_APP_API_URL, token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new PropertiesServices(token);
    }

    return this.classInstance;
  }

  // POST
  createProperty = (body) =>
    this.instance
      .post("property", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  // GET ALL
  getProperties = (body) =>
    this.instance
      .get("property", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response) => {
        if (response) {
          return response;
        }
      });

  // EDIT
  EditProperty = (id, body) =>
    this.instance.put(`property/${id}`, body).then((response) => {
      if (response) {
        return response;
      }
    });

  // GET BY ID
  getPropertyById = (id) =>
    this.instance.get(`property/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteProperty = (id) =>
    this.instance.delete(`property/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteSelectedProperties = (ids) =>
    this.instance.delete(`property`, { data: ids }).then((response) => {
      if (response) {
        return response;
      }
    });
}
