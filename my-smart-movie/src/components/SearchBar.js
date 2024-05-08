import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { getMovieList, getWantedMovies } from "../services/ApiRequests";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";
import { useNavigate } from "react-router-dom";


const searchBarStyle={
  borderRadius: '2px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px', 
    backgroundColor: '#736560',
    padding: '3px', 
  },
  '& .MuiInputBase-root': {
    padding: '3px',
    paddingLeft:'10px',
    maxWidth:'30rem',
    color:'#52F2C8',
  },
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await getWantedMovies(query);
      dispatch(storeActions.movies.setMovies(response.results));

      if (window.location.pathname !== "/") {
        navigate("/");
      }

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
    const movies = await getMovieList();
    dispatch(storeActions.movies.setMovies(movies.results));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', padding:'10px 0 10px 0', width:'100%' }}>
      <TextField
        type="text"
        size="small"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for movies..."
        variant="outlined"
        fullWidth
        sx={searchBarStyle}
        InputProps={{
          endAdornment: (
            <>
              {query.length > 0 && (
                <IconButton onClick={handleClearInput} aria-label="search" sx={{color: '#52F2C8'}}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton type="submit" aria-label="search" sx={{color: '#52F2C8'}}>
                <SearchIcon fontSize="small"/>
              </IconButton>
            </>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
