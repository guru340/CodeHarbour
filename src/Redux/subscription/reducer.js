const intialState={
    subscriptions:[],
    loading:false,
    error:null
};
export const subscriptionReducer=(state=intialState,action)=>{
    switch (action.type) {
        case "GET_USER_SUBSCRIPTIONS_REQUEST":
        case "UPGRADE_SUBSCRIPTION_REQUEST":
            return{...state,loading:true,error:null};
    
        case "GET_USER_SUBSCRIPTIONS_SUCCESS":
            return{...state,loading:false,error:null,userSubscription:action.payload};
       
        case "UPGRADE_SUBSCRIPTION_SUCCESS":
            return{...state,loading:false,error:null,userSubscription:action.payload};
        case "GET_USER_SUBSCRIPTIONS_FAILURE":
        case "UPGRADE_SUBSCRIPTION_FAILURE":
            return{...state,loading:false,error:action.payload};
        default:
            return state;   
        }
    }