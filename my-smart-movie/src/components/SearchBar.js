import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { getMovieList, getWantedMovies } from "../services/ApiRequests";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  //! Think if this function has to stay in workflow 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await getWantedMovies(query);
      console.log(response);
      dispatch(storeActions.movies.setMovies(response.results));
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleClearInput = async () => {
    setQuery("");
    //! You have to think about it, if you want to create a function in workflow and pass it as a prop
    const movies = await getMovieList();
    dispatch(storeActions.movies.setMovies(movies.results));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for movies..."
        variant="outlined"
        InputProps={{
          endAdornment: (
            <>
              {query.length > 0 && (
                <IconButton onClick={handleClearInput} aria-label="search">
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
