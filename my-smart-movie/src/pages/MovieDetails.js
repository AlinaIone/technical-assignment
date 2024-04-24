import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  IconButton,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";

const MovieDetails = () => {
  const params = useParams();
  const details = useSelector((store) => store.movieDetails.movieDetails);
  const baseUrl = useSelector((store) => store.configuration.baseUrl);
  console.log(params, details);
  const imageUrl = `${baseUrl}original${
    details.backdrop_path ? details.backdrop_path : details.poster_path
  }`;

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h3" gutterBottom>{details.title}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Card position="relative">
            <CardMedia
              component="img"
              image={imageUrl}
              title={details.title}
              //   sx={{ height: 400, backgroundSize: 'contain' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Vote Averange</Typography>
              <Typography variant="body1">{details.vote_average}</Typography>
              <Typography variant="subtitle1" gutterBottom>Release Date</Typography>
              <Typography variant="body1">{details.release_date}</Typography>
              <Typography variant="subtitle1" gutterBottom>Genre</Typography>
              <Grid container>
                {details.genres.map((genre) => (
                  <Typography key={genre.id} variant="body1" style={{ marginRight: "10px" }}>{genre.name}</Typography>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Description</Typography>
              <Typography variant="body1" paragraph> {details.overview}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetails;
