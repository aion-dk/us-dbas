import axios from "axios";
import config from "./config"

const options = {
  baseURL: config.dbbUrl,
};
const api = axios.create(options);

export { api, options };
