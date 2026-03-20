import api from "@/config/api";
import {
  FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE,
  CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,
} from "./ActionTypes";

// ✅ GET /api/comments/{issueId}
export const fetchComments = (issueId) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });
  try {
    const { data } = await api.get(`/api/comments/${issueId}`);
    console.log("fetch comments", data);
    dispatch({ type: FETCH_COMMENTS_SUCCESS, comments: data });
  } catch (error) {
    dispatch({ type: FETCH_COMMENTS_FAILURE, error: error.message });
  }
};

// ✅ POST /api/comments — { issueId, content }
export const createComment = ({ issueId, content }) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/comments`, {
      issueid: issueId, // ✅ backend field: req.getIssueid()
      content,
    });
    console.log("create comment", data);
    dispatch({ type: CREATE_COMMENT_SUCCESS, comment: data });
  } catch (error) {
    dispatch({ type: CREATE_COMMENT_FAILURE, error: error.message });
  }
};

// ✅ DELETE /api/comments/{commentId}
export const deleteComment = (commentId) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENT_REQUEST });
  try {
    await api.delete(`/api/comments/${commentId}`);
    console.log("delete comment", commentId);
    dispatch({ type: DELETE_COMMENT_SUCCESS, commentId });
  } catch (error) {
    dispatch({ type: DELETE_COMMENT_FAILURE, error: error.message });
  }
};