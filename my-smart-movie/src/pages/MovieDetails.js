import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Grid,  Card, CardContent, CardMedia} from "@mui/material";
import FavoriteButton from "../components/FavoriteButton";
import { formatDate, roundToOneDecimal } from "../utils/helpFunctions";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import DateRangeIcon from '@mui/icons-material/DateRange';

const MovieDetails = () => {
  const details = useSelector((store) => store.movieDetails.movieDetails);
  const baseUrl = useSelector((store) => store.configuration.baseUrl);
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  const imageUrl = `${baseUrl}original${
    details.backdrop_path ? details.backdrop_path : details.poster_path
  }`;

  const isFavOrNot = favoriteMovies
    ? favoriteMovies.map((movie) => movie.id).includes(details.id)
    : false;

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); 


  return (
    <Container maxWidth="md" sx={{ padding: '2rem'}}>
      <Typography variant="h3" gutterBottom sx={{marginBottom:'1.5rem', color: "#e6e6fa",}}>{details.title}</Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={9}>
          <Card position="relative">
            <CardMedia
              component="img"
              image={imageUrl}
              title={details.title}
            />
          </Card>
        </Grid>
        <Grid container item xs={12} md={3} flexDirection='column' justifyContent='space-between' gap={3} sx={{color:'#e6e6fa'}}>
          <Card sx={{ order: { xs: 2, md: 1 }, backgroundColor:'#9E796C', color:'#e6e6fa'}}>
            <CardContent>
            <Grid container item flexDirection='column' alignItems='center' justifyContent='center' gap={1} marginBottom={2}>
              <ThumbsUpDownIcon />
              <Typography variant="body1">Vote Average: {roundToOneDecimal(details.vote_average) } </Typography>
            </Grid>
            <Grid container item flexDirection='column' alignItems='center' justifyContent='center' gap={1}>
              <DateRangeIcon/>
              <Typography variant="body1" gutterBottom>Release: {formatDate(details.release_date) }</Typography>
            </Grid>
            <Grid container item alignItems='center' justifyContent='center' paddingTop={4}>
                {details.genres.map((genre) => (
                  <Typography key={genre.id} variant="body1" style={{ marginRight: "10px" }}>{genre.name}</Typography>
                ))}
            </Grid >          
            </CardContent>
          </Card>
          <Card sx={{ order: { xs: 1, md: 2 }, backgroundColor:'#416961', color:'#e6e6fa' }}>
          <FavoriteButton nativeButton movieId={details.id} isFav={isFavOrNot}/>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card  sx={{backgroundColor:'#9E796C', color:'#e6e6fa', p:2}}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight='bold'>About</Typography>
              <Typography variant="body1" paragraph> {details.overview}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetails;
