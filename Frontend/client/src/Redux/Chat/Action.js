import { BASE_API_URL } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

// single chat
export const createChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/chat/single`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${chatData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: chatData.data }),
    });

    const data = await res.json();
    console.log("created single chat: ", data);
    dispatch({ type: CREATE_CHAT, payload: data });
  } catch (error) {
    console.log("create chat error: ", error);
  }
};

// group chat
export const createGroupChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/chat/group`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${chatData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatData.data),
    });

    const data = await res.json();
    console.log("created group: ", data);
    dispatch({ type: CREATE_GROUP, payload: data });
  } catch (error) {
    console.log("create group error: ", error);
  }
};

// all chat of the user
export const getUsersChat = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/chat/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("get all chat: ", data);
    dispatch({ type: GET_USERS_CHAT, payload: data });
  } catch (error) {
    console.log("get all chat error: ", error);
  }
};
