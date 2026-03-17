import { API_BASE_URL } from "@/config/api";
import { GET_USER_SUCCESS,GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_FAILURE,LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import axios from "axios";


export const register = userData => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
            dispatch({ type: REGISTER_SUCCESS, payload: data })
            dispatch(getUser())  // ✅ fetch user after signup to set auth.user
        }
        console.log("register success", data)
    } catch (error) {
        console.log(error)
    }
}

export const login = userData => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signing`, userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
            dispatch({ type: LOGIN_SUCCESS, payload: data })
            dispatch(getUser())  // ✅ fetch user after login to set auth.user
        }
        console.log("login success", data)
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: "Invalid email or password" })
    }
}

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/auth/profile`, {  // ✅ matches backend @GetMapping("/profile")
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        dispatch({ type: GET_USER_SUCCESS, payload: data })  // ✅ only dispatch after success
        console.log("get user success", data)
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT })
    localStorage.clear()
}

