import axios from "axios";

const request = axios.create({
  baseURL: "https://cryptics.georgeho.org/data/",
});

export default request;
