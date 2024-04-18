import { HTTPBaseService } from "../HTTPBaseService";

export class UsersService extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super(process.env.REACT_APP_API_URL, token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new UsersService(token);
    }

    return this.classInstance;
  }

  // POST
  login = (body) =>
    this.instance
      .post("user/login", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  logout = () =>
    this.instance
      .post("user/signOut")
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  signUp = (body) =>
    this.instance
      .post("user/signUp", body)
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  refreshToken = () =>
    this.instance
      .post("user/sessionRefreshToken")
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });

  forgetPassword = (body) =>
    this.instance.put(`user/forgetPassword`, body).then((response) => {
      if (response) {
        return response;
      }
    });

  sendCode = (body) =>
    this.instance.patch(`user/sendCode`, body).then((response) => {
      if (response) {
        return response;
      }
    });
}
