import React from 'react'

import MovieList from "../components/MovieList";
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';


const Home = () => {

    const movieList = useSelector((store) => store.movies.movies);

  return (
    <div> <SearchBar/> {movieList &&<MovieList movies={movieList} />}</div>
  )
}

export default Home