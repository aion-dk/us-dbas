import axios from "axios"

const api = axios.create({
  baseURL: "http://dbb:3003",
})

export default api;
