import api from "@/config/api";
import * as actionTypes from "./ActionTypes";
export const createComment=(commentData) => {
    return async (dispatch) => {   
        dispatch({ type: actionTypes.CREATE_COMMENT_REQUEST });
        try{
            const response=await api.post("api/comments",commentData);
            console.log("comment created",response.data);
            dispatch({type:actionTypes.CREATE_COMMENT_SUCCESS,commentData});
        }catch(error){
            console.error("Error", error);
            dispatch({type:actionTypes.CREATE_COMMENT_FAILURE,error:error.message})
        }
     }
}



export const DeleteComment=(commentId) => {
    return async (dispatch) => {   
        dispatch({ type: actionTypes.DELETE_COMMENT_REQUEST });
        try{
            const response=await api.delete(`api/comments/${commentId}`);
            console.log("comment deleted",response.data);
            dispatch({type:actionTypes.DELETE_COMMENT_SUCCESS,commentId});
        }catch(error){
            console.error("Error", error);
            dispatch({type:actionTypes.DELETE_COMMENT_FAILURE,error:error.message})
        }
     }
}

export const fetchComment=(issueId) => {
    return async (dispatch) => {   
        dispatch({ type: actionTypes.FETCH_COMMENT_REQUEST });
        try{
            const response=await api.get(`api/issues/${issueId}`);
            dispatch({type:actionTypes.FETCH_COMMENTS_SUCCESS,comments:response.data});
            console.log("comment fetched",response.data);
            
        }catch(error){
            console.error("Error", error);
            dispatch({type:actionTypes.FETCH_COMMENTS_FAILURE,error:error.message})
        }
     }
}