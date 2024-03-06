import axios from "axios";

axios.defaults.baseURL = "https://moments-api-julia-d24159f667ec.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();