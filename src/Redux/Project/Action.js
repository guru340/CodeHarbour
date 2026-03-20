import api from "@/config/api";
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_BY_ID_REQUEST,
  FETCH_PROJECTS_BY_ID_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  INVITE_TO_PROJECT_SUCCESS,
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  SEARCH_PROJECT_SUCCESS,
} from "./ActionTypes";


export const fetchProject =
  ({ category, tag }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    try {
      const { data } = await api.get("api/projects", {
        params: { category, tag },
      });
      console.log("all projects found", data);
      
      dispatch({ type: FETCH_PROJECTS_SUCCESS, projects: data });
    } catch (error) {
      console.log("error", error);
    }
  };
export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_REQUEST });
  try {
    const { data } = await api.get(`api/projects/search?keyword=${keyword}`);
    console.log("search projects", data);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const CreateProject = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("api/projects", projectData);
    console.log("Project created", data);
    dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`api/projects/${id}`);
    console.log("fetch project by id", data);
    dispatch({ type: FETCH_PROJECTS_BY_ID_SUCCESS, project: data });
  } catch (error) {
    console.log("error", error);
  }
};


export const DeleteProject = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });
  try {
    const { data } = await api.delete(`api/projects/${id}`);
    console.log("delete project", data);
    dispatch({ type: DELETE_PROJECT_SUCCESS, projectId: id });
  } catch (error) {
    console.log("error", error);
  }
};

export const InviteToProject =
  ({ email, projectId }) =>
  async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("api/projects/invite", { email, projectId });
      console.log("invite to project", data);
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };

       
export const acceptInvitation =
  ({ invitationToken, navigate }) =>
  async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.post("api/projects/accept_invitation", null, {
        params: { token: invitationToken },
      });
      navigate(`/projects/${data.projectId}`);
      console.log("accept invitation", data);
      dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
    }
  };