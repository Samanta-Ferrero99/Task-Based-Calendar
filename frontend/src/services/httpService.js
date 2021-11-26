import axios from 'axios';

axios.defaults.baseURL = `http://localhost:5000/api`;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(null, (error) => {
  return Promise.reject(error);
});


const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios: axios,
};

export default httpService;