import axios from "axios";
import { BaseUrl } from "../../../../utils/Service";
const userInfo = JSON.parse(localStorage.getItem("user"));

export const HandlerDelete = (url) => {
  const res = axios.delete(`${BaseUrl}${url}`, {
    headers: {
      access_token: userInfo?.token,
    },
  });

  return res;
};
export const HandlerEdit = (url) => {
  const res = axios.get(`${BaseUrl}${url}`, {
    headers: {
      access_token: userInfo?.token,
    },
  });
  return res;
};
export const HandlerAdd = (url, data) => {
    const res = axios.post(`${BaseUrl}${url}`, data, {
    headers: {
      access_token: userInfo?.token,
    },
  });
  return res;
};
