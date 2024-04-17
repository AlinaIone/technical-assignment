import React, { useEffect, useState } from "react";
import { getConfiguration, getMovieList } from "./services/ApiRequests";
import MovieList from "./components/MovieList";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "./store/store";

const Workflow = () => {

  const dispatch = useDispatch();
  const movieList = useSelector((store) => store.movies.movies);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const doConfigurationRequest = async () => {
      const result = await getConfiguration();
      dispatch(storeActions.configuration.setBaseUrl({baseUrl: result.images.base_url}));
      setIsInitialized(true);
    };

    if (!isInitialized) {
      doConfigurationRequest();
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    const doMovieRequest = async () => {
      try {
        const movies = await getMovieList();
        dispatch(storeActions.movies.setMovies(movies.results));
        // todo: implement an error handler
      } catch (error) {
        console.log(error);
      }
    };

    if (!movieList && isInitialized) {
      doMovieRequest();
    }
  }, [isInitialized, dispatch, movieList]);

  return <>{movieList && <MovieList movies={movieList} />}</>;
};

export default Workflow;
