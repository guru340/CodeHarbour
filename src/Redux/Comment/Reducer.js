import {
  FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE,
  CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,
} from "./ActionTypes";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
    case CREATE_COMMENT_REQUEST:
    case DELETE_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_COMMENTS_SUCCESS:
      return { ...state, loading: false, comments: action.comments };

    // ✅ Append new comment instantly
    case CREATE_COMMENT_SUCCESS:
      return { ...state, loading: false, comments: [...state.comments, action.comment] };

    // ✅ Remove deleted comment instantly
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.filter((c) => c.id !== action.commentId),
      };

    case FETCH_COMMENTS_FAILURE:
    case CREATE_COMMENT_FAILURE:
    case DELETE_COMMENT_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default commentReducer;