import axios from "axios";
import { BaseUrl } from "../../utils/Service";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addcartError,
  addcartStart,
  addcartSuccess,
  updateError,
  updateStart,
  updateSuccess,
  removeSuccess,
} from "./cartSlice";

export const addCart = async (dispatch) => {
  dispatch(addcartStart());
  try {
    const res = await axios.get(`${BaseUrl}/cart`);
    dispatch(addcartSuccess(res.data));
  } catch (error) {
    dispatch(addcartError);
  }
};
export const updateCart = async (id, quantity, dispatch) => {
  dispatch(updateStart());
  try {
    const res = await axios.put(`${BaseUrl}/cart/${id}`, { quantity });
    dispatch(updateSuccess(res.data));
  } catch (error) {
    dispatch(updateError);
  }
};
export const removeCart = async (id, dispatch) => {
  dispatch(updateStart());
  try {
    const res = await axios.delete(`${BaseUrl}/cart/${id}`);
    dispatch(removeSuccess(res.data));
  } catch (error) {
    dispatch(updateError);
  }
};
