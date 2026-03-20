import api from "@/config/api";
import {
  FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_BY_ID_REQUEST, FETCH_ISSUES_BY_ID_SUCCESS, FETCH_ISSUES_BY_ID_FAILURE,
  CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, CREATE_ISSUE_FAILURE,
  UPDATE_ISSUE_REQUEST, UPDATE_ISSUE_SUCCESS, UPDATE_ISSUE_FAILURE,
  DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE,
  UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE,
  ADD_USER_TO_ISSUE_REQUEST, ADD_USER_TO_ISSUE_SUCCESS, ADD_USER_TO_ISSUE_FAILURE,
} from "./ActionTypes";

export const fetchIssues = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUES_REQUEST });
  try {
    const { data } = await api.get(`api/issues`, { params: { projectId } });
    console.log("fetch issues", data);
    // ✅ Pass projectId so reducer caches under correct key
    dispatch({ type: FETCH_ISSUES_SUCCESS, issues: data, projectId });
  } catch (error) {
    dispatch({ type: FETCH_ISSUES_FAILURE, error: error.message });
  }
};

export const fetchIssueById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUES_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`api/issues/${id}`);
    dispatch({ type: FETCH_ISSUES_BY_ID_SUCCESS, issue: data });
  } catch (error) {
    dispatch({ type: FETCH_ISSUES_BY_ID_FAILURE, error: error.message });
  }
};

export const createIssue = (issueData) => async (dispatch) => {
  dispatch({ type: CREATE_ISSUE_REQUEST });
  try {
    const { data } = await api.post(`api/issues`, issueData);
    console.log("create issue", data);
    dispatch({ type: CREATE_ISSUE_SUCCESS, issue: data });
  } catch (error) {
    dispatch({ type: CREATE_ISSUE_FAILURE, error: error.message });
  }
};

export const updateIssue = (issueData) => async (dispatch) => {
  dispatch({ type: UPDATE_ISSUE_REQUEST });
  try {
    const { data } = await api.put(`api/issues/${issueData.id}`, issueData);
    console.log("update issue", data);
    dispatch({ type: UPDATE_ISSUE_SUCCESS, issue: data });
  } catch (error) {
    dispatch({ type: UPDATE_ISSUE_FAILURE, error: error.message });
  }
};

export const deleteIssue = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ISSUE_REQUEST });
  try {
    await api.delete(`api/issues/${id}`);
    dispatch({ type: DELETE_ISSUE_SUCCESS, issueId: id });
  } catch (error) {
    dispatch({ type: DELETE_ISSUE_FAILURE, error: error.message });
  }
};

export const updateIssueStatus = ({ id, status }) => async (dispatch) => {
  dispatch({ type: UPDATE_ISSUE_STATUS_REQUEST });
  try {
    const { data } = await api.put(`api/issues/${id}/status/${status}`);
    console.log("update status", data);
    dispatch({ type: UPDATE_ISSUE_STATUS_SUCCESS, issue: data });
  } catch (error) {
    dispatch({ type: UPDATE_ISSUE_STATUS_FAILURE, error: error.message });
  }
};

export const addUserToIssue = (issueId, userId) => async (dispatch) => {
  dispatch({ type: ADD_USER_TO_ISSUE_REQUEST });
  try {
    const { data } = await api.put(`api/issues/${issueId}/assignee/${userId}`);
    console.log("assign user", data);
    dispatch({ type: ADD_USER_TO_ISSUE_SUCCESS, issue: data });
  } catch (error) {
    dispatch({ type: ADD_USER_TO_ISSUE_FAILURE, error: error.message });
  }
};