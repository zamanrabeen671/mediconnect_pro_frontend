import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import auth from "./auth";
import { API_URL } from "../settings/config";

const baseURL = `${API_URL}`;

const useAxios = () => {
  const token = auth.getToken();

  let axiosInstance;

  if (token) {
    axiosInstance = axios.create({
      baseURL,
      headers: { authorization: token },
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },

      (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response?.status;
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";

          if (status === 401) {
            // Handle unauthorized error
            auth.clearAppStorage();
            window.location.pathname = "/login";
            return Promise.reject({
              message: "Unauthorized. Please log in again.",
              status,
            });
          }

          if (status === 500) {
            // Handle server errors
            return Promise.reject({
              message: error.response?.data?.message || "Internal server error. Please try again later.",
              status,
            });
          }

          // Handle other custom server errors
          return Promise.reject({
            message: errorMessage,
            status,
          });
        }

        return Promise.reject({
          message: "An unexpected error occurred.",
          status: 0,
        });

        // if (error.response.status === 401) {
        //   //place your reentry code
        //   console.log("enttttt");
        //   auth.clearAppStorage();
        //   window.location.pathname = "/login";
        // }
        // return error;
      }
    );

    axiosInstance.interceptors.request.use(async (req) => {
      const user = jwtDecode(token);
      const isExpired = dayjs.unix(Number(user.exp)).diff(dayjs()) < 1;

      if (!isExpired) {
        return req;
      } else {
        auth.clearAppStorage();
        window.location.pathname = "/login";
        return req;
      }
    });
  } else {
    axiosInstance = axios.create({
      baseURL,
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },

      (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response?.status;
          
          const errorMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            "An unexpected error occurred.";

          if (status === 500) {
            // Handle server errors
            return Promise.reject({
              message: "Internal server error. Please try again later.",
              status,
            });
          }

          // Handle other custom server errors
          return Promise.reject({
            message: errorMessage,
            status,
          });
        }

        return Promise.reject({
          message: "An unexpected error occurred.",
          status: 0,
        });
      }
    );
  }

  return axiosInstance;
};

export default useAxios;
