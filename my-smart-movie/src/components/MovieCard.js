import React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia, Typography, Grid, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/ApiRequests";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../store/store";
import { useMovieGenresHandling } from "../hooks/useMovieGenresHandling";
import FavoriteButton from "./FavoriteButton";

const MovieCard = ({ id, title, image, genres }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genreDef = useMovieGenresHandling();
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies); 

  const goToDetailsPage = async () => {
    try {
      const details = await getMovieDetails(id);
      dispatch(storeActions.movieDetails.setMovieDetails(details));
      navigate(`details/${id}`);
    } catch (error) {
      //! cum sa handle the error - Handle the error
      console.error("An error occurred while fetching movie details:", error);
      // You can show an error message to the user or handle it in any other way
    }
  };

  const isFavOrNot = favoriteMovies ? favoriteMovies.map(movie => movie.id).includes(id): false

  return (
    <Card sx={{ width: 250, margin: "0.5rem", position:'relative' }}>
      <CardActionArea onClick={() => goToDetailsPage()}>
        <CardMedia
          sx={{ height: 350 }}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Grid container>
            {genres.map((genre) => (
              <Typography
                key={genre}
                variant="body1"
                style={{ marginRight: "10px" }}
              >
                {genreDef[genre]}
              </Typography>
            ))}
          </Grid>
        </CardContent>
      </CardActionArea>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <FavoriteButton movieId={id} isFav={isFavOrNot}/>
        </div>
    </Card>
  );
};
export default MovieCard;
