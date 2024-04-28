import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { toggleFavorite, getFavoriteMovies } from "../services/ApiRequests";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";

const pulseStyle ={ 
  '@keyframes pulse': {
   '0%': {
     transform: 'scale(1)'
   },
   '50%': {
     transform: 'scale(1.1)'
   },
   '100%': {
     transform: 'scale(1)'
   },
  animation: '$pulse 1s infinite',
}}
const buttonStyle = {
  backgroundColor:'#FFFFFF ',
  '&:hover': {
    backgroundColor: '#D3D3D3',
  },
}

const FavoriteButton = ({ movieId, isFav }) => {
  const dispatch = useDispatch();
  const [isPulsing, setIsPulsing] = useState(false);

  const handleToggleToFavorite = async (id, isFavParam) => {
      setIsPulsing(true);
      try {
        const response = await toggleFavorite(id, isFavParam);
        if (response.success) {
          const favMovieList = await getFavoriteMovies();
          dispatch(storeActions.movies.setFavoriteMovies(favMovieList.results));
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
      setIsPulsing(false);
    }

  return (
    <IconButton aria-label={isFav ? "remove-fav" : "add-fav"} size="small" sx={isPulsing ? {...pulseStyle, ...buttonStyle} : buttonStyle}
      onClick={() => handleToggleToFavorite(movieId, !isFav)}>
      {isFav ? (
        <StarIcon fontSize="large" sx={{ color: "#FFD700" }} />
      ) : (
        <StarBorderIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
