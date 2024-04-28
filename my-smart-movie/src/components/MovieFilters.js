import React, { useMemo, useState } from "react";
import { Select, MenuItem, Checkbox, FormControlLabel, FormControl, InputLabel,  Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredMovies, getMovieList } from "../services/ApiRequests";
import { storeActions } from "../store/store";

const sortingCriteria = [
  { key: "title.asc", value: "Title 🡩" },
  { key: "title.desc", value: "Title 🡫" },
  { key: "popularity.asc", value: "Popularity 🡩" },
  { key: "popularity.desc", value: "Popularity 🡫" },
  { key: "vote_count.desc", value: "Vote count 🡩" },
  { key: "vote_count.asc", value: "Vote count 🡫" },
];

const MovieFilters = () => {
  const dispatchMovies = useDispatch()
  const [genre, setGenre] = useState("00");
  const [releaseYear, setReleaseYear] = useState("");
  const [errorYear, setErrorYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [includeAdult, setIncludeAdult] = useState(false);
  const genreList = useSelector((store) => store.configuration.genres);

  const adaptedGenres = useMemo(() => (genreList ? [{ id: "00", name: "All Genres" }, ...genreList] : []),
    [genreList]
  );

  const handleApplyFilters = async () => {
    const filteringParams = { include_adult: includeAdult,  primary_release_year:releaseYear? releaseYear: null, sort_by: sortBy, with_genres:genre !=="00"? genre: null};
   const filteredMovies =  await getFilteredMovies(filteringParams);
    dispatchMovies(storeActions.movies.setMovies(filteredMovies.results))
   console.log(filteredMovies)
  };

  const handleResetFilters = async() => {
    setReleaseYear("");
    setGenre("00");
    setErrorYear("");
    setSortBy("popularity.desc");
    setIncludeAdult(false);
    const initialMovies= await getMovieList()
    dispatchMovies(storeActions.movies.setMovies(initialMovies.results))
  };

  const handleReleaseYearVerification = (e) => {
    const value = e.target.value;
    setReleaseYear(value);

    if (value && (value < 1900 || value > new Date().getFullYear())) {
      setErrorYear(
        "Please enter a valid year (between 1900 and the current year)"
      );
    } else {
      setErrorYear("");
    }
  };

  console.log({ releaseYear, errorYear });

  return (
    <Grid container margin={1}>
      <FormControl sx={{ m: 1, minWidth: 100 }} xs={12}>
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
          labelId="genre-label"
          id="genre-label"
          label="Genre"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        >
          {adaptedGenres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id.toString()}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 100 }} xs={12}>
        <TextField
          id="year-label"
          label="Year"
          type="number"
          value={releaseYear}
          onChange={handleReleaseYearVerification}
          error={!!errorYear}
        />
        {errorYear && <Typography>{errorYear}</Typography>}
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 100 }} xs={12}>
        <InputLabel id="sort">Sort by</InputLabel>
        <Select
          labelId="sort"
          id="sort"
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortingCriteria.map((criterion) => (
            <MenuItem key={criterion.key} value={criterion.key}>
              {criterion.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={includeAdult}
            onChange={(e) => setIncludeAdult(e.target.checked)}
          />
        }
        label="Include Adult Content"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleApplyFilters}
        disabled={errorYear}
      >
        Apply Filters
      </Button>
      <Button variant="contained" onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </Grid>

  );
};

export default MovieFilters;
