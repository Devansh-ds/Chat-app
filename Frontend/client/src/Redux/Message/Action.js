import { BASE_API_URL } from "../../config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage = (messageData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/messages/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${messageData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData.data),
    });

    const data = await res.json();
    console.log("create message: ", data);
    dispatch({ type: CREATE_NEW_MESSAGE, payload: data });
  } catch (error) {
    console.log("create message (error): ", error);
  }
};

export const getAllMessage = (messageData) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/messages/chat/${messageData.chatId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${messageData.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("get all message: ", data);
    dispatch({ type: GET_ALL_MESSAGE, payload: data });
  } catch (error) {
    console.log("get all message (error): ", error);
  }
};
