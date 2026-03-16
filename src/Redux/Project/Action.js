import api, { API_BASE_URL } from "@/config/api";
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS } from "./ActionTypes";

export const fetchProject=()=>({category,tag})=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECT_REQUEST})
    try{
        const {data}=await api.get("api/projects",{params:{category,tag}});
        console.log("all projects found",data);
        dispatch    ({type:FETCH_PROJECT_SUCCESS,project:data}) 
    }catch(error){
            console.log("error",error);
    }
}

export const searchProjects=(keyword)=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECT_REQUEST})
    try{
        const {data}=await api.get("api/projects/search?keyword="/+keyword,{params:{keyword}});
        console.log("search projects ",data);
        dispatch    ({type:FETCH_PROJECT_SUCCESS,project:data}) 
    }catch(error){
            console.log("error ",error);
    }
}

export const CreateProject=(projectData)=>async (dispatch)=>{
    dispatch({type:SEARCH_PROJECT_REQUEST})
    try{
        const {data}=await api.post("api/projects",projectData);
        console.log("Create found",data);
        dispatch    ({type:SEARCH_PROJECT_SUCCESS,project:data}) 
    }catch(error){
            console.log("error",error);
    }
}


export const fetchProjectById=(id)=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
    try{
        const {data}=await api.get("api/projects"+id);
        console.log("search Project BY ID",data);
        dispatch    ({type:FETCH_PROJECT_BY_ID_SUCCESS,project:data}) 
    }catch(error){
            console.log("error",error);
    }
}


export const DeleteProject=(id)=>async (dispatch)=>{
    dispatch({type:DELETE_PROJECT_REQUEST})
    try{
        const {data}=await api.delete("api/projects"+id);
        console.log("delete Project ",data);
        dispatch    ({type:DELETE_PROJECT_SUCCESS,project:data}) 
    }catch(error){
            console.log("error",error);
    }
}

export const InviteToProject=({email,projectId})=>async (dispatch)=>{
    dispatch({type:INVITE_TO_PROJECT_REQUEST})
    try{
        const {data}=await api.post("api/projects/invite",{email,projectId});
        console.log("invite to project ",data);
        dispatch    ({type:INVITE_TO_PROJECT_SUCCESS,payload:data}) 
    }catch(error){
            console.log("error",error);
    }
}

export const acceptInvitation=({invitaionToken,navigate})=>async (dispatch)=>{
    dispatch({type:ACCEPT_INVITATION_REQUEST})
    try{
        const {data}=await api.post("api/projects/accept_invitation",{
                params:{
                    token:invitaionToken
                }
        });
        navigate("/projects"+data.projectId)
        console.log("accept invitation",data);
        dispatch    ({type:ACCEPT_INVITATION_SUCCESS,payload:data}) 
    }catch(error){
            console.log("error",error);
    }
}