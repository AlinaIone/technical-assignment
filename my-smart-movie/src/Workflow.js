import React, { useCallback, useEffect, useState } from "react";
import { getConfiguration, getFavoriteMovies, getMovieGenre, getMovieList } from "./services/ApiRequests";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "./store/store";
import { useNavigation, Outlet } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";

const Workflow = () => {
const navigation = useNavigation();
  const dispatch = useDispatch();
  const movieInfo = useSelector((store) => store.movies);
  const {movies, favoriteMovies} = movieInfo;
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

  // fetch movies for the home page
   const doMovieRequest = useCallback(async (page) => {
    try {
      const movies = await getMovieList(page);
      dispatch(storeActions.movies.setMovies(movies.results));
      // dispatch(storeActions.pagination.setActivePage(movies.page))
      dispatch(storeActions.pagination.setTotalPages(movies.total_pages))
      // todo: implement an error handler
    } catch (error) {
      console.log(error);
    }
  },[dispatch]) 


  useEffect(() => {
    if (!movies && isInitialized) {
      doMovieRequest();
    }
  }, [isInitialized, movies, doMovieRequest]);
  

  const doFavoritesRequest =  useCallback(async () => {
      const favMovies = await getFavoriteMovies();
      dispatch(storeActions.movies.setFavoriteMovies(favMovies.results));
      console.log('avem favorite initial fetch')
    },[dispatch]);

    
  useEffect(() => {
    if(!favoriteMovies && isInitialized)
   doFavoritesRequest()
  }, [doFavoritesRequest, favoriteMovies, isInitialized ]);


  return <>  
 <div>Aici suntem in workflow</div>
 <MainNavigation/>
 {navigation.state === "loading" ? 
        <p>Loading...</p> : 
       ( <main>
          <Outlet context={doMovieRequest}/>
        </main>)
      }
    </>;
};

export default Workflow;
