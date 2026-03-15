import { act } from "react";
import { FETCH_ISSUES_REQUEST } from "./ActionTypes"
import { FETCH_CHAT_BY_PROJECT_REQUEST } from "../Chat/ActionTypes";
import { ca } from "zod/v4/locales";

export const fetchIssues=(id)=>{
    return async (dispatch)=>{
        dispatch({type:FETCH_ISSUES_REQUEST});
        try{
            const response=await api.get(`api/projects/${id}`);
            console.log("fetch issues",response.data);
            dispatch({type:actionTypes.FETCH_ISSUES_SUCCESS,issues:response.data})
        }catch(error){
            dispatch({type:actionTypes.FETCH_ISSUES_FAILURE,error:error.message})
        }
    }
}

export const fetchIssueById=(id)=>{
    return async (dispatch)=>{
        dispatch({type:FETCH_CHAT_BY_PROJECT_REQUEST});
        try{
            const response=await api.get(`api/issues/${id}`);
            console.log("fetch issue by id",response.data);
            dispatch({type:actionTypes.FETCH_ISSUE_BY_ID_SUCCESS,issue:response.data})
        }catch(error){
            dispatch({type:actionTypes.FETCH_ISSUE_BY_ID_FAILURE,error:error.message})
        }
    }
}

export const updateIssuesStatus=({id,status})=>{
    return async(dispatch)=>{
        dispatch({type:actionTypes.UPDATE_ISSUE_STATUS_REQUEST});
        try{
        const response=await api.put(`api/issues/${id}/status/${status}`);
        console.log("update issue status",response.data);
        dispatch({type:actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,issues:response.data});
    }
    catch(error){
            dispatch({type:actionTypes.UPDATE_ISSUE_STATUS_FAILURE,error:error.message})
    }
}
}