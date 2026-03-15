import * as types from "./ActionTypes";
import api from "@/config/api";
export const getUSerSubscription=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:types.GET_USER_SUBSCRIPTIONS_REQUEST})
          try{
            const response=await api.get("/api/subscriptions/user",{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }

            });
            dispatch({type:types.GET_USER_SUBSCRIPTIONS_SUCCESS,payload:response.data});
            console.log("user subscription",response.data);
          }  catch(error){
            console.error(error);
            dispatch({type:types.GET_USER_SUBSCRIPTIONS_FAILURE,payload:error.message})
          }


    }
}

export const upgradeSubscription=({plantype})=>{
    return async(dispatch)=>{
        try{
            dispatch({type:types.UPGRADE_SUBSCRIPTION_REQUEST})
            const response=await api.post("/api/subscriptions/upgrade",null,{
                params:{
                    plantype:plantype,
                },
            });
            dispatch({type:types.UPGRADE_SUBSCRIPTION_SUCCESS,payload:response.data});
            console.log("subscription upgraded",response.data);

        }catch(error){
            console.error(error);
            dispatch({type:types.UPGRADE_SUBSCRIPTION_FAILURE,payload:error.message})
        }
    };
};