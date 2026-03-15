import * as actionTypes from "./ActionTypes";
const initalState={
    comments:[],
    loading:false,
    error:null
};

 export const commentReducer=(state=initalState,action)=>{
    switch(action.type){
        case actionTypes.CREATE_COMMENT_REQUEST:
        case actionTypes.FETCH_COMMENTS_REQUEST:
        case actionTypes.DELETE_COMMENT_REQUEST:
        return{
            ...state,loading:true,error:null
        };  
        
        case actionTypes.CREATE_COMMENT_SUCCESS:
        return{
            ...state,loading:false,comments:[...state.comments,action.comment]
        };

        case actionTypes.DELETE_COMMENT_SUCCESS:
        return{
            ...state,loading:false,comments:state.comments.filter(comment=>comment.id!==action.commentId)
        };

        case actionTypes.FETCH_COMMENTS_SUCCESS:
            return{
                ...state,loading:false,comments:action.comments
            }
    };
};    