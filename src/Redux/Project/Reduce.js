import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECTS_BY_ID_SUCCESS,
  SEARCH_PROJECT_SUCCESS,
  FETCH_PROJECTS_BY_ID_REQUEST,
  FETCH_PROJECTS_REQUEST,
  INVITE_TO_PROJECT_REQUEST,
  ACCEPT_INVITATION_REQUEST,
  DELETE_PROJECT_REQUEST,
  FETCH_PROJECTS_SUCCESS,
} from "./ActionTypes";

// ✅ Load cached projects from localStorage so they show instantly on back navigation
const loadCachedProjects = () => {
  try {
    const cached = localStorage.getItem("cached_projects");
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
};

const initialState = {
  projects: loadCachedProjects(), // ✅ start with cached data, not empty array
  loading: false,
  error: null,
  ProjectDetails: null,
  searchProjects: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case FETCH_PROJECTS_BY_ID_REQUEST:
    case DELETE_PROJECT_REQUEST:
    case INVITE_TO_PROJECT_REQUEST:
    case ACCEPT_INVITATION_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PROJECTS_SUCCESS: {
      // ✅ Save fresh projects to localStorage every time we fetch
      try {
        localStorage.setItem("cached_projects", JSON.stringify(action.projects));
      } catch {}
      return { ...state, loading: false, error: null, projects: action.projects };
    }

    case SEARCH_PROJECT_SUCCESS:
      return { ...state, loading: false, error: null, searchProjects: action.payload };

    case CREATE_PROJECT_SUCCESS: {
      const updated = [...state.projects, action.project];
      try { localStorage.setItem("cached_projects", JSON.stringify(updated)); } catch {}
      return { ...state, loading: false, error: null, projects: updated };
    }

    case FETCH_PROJECTS_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, ProjectDetails: action.project };

    case DELETE_PROJECT_SUCCESS: {
      const updated = state.projects.filter((p) => p.id !== action.projectId);
      try { localStorage.setItem("cached_projects", JSON.stringify(updated)); } catch {}
      return { ...state, loading: false, error: null, projects: updated };
    }

    default:
      return state;
  }
};

export default projectReducer;