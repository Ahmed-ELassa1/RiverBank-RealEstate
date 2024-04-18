import axios from "axios";
import { toast } from "react-toastify";

export class HTTPBaseService {
  instance;
  token;
  baseURL;
  abortController;

  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
    });
    this.token = token;
    this.abortController = new AbortController();

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  // Method to refresh the token
  refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken"); // Assume you also store refreshToken
      const response = await axios.post(
        `https://riverbank-realstate.onrender.com/user/sessionRefreshToken`,
        {
          refreshToken,
        }
      );
      const { token, refToken: newRefreshToken } = response.data;

      this.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", newRefreshToken);

      return token;
    } catch (error) {
      // Handle error, e.g., redirect to login or show a message
      console.error("Failed to refresh token:", error);
      throw error;
    }
  };

  initializeResponseInterceptor = () => {
    this.instance.interceptors.response?.use(
      (response) => {
        if (response?.headers && response?.headers.authorization) {
          const responseToken = (response?.headers.authorization).split(" ")[1];
          this.token = responseToken;
          localStorage.setItem("hashToken", this.token);
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to expired token
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await this.refreshToken();
            originalRequest.headers[
              "Authorization"
            ] = `Bearer_${newAccessToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            // Handle the case where refresh token fails
            return Promise.reject(refreshError);
          }
        }

        if (error?.response?.status == 409) {
          toast.dismiss();
          error?.response?.data?.validationError?.map((err) => {
            return toast.error(`${err?.message}`);
          });
        } else if (error?.response?.status == 500) {
          toast.dismiss();
          return toast.error(`${error?.response?.data?.message}`);
        } else if (error?.response?.status == 404) {
          toast.dismiss();
          if (
            error?.response?.data?.message ==
            "No Logo uploaded for this company"
          ) {
            return;
          } else {
            error?.response?.data?.validationError?.map((err) => {
              return toast.error(`${err?.message}`);
            });
          }
        } else if (error?.response?.status == 405) {
          toast.dismiss();
          error?.response?.data?.validationError?.map((err) => {
            return toast.error(`${err?.message}`);
          });
        } else if (error?.response?.status == 422) {
          toast.dismiss();
          error?.response?.data?.validationError?.map((err) => {
            return toast.error(`${err?.message}`);
          });
        } else if (error?.response?.status == 400) {
          toast.dismiss();
          toast.error(error?.response?.data?.message);
          // error?.response?.data?.validationError?.map((err) => {
          //   return toast.error(`${err?.message}`);
          // });
        } else if (error?.response?.status == 415) {
          toast.dismiss();
          return toast.error(`${error?.response?.data?.message}`);
        } else if (error?.response?.status == 504) {
          toast.dismiss();
          return toast.error(`${error?.response?.data?.message}`);
        } else if (error?.response?.status == 503) {
          toast.dismiss();
          return toast.error(`Error: Bad Gateway`);
        } else if (error?.response?.status == 502) {
          toast.dismiss();
          return toast.error(`Error: Bad Gateway`);
        } else if (error?.toJSON().message === "Network Error") {
          toast.dismiss();
          toast.error("No internet connection");
        }
      }
    );
  };

  handleRequest = (config) => {
    config.headers["Authorization"] = `Bearer_${this.token}`;
    return config;
  };

  getRequestConfig() {
    return {
      signal: this.abortController.signal,
    };
  }

  cancelRequests() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}
