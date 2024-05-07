
import React,{ useEffect }  from "react";
import MovieCard from "./MovieCard";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MovieList = ({ movies, title }) => {
  const baseUrl = useSelector((store) => store.configuration.baseUrl);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 200, behavior: "smooth" });

  }, [movies]); 

  return (
    <Grid container item md={12} justifyContent="center" gap={2}
      sx={{ margin: { xs: "0 0.2rem", md: "0 1rem", lg: "0 3rem" } }}
    >
      <Grid item xs={12}>
        <Typography variant="h1" color="#e6e6fa" margin="1rem 2rem">{title}</Typography>
      </Grid>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={`${baseUrl}w300${movie.poster_path}`}
            genres={movie.genre_ids}
          />
        );
      })}
    </Grid>
  );
};

export default MovieList;
