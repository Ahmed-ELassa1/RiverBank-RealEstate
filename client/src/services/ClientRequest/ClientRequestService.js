import { HTTPBaseService } from "../HTTPBaseService";

export class ClientRequestService extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super(process.env.REACT_APP_API_URL, token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new ClientRequestService(token);
    }

    return this.classInstance;
  }

  // POST
  createClientRequest = (body) =>
    this.instance
      .post("clientRequest", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  // GET ALL
  getClientRequest = (body) =>
    this.instance
      .get("clientRequest", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response) => {
        if (response) {
          return response;
        }
      });

  // EDIT
  EditClientRequest = (id, body) =>
    this.instance.put(`clientRequest/${id}`, body).then((response) => {
      if (response) {
        return response;
      }
    });

  // GET BY ID
  getClientRequestById = (id) =>
    this.instance.get(`clientRequest/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteClientRequest = (id) =>
    this.instance.delete(`clientRequest/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteSelectedClientRequest = (ids) =>
    this.instance.delete(`clientRequest`, { data: ids }).then((response) => {
      if (response) {
        return response;
      }
    });
}
