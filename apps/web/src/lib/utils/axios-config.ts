import Axios, { AxiosRequestConfig } from "axios";
import { SITE_URL } from "./constants";

// axios base config
const config: AxiosRequestConfig = {
  responseType: "json",
  baseURL: SITE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const axiosClient = Axios.create(config);
