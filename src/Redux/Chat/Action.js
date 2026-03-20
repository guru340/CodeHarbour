import api from "@/config/api";
import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  FETCH_CHAT_BY_PROJECT_REQUEST,
  FETCH_CHAT_BY_PROJECT_SUCCESS,
  FETCH_CHAT_BY_PROJECT_FAILURE,
  FETCH_CHAT_MESSAGES_REQUEST,
  FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE,
} from "./ActionTypes";

// ✅ FIX 1: Was using undefined SEND_MESSAGE_REQUEST (not imported from actionTypes)
// Backend expects: { senderId, projectId, content }
export const sendMessage = (messageData) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_REQUEST });
  try {
    const response = await api.post("api/messages/send", messageData);
    dispatch({ type: SEND_MESSAGE_SUCCESS, message: response.data });
  } catch (error) {
    console.error("Error sending message", error);
    dispatch({ type: SEND_MESSAGE_FAILURE, error: error.message });
  }
};

export const fetchChatByProject = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });
  try {
    const response = await api.get(`api/projects/${projectId}/chat`);
    console.log("fetch chat", response.data);
    dispatch({ type: FETCH_CHAT_BY_PROJECT_SUCCESS, chat: response.data });
  } catch (error) {
    console.error("Error fetching chat", error);
    dispatch({ type: FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message });
  }
};

// ✅ FIX 2: Correct endpoint — was api/messages/chat/{chatId}
// Backend controller: GET /api/messages/chat/{projectId}
export const fetchChatMessages = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });
  try {
    const response = await api.get(`api/messages/chat/${projectId}`);
    console.log("fetch chat messages", response.data);
    dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, messages: response.data });
  } catch (error) {
    console.error("Error fetching messages", error);
    dispatch({ type: FETCH_CHAT_MESSAGES_FAILURE, error: error.message });
  }
};