import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import { Typography,CardMedia, Card, CardContent } from "@mui/material";

const Favorites = () => {
  const favoriteMovies = useSelector((store) => store.movies.favoriteMovies);

  return (
    <div>
      {favoriteMovies.length !== 0 ? (
        <MovieList movies={favoriteMovies} />
      ) : (
        <Card sx={{ maxWidth: "30rem", margin: "auto"}}>
          <CardMedia sx={{ height: 350 }} image="/images/popcorn.jpg" />
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: "center", color: "#0BDA51" }}>
              Oops! Looks like your favorites list is on a diet - it's as empty
              as a popcorn bucket after the previews.
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Favorites;
