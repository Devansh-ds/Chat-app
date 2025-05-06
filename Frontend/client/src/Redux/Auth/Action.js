import { BASE_API_URL } from "../../config/api";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

export const register = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (resData.acessToken) {
      localStorage.setItem("token", resData.acessToken);
    }
    console.log("register: ", resData);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {
    console.log("register (error): ", error);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.acessToken) {
      localStorage.setItem("token", resData.acessToken);
    }
    console.log("login: ", resData);
    dispatch({ type: LOGIN, payload: resData });
  } catch (error) {
    console.log("Login (error) ", error);
  }
};

export const currentUser = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    console.log("current users: ", resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.log("current users (error) ", error);
  }
};

export const searchUsers = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/users/search?query=${data.keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    const resData = await res.json();
    console.log("seach user: ", resData);
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.log("search user (error) ", error);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data.body),
    });
    const resData = await res.json();
    console.log("update user: ", resData);
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.log("update user (error) ", error);
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    console.log("logging out...");
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT, payload: null });
    dispatch({ type: REQ_USER, payload: null });
  } catch (error) {
    console.log("logout error");
  }
};
