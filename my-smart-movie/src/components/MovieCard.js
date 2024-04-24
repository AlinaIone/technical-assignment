import React from "react";
import Card from "@mui/material/Card";
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/ApiRequests";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";
import { useMovieGenresHandling } from "../hooks/useMovieGenresHandling";

const MovieCard = ({ id, title, image, genres }) => {
  const navigate = useNavigate();
  const dispatchDetails = useDispatch();
  const genreDef = useMovieGenresHandling();

  const goToDetailsPage = async () => {
    const details = await getMovieDetails(id);
    dispatchDetails(storeActions.movieDetails.setMovieDetails(details));
    navigate(`movies/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 250, margin: "0.5rem" }}>
      <CardActionArea onClick={() => goToDetailsPage()}>
        <CardMedia
          sx={{ height: 350 }}
          // style={{ display: 'block', margin: 'auto' }}
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
        <CardActions>
          <Button size="small">Details</Button>
          <Button size="small">Add to favorite</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
export default MovieCard;
