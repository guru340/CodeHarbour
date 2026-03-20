import * as types from "./ActionTypes";
import api from "@/config/api";

export const getUSerSubscription = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_SUBSCRIPTIONS_REQUEST })
  try {
    const response = await api.get("/api/subscriptions/user", {
      headers: { Authorization: `Bearer ${jwt}` }
    })
    dispatch({ type: types.GET_USER_SUBSCRIPTIONS_SUCCESS, payload: response.data })
    console.log("user subscription", response.data)
  } catch (error) {
    console.error(error)
    dispatch({ type: types.GET_USER_SUBSCRIPTIONS_FAILURE, payload: error.message })
  }
}

export const upgradeSubscription = ({ plantype }) => async (dispatch) => {
  dispatch({ type: types.UPGRADE_SUBSCRIPTION_REQUEST })
  try {
    // ✅ FIX: Backend uses @PatchMapping — was api.post, now api.patch
    const response = await api.patch("/api/subscriptions/upgrade", null, {
      params: { planType: plantype }, // ✅ FIX: param name is planType (capital T) matching @RequestParam PlanType planType
    })
    dispatch({ type: types.UPGRADE_SUBSCRIPTION_SUCCESS, payload: response.data })
    console.log("subscription upgraded", response.data)
  } catch (error) {
    console.error(error)
    dispatch({ type: types.UPGRADE_SUBSCRIPTION_FAILURE, payload: error.message })
  }
}