import React from "react";
import Card from "@mui/material/Card";
import { CardContent,  CardMedia, Typography,  Grid, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../store/store";
import { useMovieGenresHandling } from "../hooks/useMovieGenresHandling";
import FavoriteButton from "./FavoriteButton";

const cardStyle = {
  transition: "transform 0.3s",
  "&:hover": { transform: "scale(1.02)"},
  width: { xs: "280px", md: "280px", lg: "300px" },
  margin: { xs: "0.7rem 0.5rem", md: "1rem" },
  position: "relative",
  backgroundColor: '#394844',/*"#516077",*/
  color: "#E6E6FA",
};

const MovieCard = ({ id, title, image, genres }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genreDef = useMovieGenresHandling();
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  const goToDetailsPage = async () => {
    try {
      const details = await getMovieDetails(id);
      dispatch(storeActions.movieDetails.setMovieDetails(details));
     if(window.location.pathname.includes('favorites')){
      navigate(`/movies/details/${id}`);
     }else{
       navigate(`details/${id}`);
     }
     
    } catch (error) {
      console.error("An error occurred while fetching movie details:", error);
    }
  };

  const isFavOrNot = favoriteMovies
    ? favoriteMovies.map((movie) => movie.id).includes(id)
    : false;

  return (
    <Card sx={cardStyle}>
      <CardActionArea onClick={() => goToDetailsPage()}>
        <CardMedia sx={{ height: 400 }} image={image} title={title} />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" paddingBottom='1rem' >{title}</Typography>
          <Grid container item justifyContent='end' sx={12}>
            {genres.map((genre) => (
              <Typography key={genre} variant="body1" style={{ marginRight: "10px" }} sx={{ fontWeight: 'bold'}}>
                {genreDef[genre]}
              </Typography>
            ))}
          </Grid>
        </CardContent>
      </CardActionArea>
      <FavoriteButton movieId={id} isFav={isFavOrNot} />
    </Card>
  );
};
export default MovieCard;
