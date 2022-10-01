import axios from "axios";
import { BaseUrl } from "../../../utils/Service";

export const dataDrop = async (key) => {
  if (key === "brand") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.brandname,
        code: e.brandname,
      }))
    );
    return res;
  } else if (key === "color") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.colorname,
        code: e.colorname,
      }))
    );
    return res;
  } else if (key === "category") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.categoryname,
        code: e.categoryname,
      }))
    );
    return res;
  } else if (key === "subcategory") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.subcategoryname,
        code: e.subcategoryname,
      }))
    );
    return res;
  } else if (key === "fabric") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.fabricname,
        code: e.fabricname,
      }))
    );
    return res;
  } else if (key === "fit") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.fitname,
        code: e.fitname,
      }))
    );
    return res;
  } else if (key === "multipack") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.multipackname,
        code: e.multipackname,
      }))
    );
    return res;
  } else if (key === "neck") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.neckname,
        code: e.neckname,
      }))
    );
    return res;
  } else if (key === "occasion") {
    const res = await axios.get(`${BaseUrl}/feature/${key}`).then((res) =>
      res.data?.map((e) => ({
        value: e.occasionname,
        code: e.occasionname,
      }))
    );
    return res;
  }
};
