import {
  FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_BY_ID_REQUEST, FETCH_ISSUES_BY_ID_SUCCESS, FETCH_ISSUES_BY_ID_FAILURE,
  CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, CREATE_ISSUE_FAILURE,
  UPDATE_ISSUE_REQUEST, UPDATE_ISSUE_SUCCESS, UPDATE_ISSUE_FAILURE,
  DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE,
  UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE,
  ADD_USER_TO_ISSUE_REQUEST, ADD_USER_TO_ISSUE_SUCCESS, ADD_USER_TO_ISSUE_FAILURE,
} from "./ActionTypes";

// ✅ Cache issues per projectId — "issues_156", "issues_200" etc.
const saveCacheForProject = (projectId, issues) => {
  try {
    if (projectId) {
      localStorage.setItem(`issues_${projectId}`, JSON.stringify(issues));
    }
  } catch {}
};

export const loadCacheForProject = (projectId) => {
  try {
    const cached = localStorage.getItem(`issues_${projectId}`);
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
};

const initialState = {
  issues: [],           // starts empty — ProjectDetail loads correct project cache
  issueDetails: null,
  currentProjectId: null,
  loading: false,
  error: null,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_ISSUES_REQUEST:
    case FETCH_ISSUES_BY_ID_REQUEST:
    case CREATE_ISSUE_REQUEST:
    case UPDATE_ISSUE_REQUEST:
    case DELETE_ISSUE_REQUEST:
    case UPDATE_ISSUE_STATUS_REQUEST:
    case ADD_USER_TO_ISSUE_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ISSUES_SUCCESS: {
      // ✅ Save under this project's id
      const projectId = action.projectId
      saveCacheForProject(projectId, action.issues);
      return {
        ...state,
        loading: false,
        issues: action.issues,
        currentProjectId: projectId,
      };
    }

    case FETCH_ISSUES_BY_ID_SUCCESS:
      return { ...state, loading: false, issueDetails: action.issue };

    case CREATE_ISSUE_SUCCESS: {
      const updated = [...state.issues, action.issue];
      saveCacheForProject(state.currentProjectId, updated);
      return { ...state, loading: false, issues: updated };
    }

    case UPDATE_ISSUE_SUCCESS:
    case UPDATE_ISSUE_STATUS_SUCCESS:
    case ADD_USER_TO_ISSUE_SUCCESS: {
      const updated = state.issues.map((i) =>
        i.id === action.issue.id ? action.issue : i
      );
      saveCacheForProject(state.currentProjectId, updated);
      return { ...state, loading: false, issues: updated };
    }

    case DELETE_ISSUE_SUCCESS: {
      const updated = state.issues.filter((i) => i.id !== action.issueId);
      saveCacheForProject(state.currentProjectId, updated);
      return { ...state, loading: false, issues: updated };
    }

    case FETCH_ISSUES_FAILURE:
    case FETCH_ISSUES_BY_ID_FAILURE:
    case CREATE_ISSUE_FAILURE:
    case UPDATE_ISSUE_FAILURE:
    case DELETE_ISSUE_FAILURE:
    case UPDATE_ISSUE_STATUS_FAILURE:
    case ADD_USER_TO_ISSUE_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default issueReducer;