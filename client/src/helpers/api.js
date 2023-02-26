import { accessToken } from "./utils";
import axios from "axios";

const getPosts = () => {
  return axios
    .get(`http://localhost:3001/posts`, {
      headers: { accessToken: accessToken() },
    })
    .then((response) => {
      if (response.error) {
        return response.error;
      }
      return response.data;
    });
};

export default getPosts;
