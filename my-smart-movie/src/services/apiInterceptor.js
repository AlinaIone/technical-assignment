import axios from 'axios';

// Create an instance of Axios
const apiTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

// Add a request interceptor to modify outgoing requests
apiTMDB.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    api_key: process.env.REACT_APP_API_KEY,
  };
  return config;

}, error => {
  return Promise.reject(error);
});

export default apiTMDB;
