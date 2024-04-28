import { HTTPBaseService } from "../HTTPBaseService";

export class CityService extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super(process.env.REACT_APP_API_URL, token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new CityService(token);
    }

    return this.classInstance;
  }

  // POST
  createCity = (body) =>
    this.instance
      .post("city", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  // GET ALL
  getCities = (body) =>
    this.instance
      .get("city", {
        params: body,
        ...this.getRequestConfig(),
      })
      .then((response) => {
        if (response) {
          return response;
        }
      });

  // EDIT
  EditCity = (id, body) =>
    this.instance.put(`city/${id}`, body).then((response) => {
      if (response) {
        return response;
      }
    });

  // GET BY ID
  getCityById = (id) =>
    this.instance.get(`city/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteCity = (id) =>
    this.instance.delete(`city/${id}`).then((response) => {
      if (response) {
        return response;
      }
    });

  // DELETE
  deleteSelectedCities = (ids) =>
    this.instance.delete(`city`, { data: ids }).then((response) => {
      if (response) {
        return response;
      }
    });
}
