import React from "react";
// import { MOVIE_RESPONSE_MOCK } from "../services/mockData";
import MovieCard from "./MovieCard";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

const MovieList = ({ movies }) => {
  const movieList = useSelector((store) => store.movies.movies);
  const baseUrl = useSelector((store) => store.configuration.baseUrl);
  console.log(movies);
  return (
    <Grid container>
      {
        /*MOVIE_RESPONSE_MOCK*/ movieList.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={`${baseUrl}w300${movie.poster_path}`}
              descriprion={movie.overview}
            />
          );
        })
      }
    </Grid>
  );
};

export default MovieList;
