import React, { useMemo, useState } from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredMovies, getMovieList } from "../services/ApiRequests";
import { storeActions } from "../store/store";

const rootFilterStyle = {
  p: { xs: "1.5rem 0.75rem", md: "2rem 0" },
  m: { xs: "0.5rem", md: "0 6rem" },
};

const filtersStyle = {
  inputLabel: { color: "#e6e6fa", "&.Mui-focused": { color: "#e6e6fa" } },
  selectField: {
    "& .MuiSelect-select": {
      borderColor: "#e6e6fa", 
      padding: "10px", 
      color: "#e6e6fa",
      backgroundColor: "#516077", 
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "#516077", 
    },
    "& .MuiSvgIcon-root": {
      color: "#e6e6fa",
    },
  },
  textField: {
    "& .MuiInputBase-input": {
      padding: "10px", 
      color: "#e6e6fa",
      backgroundColor: "#516077", 
    },
    "&& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid black",
    },
  },
  checkbox: {
    color: "#e6e6fa",
    "&.Mui-checked": {
      color: "#e6e6fa",
    },
  },
  button: { backgroundColor: "#93c5c9", color: "#e6e6fa" },
};

const sortingCriteria = [
  { key: "title.asc", value: "Title 🡩" },
  { key: "title.desc", value: "Title 🡫" },
  { key: "popularity.asc", value: "Popularity 🡩" },
  { key: "popularity.desc", value: "Popularity 🡫" },
  { key: "vote_count.desc", value: "Vote count 🡩" },
  { key: "vote_count.asc", value: "Vote count 🡫" },
];

const MovieFilters = () => {
  const dispatchMovies = useDispatch();
  const [genre, setGenre] = useState("00");
  const [releaseYear, setReleaseYear] = useState("");
  const [errorYear, setErrorYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [includeAdult, setIncludeAdult] = useState(false);
  const genreList = useSelector((store) => store.configuration.genres);

  const adaptedGenres = useMemo(
    () => (genreList ? [{ id: "00", name: "All Genres" }, ...genreList] : []),
    [genreList]
  );

  const handleApplyFilters = async () => {
    const filteringParams = {
      include_adult: includeAdult,
      primary_release_year: releaseYear ? releaseYear : null,
      sort_by: sortBy,
      with_genres: genre !== "00" ? genre : null,
    };
    const filteredMovies = await getFilteredMovies(filteringParams);
    dispatchMovies(storeActions.movies.setMovies(filteredMovies.results));
  };

  const handleResetFilters = async () => {
    setReleaseYear("");
    setGenre("00");
    setErrorYear("");
    setSortBy("popularity.desc");
    setIncludeAdult(false);
    const initialMovies = await getMovieList();
    dispatchMovies(storeActions.movies.setMovies(initialMovies.results));
  };

  const handleReleaseYearVerification = (e) => {
    const value = e.target.value;
    setReleaseYear(value);

    if (
      value &&
      (isNaN(value) || value < 1900 || value > new Date().getFullYear())
    ) {
      setErrorYear(
        "Please enter a valid year (between 1900 and the current year)"
      );
    } else {
      setErrorYear("");
    }
  };


  return (
    <Grid container item sx={rootFilterStyle} justifyContent="flex-end" gap={1}>
      <Grid container item sx={12} md={8} justifyContent="end" wrap="nowrap">
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="sort" sx={filtersStyle.inputLabel}>Sort by</InputLabel>
          <Select
            labelId="sort"
            id="sort"
            label="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={filtersStyle.selectField}
          >
            {sortingCriteria.map((criterion) => (
              <MenuItem key={criterion.key} value={criterion.key}>{criterion.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="genre-label" sx={filtersStyle.inputLabel}>Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-label"
            label="Genre"
            value={genre}
            onChange={(e) => {setGenre(e.target.value)}}
            sx={filtersStyle.selectField}
          >
            {adaptedGenres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id.toString()}>{genre.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 100, position: "relative" }}>
          <TextField
            size="small"
            id="year-label"
            label="Year"
            variant="outlined"
            value={releaseYear}
            onChange={handleReleaseYearVerification}
            error={!!errorYear}
            autoComplete="off"
            InputLabelProps={{sx: filtersStyle.inputLabel,}}
            sx={filtersStyle.textField}
          />
          {errorYear && (<Typography sx={{color: "darkred",}}>{errorYear}</Typography>)}
        </FormControl>
      </Grid>

      <Grid container item xs={12} md={6} justifyContent="end" wrap="nowrap">
        <FormControlLabel
          sx={{ color: "#e6e6fa" }}
          control={
            <Checkbox
              sx={filtersStyle.checkbox}
              checked={includeAdult}
              onChange={(e) => setIncludeAdult(e.target.checked)}
            />
          }
          label="Include Adult Content"
        />
      </Grid>

      <Grid container item xs={12} md={8} justifyContent="end" gap={3} wrap="nowrap">
        <Button type="submit" variant="contained" sx={filtersStyle.button} onClick={handleApplyFilters} disabled={errorYear}>
          Apply Filters
        </Button>
        <Button variant="contained"  onClick={handleResetFilters} sx={filtersStyle.button}>
          Reset Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default MovieFilters;
