import axios from "axios";
axios.create({});

const getUrl = url => {
  return "http://localhost:18081/" + url;
};
const Request = {
  get: (url, params = {}) => axios.get(getUrl(url), { params }),
  delete: (url, params = {}) => axios.delete(getUrl(url), { params }),
  post: (url, params = {}, headers = null) =>
    axios.post(getUrl(url), params, headers)
};

export default Request;
