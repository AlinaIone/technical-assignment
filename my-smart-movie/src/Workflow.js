import React, { useEffect, useState } from "react";
import { getConfiguration, getMovieGenre, getMovieList } from "./services/ApiRequests";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "./store/store";
import { useNavigation, Outlet } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";

const Workflow = () => {
const navigation = useNavigation();
  const dispatch = useDispatch();
  const movieList = useSelector((store) => store.movies.movies);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const doConfigurationRequest = async () => {
      const [baseUrl, genres] = await Promise.all([getConfiguration(), getMovieGenre()]);
      dispatch(storeActions.configuration.setBaseUrl({baseUrl: baseUrl.images.base_url}));
      dispatch(storeActions.configuration.setGenre(genres.genres));
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

  return <>  
 <div>Aici suntem in workflow</div>
 <MainNavigation/>
 {navigation.state === "loading" ? 
        <p>Loading...</p> : 
       ( <main>
          <Outlet />
        </main>)
      }
    </>;
};

export default Workflow;
