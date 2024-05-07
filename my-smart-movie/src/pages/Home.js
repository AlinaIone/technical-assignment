import React from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import Pagination from "../components/Pagination";
import MovieList from "../components/MovieList";
import MovieFilters from "../components/MovieFilters";
import { Grid } from "@mui/material";


const Home = () => {
  const doMovieRequest= useOutletContext()
  const movieList = useSelector((store) => store.movies.movies);
  
  return (
    <Grid item container >
      <MovieFilters/>  
      {movieList && <MovieList movies={movieList} title={'What to watch'}/>}
      <Pagination onPageChange={doMovieRequest}/>
    </Grid>
  );
};

export default Home;
