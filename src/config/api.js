import axios from "axios";
export const API_BASE_URL = "https://codeharbour-production.up.railway.app";    

const api=axios.create({baseURL:API_BASE_URL});

const jwt=localStorage.getItem("jwt");

api.defaults.headers.common["Authorization"]=`Bearer ${jwt}`;
api.defaults.headers.post["Content-Type"]="application/json";
export default api;