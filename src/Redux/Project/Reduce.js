
import { searchProjects } from "./Action";
import { CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS, FETCH_PROJECTS_BY_ID_SUCCESS, SEARCH_PROJECT_SUCCESS } from "./ActionTypes";
import { FETCH_PROJECTS_BY_ID_REQUEST, FETCH_PROJECTS_REQUEST, INVITE_TO_PROJECT_REQUEST } from "./ActionTypes";
import { ACCEPT_INVITATION_REQUEST, DELETE_PROJECT_REQUEST } from "./ActionTypes";
import {FETCH_PROJECTS_SUCCESS     } from "./ActionTypes";
const intialState={
    projects:[],
    loading:false,
    error:null,
    ProjectDetails:null,
    searchProjects:[]
};

const projectReducer=(state=intialState,action)=>{
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
        case CREATE_PROJECT_REQUEST:
        case FETCH_PROJECTS_BY_ID_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case INVITE_TO_PROJECT_REQUEST:
        case ACCEPT_INVITATION_REQUEST:
            return{...state,loading:true,error:null};


        case FETCH_PROJECTS_SUCCESS:
            return{...state,loading:false,error:null,projects:action.payload};
        case SEARCH_PROJECT_SUCCESS:
            return{...state,loading:false,error:null,searchProjects:action.payload}
        
        case CREATE_PROJECT_SUCCESS:
            return{...state,loading:false,error:null,projects:[...state.projects,action.project]};
        
        
        case FETCH_PROJECTS_BY_ID_SUCCESS:
            return{...state,loading:false,error:null,ProjectDetails:action.project};
        
        case DELETE_PROJECT_SUCCESS:
            return{...state,loading:false,error:null,projects:state.projects.filter((project)=>project.id==action.projectId)};
            default:
             return state;
    }

}
export default projectReducer;