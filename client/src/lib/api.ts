import axios from "axios"

const options = {
  baseURL: "http://dbb:3003",
}
const api = axios.create(options)

export { api, options };
