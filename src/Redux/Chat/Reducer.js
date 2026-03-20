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

const initialState = {
  messages: [],
  chat: null,
  loading: false,
  error: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {

    case SEND_MESSAGE_REQUEST:
    case FETCH_CHAT_BY_PROJECT_REQUEST:
    case FETCH_CHAT_MESSAGES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CHAT_MESSAGES_SUCCESS:
      return { ...state, loading: false, messages: action.messages };

    case FETCH_CHAT_BY_PROJECT_SUCCESS:
      return { ...state, loading: false, chat: action.chat };

    // ✅ Append new message instantly
    case SEND_MESSAGE_SUCCESS:
      return { ...state, loading: false, messages: [...state.messages, action.message] };

    case SEND_MESSAGE_FAILURE:
    case FETCH_CHAT_BY_PROJECT_FAILURE:
    case FETCH_CHAT_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default chatReducer;