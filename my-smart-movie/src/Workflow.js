import React, { useCallback, useEffect, useState } from "react";
import { getConfiguration, getFavoriteMovies, getMovieGenre, getMovieList } from "./services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "./store/store";
import { useNavigation, Outlet } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Footer from "./components/Footer";
import DisplayError from "./pages/DisplayError";

const Workflow = () => {
const navigation = useNavigation();
  const dispatch = useDispatch();
  const movieInfo = useSelector((store) => store.movies);
  const thereAreErrors = useSelector(store=> store.errors.errors)
  const {movies, favoriteMovies} = movieInfo;
  const [isInitialized, setIsInitialized] = useState(false);


  useEffect(() => {
    dispatch(storeActions.errors.clearError())
    const doConfigurationRequest = async () => {
      try{
      const [baseUrl, genres] = await Promise.all([getConfiguration(), getMovieGenre()]);
      dispatch(storeActions.configuration.setBaseUrl({baseUrl: baseUrl.images.base_url}));
      dispatch(storeActions.configuration.setGenre(genres.genres));
      setIsInitialized(true);
      } catch(error){
      console.log('Error', error.response.data)
      dispatch(storeActions.errors.setError({status: error.response.status, message:'An error occurred while loading movies.'}))
      }   
    };

    if (!isInitialized) {
      doConfigurationRequest();
    }
  }, [dispatch, isInitialized]);

  // fetch movies for the home page
   const doMovieRequest = useCallback(async (page) => {
    dispatch(storeActions.errors.clearError())
    try {
      const movies = await getMovieList(page);
      dispatch(storeActions.movies.setMovies(movies.results));
      dispatch(storeActions.pagination.setTotalPages(movies.total_pages))
    } catch (error) {
      console.log('Error', error.response.data)
      dispatch(storeActions.errors.setError({status: error.response.status, message:'An error occurred while loading movies.'}))
    }
  },[dispatch]) 


  useEffect(() => {
    if (!movies && isInitialized) {
      doMovieRequest();
    }
  }, [isInitialized, movies, doMovieRequest]);
  

  const doFavoritesRequest =  useCallback(async () => {
    dispatch(storeActions.errors.clearError())
    try{
      const favMovies = await getFavoriteMovies();
      dispatch(storeActions.movies.setFavoriteMovies(favMovies.results));
    }catch(error){
      console.log('Error', error.response.data)
      dispatch(storeActions.errors.setError({status: error.response.status, message:'An error occurred while loading movies.'}))
    }
    },[dispatch]);

    
  useEffect(() => {
    if(!favoriteMovies ) doFavoritesRequest()
  }, [doFavoritesRequest, favoriteMovies ]);


  return (
    <>
      {thereAreErrors.length !== 0 ? (
        <DisplayError />
      ) : (
        <div>
          <MainNavigation />
          {navigation.state === "loading" ? (
            <p>Loading...</p>
          ) : (
            <main style={{ position: "relative", minHeight: " 100%" }}>
              <Outlet context={doMovieRequest} />
            </main>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Workflow;
