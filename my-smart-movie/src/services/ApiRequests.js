import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export const getMovieList = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );
  return response.data;
};

export const getConfiguration = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`
  );
  return response.data;
};
// TODO: take a look over interceptors