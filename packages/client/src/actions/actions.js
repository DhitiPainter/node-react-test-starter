import axios from "axios";
import { apiURLs } from "../config/config";
import { toast } from "react-toastify";

export const POST_USER_REQUEST = "POST_USER_REQUEST";
export const POST_USER_SUCCESS = "POST_USER_SUCCESS";
export const POST_USER_FAILURE = "POST_USER_FAILURE";

export const postUser = (payload) => {
  return (dispatch) => {
    dispatch(postUserRequest());

    axios
      .post(apiURLs.user, payload)
      .then((res) => res.data)
      .then((res) => {
        dispatch(postUserSuccess(res.data));
      })
      .catch((err) => {
        let msg = "";
        err.response.data.errors.forEach((e) => {
          msg = msg.concat(e.param, ": ", e.msg, ";");
        });
        dispatch(postUserFailure(msg));
        toast(msg);
      });
  };
};

export const postUserRequest = () => ({
  type: POST_USER_REQUEST,
});

export const postUserSuccess = (message) => ({
  type: POST_USER_SUCCESS,
  payload: message,
});

export const postUserFailure = (error) => ({
  type: POST_USER_FAILURE,
  payload: error,
});
