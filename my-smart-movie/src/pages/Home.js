import React from "react";

import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import MovieFilters from "../components/MovieFilters";
import Pagination from "../components/Pagination";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const doMovieRequest= useOutletContext()
  const movieList = useSelector((store) => store.movies.movies);

  return (
    <div>
      <SearchBar /> 
      <MovieFilters/>
      {movieList && <MovieList movies={movieList} />}
      <Pagination onPageChange={doMovieRequest}/>
    </div>
  );
};

export default Home;
