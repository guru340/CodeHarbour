
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAILURE, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";


const intialState={
    user:null,
    loading:false,
    error:null,
    jwt:null,
    projectSize:0
}

const authReducer=(state=intialState,action)=>{
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return{...state,loading:true,error:null}
         
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return{...state,loading:false,error:null,jwt:action.payload.jwt};

        case GET_USER_SUCCESS:
            console.log("reducer GET_USER_SUCCESS:", action.payload)
            return{...state,loading:false,error:null,user:action.payload};

        case LOGOUT:
            return intialState;
        case LOGIN_FAILURE: 
         return { ...state, loading: false, error: action.payload }

        default:
           return state;
    }

}
export default authReducer;